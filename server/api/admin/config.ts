import db_query from "~~/server/db_query";
export default defineEventHandler(async (event: any) => {
  const query = getQuery(event);
  let returnData = {} as any;

  if (JSON.stringify(query) === "{}") {
    returnData.code = -1;
    return returnData;
  }

  await db_query({ query: query, table: "config" })
    .then((r: any) => {
      if (!r.data.length) {
        returnData = { code: -1, msg: "参数不合法" };
        return;
      }
      r.data = r.data[0];
      returnData = r;
      returnData.code = 200;
    })
    .catch((err) => {
      returnData.code = -1;
    });
  return returnData;
});
