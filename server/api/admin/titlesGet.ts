// 用户数据获取
import db_query from "~~/server/db_query";
export default defineEventHandler(async (event: any) => {
  const query = getQuery(event);
  let returnData = {} as any;

  await db_query({ query: query, table: "recordTitle" })
    .then((r: any) => {
      returnData = r;
      returnData.code = 200;
    })
    .catch((err) => {
      returnData.code = -1;
    });

  return returnData;
});
