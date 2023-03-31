import db_query from "~/server/query";
export default defineEventHandler(async (event: any) => {
  const query = getQuery(event);
  let returnData = {} as any;
  if (JSON.stringify(query) === "{}") {
    returnData.code = -1;
    return returnData;
  }

  await db_query({ query: query, table: "config" })
    .then((r: any) => {
      if (!r.length) {
        returnData = { code: -1, msg: "参数不合法" };
        return;
      }
      returnData.code = 200;
      returnData.data = r[0];
    })
    .catch((err) => {
      returnData.code = -1;
    });
  return returnData;
});
