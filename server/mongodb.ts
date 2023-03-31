// 云端数据库 部署服务器时用
const db_config = {
  // 服务器ip
  ip: "127.0.0.1",
  // 端口，一般27017默认即可
  port: "27017",
  // 数据库名称
  dbname: "",
  // 用户名
  name: "",
  // 密码
  password: "",
};
// 本地数据库 本地开发时用
const lc_config = {
  // 服务器ip
  ip: "127.0.0.1",
  // 端口，一般27017默认即可
  port: "27017",
  // 数据库名称
  dbname: "time_souti_new",
  // 用户名
  name: "",
  // 密码
  password: "",
};
const url_db = `mongodb://${db_config.name}:${db_config.password}@${db_config.ip}:${db_config.port}/${db_config.dbname}`;
const url_lc = `mongodb://${lc_config.ip}:${lc_config.port}/${lc_config.dbname}`;

export default process.env.NODE_ENV === "development" ? url_lc : url_db;
