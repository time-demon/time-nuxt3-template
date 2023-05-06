// 搜题记录数据获取
export default defineEventHandler(async (event: any) => {
  const query = await readBody(event);

  // 定义必须的参数
  const queryKey = ["_id"];
  if (!query) {
    return {
      code: -1,
      msg: "参数不足",
    };
  }
  for (let i in queryKey) {
    if (!query[queryKey[i]]) {
      return {
        code: -1,
        msg: "参数不足",
      };
    }
  }

  let returnData = {} as any;
  try {
    // 获取用户信息
    let idKeyReturn = {} as any;
    if (query.idKey === "user") {
      try {
        idKeyReturn = await await useDbQuery({
          query: { _id: query._id },
          table: query.idKey,
        });
      } catch (err) {
        console.log("idKeyReturnErr", err);
      }
    }

    // 先查询新字段
    const recordTitleReturn = await useDbQuery({
      query: { user: idKeyReturn.data[0]._id.toString() },
      table: "recordTitle",
    });
    if (recordTitleReturn.data.length) {
      returnData.data = recordTitleReturn.data;
      returnData.code = 200;
    } else {
        // 如果不是属于新字段的数据，则查询旧字段
      const recordTitleReturn = await useDbQuery({
        query: { openid: idKeyReturn.data[0].openid },
        table: "recordTitle",
      });
      returnData.data = recordTitleReturn.data;
      returnData.code = 200;
    }
  } catch (err) {
    console.log("err", err);
    returnData.code = -1;
  }

  return returnData;
});
