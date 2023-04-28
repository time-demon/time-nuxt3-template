// 查询示例
// 默认获取符合条件的全部数据，
// 开启分页获取功能：query.paging 为true
// 开启模糊搜索功能：query.fuzzy 为true
import { MongoClient, ObjectId } from "mongodb";

function useDbQuery(config = {} as any) {
  return new Promise((resolve, reject) => {
    if (config.query) {
      if (config.query._id) {
        config.query._id = new ObjectId(config.query._id);
      }
    } else {
      reject();
      return;
    }
    const mongodb = MongoClient.connect(useMongodb());
    mongodb
      .then((conn: any) => {
        let dbTable = null as any;
        const pageConfig = {
          total: 0, // 总条数
          pages: 0, // 总页数
          page: 1, // 当前页
          size: 10, // 每页条数
        } as any;
        //
        const query_config = JSON.parse(JSON.stringify(config));

        // 传入 paging:true 开启分页获取功能
        if (query_config.query.paging === "0") {
          query_config.query.paging = false;
        }

        if (JSON.stringify(config.query) !== "{}") {
          // 传入 fuzzy:true 开启模糊搜索
          if (config.query.fuzzy || config.query.fuzzy === "0") {
            for (let i in config.query) {
              config.query[i] = eval(`/${config.query[i]}/i`);
            }
          }
        }

        // 清理一下不需要的key
        delete config.query.paging;
        delete config.query.fuzzy;
        for (let i in pageConfig) {
          delete config.query[i];
        }

        // 分页
        if (config && query_config.query.paging) {
          if (query_config.query.page) {
            pageConfig.page = parseInt(query_config.query.page);
          }
          if (query_config.query.size) {
            pageConfig.size = parseInt(query_config.query.size);
          }

          // 先获取总数
          conn
            .db()
            .collection(config.table)
            .find(config.query)
            .toArray()
            .then((res: any) => {
              pageConfig.total = res.length;
              pageConfig.pages =
                parseInt(
                  parseInt(res.length) / parseInt(pageConfig.size) + ""
                ) +
                (parseInt(res.length) % parseInt(pageConfig.size) > 0 ? 1 : 0);
              dbTable = conn
                .db()
                .collection(config.table)
                .find(config.query)
                .sort({ _id: -1 })
                .skip((pageConfig.page - 1) * pageConfig.size)
                .limit(pageConfig.size)
                .toArray();
              return dbTable.then((res: any) => {
                resolve(Object.assign({ data: res }, pageConfig));
              });
            })
            .catch((err: any) => {
              // 数据操作失败
              reject(err);
              try {
                useSaveError(err);
              } catch {}
            })
            .finally(() => {
              // 取消
              conn.close();
            });
          return;
        } else {
          // 不分页，获取符合条件的全部数据

          if (config.type === "count") {
            dbTable = conn
              .db()
              .collection(config.table)
              .find(config.query)
              .count();
          } else {
            dbTable = conn
              .db()
              .collection(config.table)
              .find(config.query)
              .toArray();
          }

          query({ conn, dbTable, resolve, reject, config });
        }
      })
      .catch((err: any) => {
        // 数据库连接失败
        console.log("数据库连接失败", err);
        reject(err);
        try {
          useSaveError(err);
        } catch {}
      });
  });
}

function query({
  conn = {} as any,
  dbTable = {} as any,
  resolve = {} as any,
  reject = {} as any,
  pageConfig = {} as any,
  config = {} as any,
}) {
  dbTable
    .then((res: any) => {
      if (config.type === "count") {
        resolve(res);
      } else {
        resolve(Object.assign({ data: res }, pageConfig));
      }
    })
    .catch((err: any) => {
      // 数据操作失败
      reject(err);
      try {
        useSaveError(err);
      } catch {}
    })
    .finally(() => {
      // 取消
      conn.close();
    });
}
export default useDbQuery;
