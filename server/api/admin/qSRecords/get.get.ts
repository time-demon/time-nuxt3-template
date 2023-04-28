// 搜题记录数据获取
export default defineEventHandler(async (event: any) => {
  const query = getQuery(event);
  let returnData = {} as any;

  await useDbQuery({ query: query, table: "recordTitle" })
    .then((r: any) => {
      returnData = r;
      returnData.code = 200;
    })
    .catch((err) => {
      returnData.code = -1;
      try {
        useSaveError(err);
      } catch {}
    });
  return returnData;
});
