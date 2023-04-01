import db_query from "~~/server/db_query";
export default defineEventHandler(async (event: any) => {
  const query = getQuery(event);
  // 定义必须的参数
  const queryKey = ["account", "password"];
  for (let i in queryKey) {
    if (!query[queryKey[i]]) {
      return {
        code: -1,
        msg: "参数不足",
      };
    }
  }

  let returnData = {} as any;
  await db_query({ query: { account: query.account }, table: "admin" })
    .then(async (r: any) => {
      if (!r.length) {
        returnData = { code: -1, msg: "账号不存在" };
        return;
      }
      await db_query({
        query: { account: query.account, password: query.password },
        table: "admin",
      })
        .then((r2: any) => {
          if (!r2.length) {
            returnData = { code: -1, msg: "密码错误" };
            return;
          }
          returnData.code = 200;
          returnData.data = r2;
        })
        .catch((err2: any) => {
          returnData.code = -1;
        });
    })
    .catch((err) => {
      returnData.code = -1;
    });
  return returnData;
});
