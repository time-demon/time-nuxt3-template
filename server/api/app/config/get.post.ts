export default defineEventHandler(async (event: any) => {
  const query = await readBody(event);

  // 检测标识
  if (!query.type || typeof query.type !== "string") {
    return {
      code: -1,
      msg: "不合法",
    };
  }

  let returnData = {} as any;
  await useDbQuery({ query: query, table: "cloud" })
    .then((r: any) => {
      returnData.data = r.data[0];
      returnData.code = 200;
    })
    .catch((err) => {
      returnData.code = -1;
    });
  return returnData;
});
