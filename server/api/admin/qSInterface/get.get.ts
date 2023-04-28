// 用户数据获取
export default defineEventHandler(async (event: any) => {
  const query = getQuery(event);
  let returnData = {} as any;

  await useDbQuery({ query: query, table: "apis" })
    .then((r: any) => {
      returnData = r;
      returnData.code = 200;
    })
    .catch((err: any) => {
      returnData = {
        code: -1,
        msg: "异常",
        err: err,
      };
      try {
        useSaveError(err);
      } catch {}
    });
  return returnData;
});
