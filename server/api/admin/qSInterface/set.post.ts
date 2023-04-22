// 数据修改
import { MongoClient, ObjectId } from "mongodb";
import url from "~/server/mongodb";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
  let returnData = {} as any;

  await setData({ body })
    .then((r: any) => {
      returnData = {
        code: 200,
        msg: "成功",
      };
    })
    .catch((err: any) => {
      returnData = err;
    });

  return returnData;
});

// 设置数据
async function setData({ body }: any) {
  return new Promise((resolve, reject) => {
    const mongodb = MongoClient.connect(url);
    mongodb
      .then(async (conn: any) => {
        const dbTable = conn.db().collection("apis");
        let _id = new ObjectId(body._id);
        delete body._id;
        dbTable
          .updateMany({ _id: _id }, { $set: body })
          .then((arr: any) => {
            if (arr.matchedCount && arr.modifiedCount) {
              resolve(arr);
            } else {
              reject({
                code: 0,
                msg: "无参数需更新",
              });
            }
          })
          .catch((err: any) => {
            console.log("数据操作失败" + err.message);
            reject({
              code: -1,
              msg: "失败",
            });
          })
          .finally(() => {
            conn.close();
          });
      })
      .catch((err) => {
        console.log("数据库连接失败");
        reject({
          code: -1,
          msg: "失败",
        });
      });
  });
}
