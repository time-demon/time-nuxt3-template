// 元素权限控制指令 v-roleVerify
import { adminInfor } from "~/stores/adminInfor";

export default {
  mounted(el: any, binding: any, vnode: any, prevVnode: any) {
    if (adminInfor().adminInfor.role !== "admin") {
      // 点击事件
      if (/switch|button/gi.test(el.className)) {
        el.style.opacity = ".5";
        el.addEventListener(
          "click",
          (e: any) => {
            throwErr();
            e.preventDefault();
            e.stopPropagation();
            if (binding.value) {
              // binding.value();
            }
          },
          { capture: true }
        );
      } else {
        console.log(vnode);

        // vnode.el?.parentNode?.removeChild(vnode.el);
        vnode.el.innerHTML = `<span class="el-text el-text--small mx-1">无权限查看</span>`;
      }
    }
    el.addEventListener(
      "click",
      (e: any) => {
        console.log("type", vnode);
        console.log(/switch|button/gi.test(el.className));
      },
      true
    );
  },
};

function throwErr(t = "权限不足") {
  ElMessage({
    type: "error",
    message: t,
    showClose: true,
    center: true,
    duration: 2000,
  });
}
