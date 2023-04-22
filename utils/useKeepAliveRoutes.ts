// 路由缓存
import { adminNavbar } from "~/stores/adminNavbar";

export default () => {
  return adminNavbar().keepAliveRoutes;
};
