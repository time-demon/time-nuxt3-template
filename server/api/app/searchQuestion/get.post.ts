import { tr } from "element-plus/es/locale";

export default defineEventHandler(async (event: any) => {
  const query = await readBody(event);
  console.log("----------------");

  console.log("query", query);

  // 定义必须的参数
  const queryKey = ["name", "question"];
  for (let i in queryKey) {
    if (!query[queryKey[i]]) {
      return {
        code: -1,
        msg: "参数不足",
      };
    }
  }

  let returnData = {} as any;

  // 获取api自定义配置
  let apiConfig = null as any;
  try {
    apiConfig = await useDbQuery({
      query: { name: query.name },
      table: "apis",
    });
    console.log(apiConfig.data[0], "apiConfig");
  } catch (err) {
    try {
      useSaveError("获取api自定义配置" + JSON.stringify(err));
    } catch {}
    returnData.code = -1;
    return returnData;
  }

  // 获取用户信息
  try {
    const userInfoReturn = (await useDbQuery({
      query: { _id: query.user },
      table: "user",
    })) as any;
    // 如果用户剩余搜题次数少于需扣次数
    if (
      parseFloat(userInfoReturn.data[0].count) <
      parseFloat(apiConfig.data[0].reduceCount)
    ) {
      returnData.msg = "次数不足";
      returnData.addCount = apiConfig.data[0].addCount;
      returnData.code = -2;
      return returnData;
    }
  } catch (err) {
    try {
      useSaveError(err);
    } catch {}
    returnData.code = -1;
    return returnData;
  }

  const runStart = performance.now();
  try {
    const requestData = Object.assign(
      { [apiConfig.data[0].urlQuestionKey]: query.question },
      apiConfig.data[0].data
    );
    // 访问api接口
    let requestReturn: any = await useAxios({
      method: apiConfig.data[0].method,
      url: apiConfig.data[0].url,
      data: requestData,
    });

    // 转换类型
    try {
      // 如果是JSON字符串,则转换为JSON
      if (typeof JSON.parse(requestReturn) === "object") {
        requestReturn = JSON.parse(requestReturn);
      }
    } catch (err) {}

    // 匹配code
    if (requestReturn.code === apiConfig.data[0].okCode) {
      // 查题成功，开始扣点！
      if (requestReturn[apiConfig.data[0].dataKey].length !== 0) {
        try {
          // 获取用户信息
          const userInfoReturn = (await useDbQuery({
            query: { _id: query.user },
            table: "user",
          })) as any;

          await useDbSet({
            where: { _id: userInfoReturn.data[0]._id },
            set: {
              $set: {
                count: parseFloat(
                  (
                    parseFloat(userInfoReturn.data[0].count) -
                    parseFloat(apiConfig.data[0].reduceCount)
                  ).toFixed(10)
                ),
              },
            },
            table: "user",
          });
        } catch {}
      }
      requestReturn = requestReturn[apiConfig.data[0].dataKey];

      // 开始整理数据
      returnData.data = [];
      for (let i in requestReturn) {
        returnData.data.push({
          question: requestReturn[i][apiConfig.data[0].questionKey].replace(
            /(\r\n|\n|\r| )/gi,
            ``
          ),
          options: requestReturn[i][apiConfig.data[0].optionKey].replace(
            /(\r\n|\n|\r| )/gi,
            ``
          ),
          answer: requestReturn[i][apiConfig.data[0].answerKey].replace(
            /(\r\n|\n|\r| )/gi,
            ``
          ),
        });
      }
    } else {
      throw requestReturn;
    }
    const runEnd = performance.now();
    // 搜题记录添加
    try {
      recordAdd({
        api: apiConfig.data[0]._id,
        question: query.question,
        matchingResults: JSON.stringify(returnData.data), // 匹配结果收集
        time: new Date().getTime(),
        timeConsuming: runEnd - runStart,
        user: query.user,
      });
    } catch (err) {}
    returnData.code = 200;
  } catch (err) {
    console.log("err", err);
    returnData = {};
    returnData.msg = "获取失败";
    try {
      useSaveError(err);
    } catch {}
    returnData.code = -1;
  }

  return returnData;
});

// 添加记录
const recordAdd = async (data: any) => {
  await useDbAdd({ data: [data], table: "recordTitle" });
};
