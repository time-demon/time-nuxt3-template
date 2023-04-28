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
  await useDbQuery({ query: { account: query.account }, table: "admin" })
    .then(async (r: any) => {
      if (!r.data.length) {
        returnData = { code: -1, msg: "账号不存在" };
        return;
      }
      await useDbQuery({
        query: { account: query.account, password: query.password },
        table: "admin",
      })
        .then((r2: any) => {
          if (!r2.data.length) {
            returnData = { code: -1, msg: "密码错误" };
            return;
          }
          // 账号和密码都对
          r2.data[0].token = useToken({
            type: "sign",
            data: r2.data[0],
          });
          returnData.code = 200;
          returnData.data = r2.data[0];
        })
        .catch((err2: any) => {
          returnData.code = -1;
        });
    })
    .catch((err) => {
      returnData.code = -1;
      try {
        useSaveError(err);
      } catch {}
    });
  return returnData;
});
