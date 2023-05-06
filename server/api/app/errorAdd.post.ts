export default defineEventHandler(async (event: any) => {
  const query = await readBody(event);
  console.log("query", query);

  // 定义必须的参数
  const queryKey = ["type", "error"];
  for (let i in queryKey) {
    if (!query[queryKey[i]]) {
      return {
        code: -1,
        msg: "参数不足",
      };
    }
  }

  let returnData = {} as any;
  if (typeof query.error !== "string") {
    query.error = JSON.stringify(query.error);
  }
  try {
    const time = new Date().getTime();
    const db_add_return = await useDbAdd({
      data: [
        {
          error: query.error,
          type: query.type,
          time: new Date().getTime(),
        },
      ],
      table: "errorCollection",
    });
    returnData.code = 200;
  } catch (e) {
    returnData.code = -1;
  }

  return returnData;
});
