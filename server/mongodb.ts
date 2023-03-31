// 云端数据库 部署服务器时用
const db_config = {
  ip: "127.0.0.1", // 服务器ip
  port: "27017", // 端口
  dbname: "", // 数据库名称
  name: "", // 用户名
  password: "", // 密码
};
// 本地数据库 本地开发时用
const lc_config = {
  ip: "127.0.0.1", // 服务器ip
  port: "27017", // 端口
  dbname: "time_souti_new", // 数据库名称
  name: "", // 用户名
  password: "", // 密码
};
const url_db = `mongodb://${db_config.name}:${db_config.password}@${db_config.ip}:${db_config.port}/${db_config.dbname}`;
const url_lc = `mongodb://${lc_config.ip}:${lc_config.port}/${lc_config.dbname}`;

export default process.env.NODE_ENV === "development" ? url_lc : url_db;
