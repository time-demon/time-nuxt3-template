// 生成订单号
// 默认是：标识 + 年 + 月 + 日 + 时 + 分 + 秒 + 随机111111~999999六位数
const orderNo = (type: string) => {
  const newDate = new Date();
  const nowDateTime = {
    year: newDate.getFullYear(),
    month:
      newDate.getMonth() + 1 < 10
        ? "0" + (newDate.getMonth() + 1)
        : newDate.getMonth() + 1,
    day: newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate(),
    hours: newDate.getHours(),
    minutes: newDate.getMinutes(),
    seconds: newDate.getSeconds(),
  } as any;
  let orderNo = "";
  for (let i in nowDateTime) {
    orderNo += nowDateTime[i] + "";
  }
  const random = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
  orderNo = (type ? type : "") + orderNo + random;
  return orderNo;
};
export default orderNo;
