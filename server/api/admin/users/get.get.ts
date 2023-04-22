// 用户数据获取
import db_query from "~~/server/db_query";
export default defineEventHandler(async (event: any) => {
  if (!useToken({ token: getHeaders(event).authorization })) {
    return {
      code: 401,
      msg: "token已过期",
    };
  }

  const query = getQuery(event);
  let returnData = {} as any;

  await db_query({ query: query, table: "user" })
    .then((r: any) => {
      returnData = r;
      returnData.code = 200;
    })
    .catch((err) => {
      returnData.code = -1;
    });

  return returnData;
});
