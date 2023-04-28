// 修改示例
import { MongoClient, ObjectId } from "mongodb";

const useDbDel = (config = {} as any) => {
  const mongodb = MongoClient.connect(useMongodb());
  return new Promise((resolve, reject) => {
    mongodb
      .then((conn: any) => {
        const dbTable = conn.db().collection(config.table);
        if (config.where._id) {
          config.where._id = new ObjectId(config.where._id);
        }
        dbTable
          .updateMany(config.where, config.set)
          .then((r: any) => {
            resolve(r);
          })
          .catch((err: any) => {
            console.log("数据操作失败" + err.message);
            reject(err);
            try {
              useSaveError(err);
            } catch {}
          })
          .finally(() => {
            conn.close();
          });
      })
      .catch((err: any) => {
        // 数据库连接失败
        reject(err);
        try {
          useSaveError(err);
        } catch {}
      });
  });
};
export default useDbDel;
