import { MongoClient } from "mongodb";
import url from "~/server/mongodb";

function query(data = {} as any) {
  const mongodb = MongoClient.connect(url);
  // 这是一个查询示例
  return new Promise((resolve, reject) => {
    mongodb
      .then((conn: any) => {
        const dbTable = conn.db().collection(data.table);
        // 查询
        dbTable
          .find(data.query)
          .toArray()
          .then((res: any) => {
            resolve(res);
          })
          .catch((err: any) => {
            // 数据操作失败
            reject();
          })
          .finally(() => {
            // 取消
            conn.close();
          });
      })
      .catch((err: any) => {
        // 数据库连接失败
        reject();
      });
  });
}

export default query;
