// 查询
// 默认获取符合条件的全部数据，type为paging时分页
import { MongoClient } from "mongodb";
import url from "~/server/mongodb";

function db_query(config = {} as any) {
  const mongodb = MongoClient.connect(url);
  // 这是一个查询示例
  return new Promise((resolve, reject) => {
    mongodb
      .then((conn: any) => {
        let dbTable = null as any;
        // 分页获取
        // 传入 page 和 size 即可
        if (config && config.type === "paging") {
          const pageConfig = {
            total: 0, // 总条数
            pages: 0, // 总页数
            page: 1, // 当前页
            size: 10, // 每页条数
          } as any;
          if (config.query.page) {
            pageConfig.page = parseInt(config.query.page);
          }
          if (config.query.size) {
            pageConfig.size = parseInt(config.query.size);
          }

          // 清理一下分页才需要的key
          for (let i in pageConfig) {
            delete config.query[i];
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
              reject();
            })
            .finally(() => {
              // 取消
              conn.close();
            });
          return;
        } else {
          // 不分页，获取符合条件的全部数据
          dbTable = conn
            .db()
            .collection(config.table)
            .find(config.query)
            .toArray();
          query({ conn, dbTable, resolve, reject });
        }
      })
      .catch((err: any) => {
        // 数据库连接失败
        reject();
      });
  });
}

function query({
  conn = {} as any,
  dbTable = {} as any,
  resolve = {} as any,
  reject = {} as any,
  pageConfig = {} as any,
}) {
  dbTable
    .then((res: any) => {
      resolve(Object.assign({ data: res }, pageConfig));
    })
    .catch((err: any) => {
      // 数据操作失败
      reject();
    })
    .finally(() => {
      // 取消
      conn.close();
    });
}
export default db_query;
