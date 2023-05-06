export default defineEventHandler(async (event: any) => {
  const query = await readBody(event);
  console.log("query", query);

  // 定义必须的参数
  const queryKey = ["type", "count"];
  for (let i in queryKey) {
    if (!query[queryKey[i]]) {
      return {
        code: -1,
        msg: "参数不足",
      };
    }
  }

  let returnData = {} as any;

  // 增加光年
  if (query.type === "add") {
    console.log(99);

    try {
      const userInfoReturn = (await useDbQuery({
        query: { _id: query._id },
        table: "user",
      })) as any;

      console.log(77);
      await useDbSet({
        where: { _id: userInfoReturn.data[0]._id },
        set: {
          $set: {
            count: parseFloat(
              (
                parseFloat(userInfoReturn.data[0].count) +
                parseFloat(query.count)
              ).toFixed(10)
            ),
          },
        },
        table: "user",
      });
      console.log(88);
      returnData.count = parseFloat(
        (
          parseFloat(userInfoReturn.data[0].count) + parseFloat(query.count)
        ).toFixed(10)
      );
      returnData.code = 200;
    } catch (err) {
      try {
        useSaveError("增加光年 " + JSON.stringify(err));
      } catch {}
    }
  }

  return returnData;
});
