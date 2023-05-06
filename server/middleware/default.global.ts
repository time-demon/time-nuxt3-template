export default defineEventHandler((event) => {
  const routeUrl = event.node.req.url;
  // 如果是后台api
  if (
    routeUrl?.split("/")[2] === "admin" &&
    routeUrl?.split(/\?|\//)[3] !== "login"
  ) {
    // 验证token是否有效
    if (!useToken({ token: getHeaders(event).authorization })) {
      return {
        code: 401,
        msg: "token已过期",
      };
    }
  }
});
