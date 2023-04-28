// 删除示例
import { MongoClient, ObjectId } from "mongodb";

const useDbDel = (config = {} as any) => {
  let _ids = [] as any;
  // 如果是多个
  if (config.data._id instanceof Array) {
    for (let i in config.data._id) {
      _ids[i] = new ObjectId(config.data._id[i]);
    }
  } else {
    // 如果是一个，而且不是数组的形式
    _ids = [new ObjectId(config.data._id)];
  }
  const mongodb = MongoClient.connect(useMongodb());
  return new Promise((resolve, reject) => {
    mongodb
      .then((conn: any) => {
        const dbTable = conn.db().collection(config.table);
        dbTable
          .deleteMany({ [config.data.type]: { $in: _ids } })
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
