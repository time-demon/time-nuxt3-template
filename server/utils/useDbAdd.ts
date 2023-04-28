// 添加示例
import { MongoClient, ObjectId } from "mongodb";

const useDbAdd = (config = {} as any) => {
  const mongodb = MongoClient.connect(useMongodb());
  return new Promise((resolve, reject) => {
    mongodb
      .then((conn: any) => {
        const dbTable = conn.db().collection(config.table);
        dbTable
          .insertMany(config.data)
          .then((r: any) => {
            if (r.acknowledged) {
              resolve(r);
            } else {
              reject();
            }
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

export default useDbAdd;
