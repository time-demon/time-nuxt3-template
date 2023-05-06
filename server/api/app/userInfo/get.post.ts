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

  // 获取用户信息
  await useDbQuery({ query: query, table: "user" })
    .then((r: any) => {

      returnData.data = r.data[0];
      returnData.code = 200;
    })
    .catch((err) => {
      returnData.code = -1;
    });
  return returnData;
});
