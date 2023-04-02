// 获取日期和时间和时间戳
// 如果不传 type 就是获取当前时间
// 如果type传 parse 就是解析传过来的时间格式(第二个传值)
export default function (type: string, time: number | string) {
  let date = "" as Object;
  if (type == "parse") {
    if (!time) return null;
    time = typeof time === "string" ? parseInt(time) : time;
    // 解析时间戳
    date = {
      time: new Date(time).getTime(), // 时间戳
      year: new Date(time).getFullYear(), // 年
      month: new Date(time).getMonth() + 1, // 月
      date: new Date(time).getDate(), // 日
      week: new Date(time).getDay(), // 星期
      hours: new Date(time).getHours(), // 小时
      minutes: new Date(time).getMinutes(), // 分钟
      seconds: new Date(time).getSeconds(), // 秒数
      fullTime:
        (new Date(time).getHours() < 10
          ? "0" + new Date(time).getHours()
          : new Date(time).getHours()) +
        ":" +
        (new Date(time).getMinutes() < 10
          ? "0" + new Date(time).getMinutes()
          : new Date(time).getMinutes()) +
        ":" +
        (new Date(time).getSeconds() < 10
          ? "0" + new Date(time).getSeconds()
          : new Date(time).getSeconds()),
      fullDate:
        new Date(time).getFullYear() +
        "-" +
        (new Date(time).getMonth() + 1 < 10
          ? "0" + (new Date(time).getMonth() + 1)
          : new Date(time).getMonth() + 1) +
        "-" +
        (new Date(time).getDate() < 10
          ? "0" + new Date(time).getDate()
          : new Date(time).getDate()),
      fullDateTime:
        new Date(time).getFullYear() +
        "-" +
        (new Date(time).getMonth() + 1 < 10
          ? "0" + (new Date(time).getMonth() + 1)
          : new Date(time).getMonth() + 1) +
        "-" +
        (new Date(time).getDate() < 10
          ? "0" + new Date(time).getDate()
          : new Date(time).getDate()) +
        " " +
        (new Date(time).getHours() < 10
          ? "0" + new Date(time).getHours()
          : new Date(time).getHours()) +
        ":" +
        (new Date(time).getMinutes() < 10
          ? "0" + new Date(time).getMinutes()
          : new Date(time).getMinutes()) +
        ":" +
        (new Date(time).getSeconds() < 10
          ? "0" + new Date(time).getSeconds()
          : new Date(time).getSeconds()),
    };
  } else {
    // 获取当前时间
    date = {
      time: new Date().getTime(), // 时间戳
      year: new Date().getFullYear(), // 年
      month: new Date().getMonth() + 1, // 月
      date: new Date().getDate(), // 日
      week: new Date().getDay(), // 星期
      hours: new Date().getHours(), // 小时
      minutes: new Date().getMinutes(), // 分钟
      seconds: new Date().getSeconds(), // 秒数
      fullDateTime:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        "-" +
        (new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate()) +
        " " +
        (new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours()) +
        ":" +
        (new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes()) +
        ":" +
        (new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds()),
    };
  }
  return date;
}
