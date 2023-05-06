// 记录错误，保存到数据库
// 请自定义表名
// 推荐用法：try { useSaveError(); } catch {}
export default (errorData: any) => {
  // 表名
  const tableName = "errorCollection";
  // 检测是否为字符串
  if (typeof errorData !== "string") {
    errorData = JSON.stringify(errorData);
  }
  useDbAdd({
    data: [{ type: "admin", error: errorData, time: new Date().getTime() }],
    table: tableName,
  });
};
