// 数据删除
import db_delete from "~~/server/db_delete";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
  let returnData = {} as any;
  await db_delete(Object.assign({ table: "recordTitle" }, { data: body }))
    .then((r: any) => {
      if (!r.deletedCount) {
        returnData = {
          code: -1,
          msg: "当前数据不存在",
        };
        return;
      }
      returnData = {
        code: 200,
        msg: "删除成功",
      };
    })
    .catch((err: any) => {
      returnData = {
        code: -1,
        msg: "异常，请重试",
        err: err,
      };
    });

  return returnData;
});
