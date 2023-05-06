// 元素权限控制指令 v-roleVerify
import { adminInfor } from "~/stores/adminInfor";

export default {
  mounted(el: any, binding: any, vnode: any, prevVnode: any) {
    if (adminInfor().adminInfor.role !== "admin") {
      // 检测是否是elment组件
      if (/el-/gi.test(el.className)) {
        // 按钮点击事件
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
        }
        // 输入框
        else if (/input/gi.test(el.className)) {
          findInput(el);
        } else {
          vnode.el.innerHTML = `<span class="el-text el-text--small mx-1">无权限查看</span>`;
        }
      }
      // 如果不是elment组件
      else {
        vnode.el.innerHTML = `<span class="el-text el-text--small mx-1">无权限查看</span>`;
      }
    } else {
    }
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

function findInput(domNode: any) {
  if (domNode.childNodes.length === 0) {
    return;
  }
  domNode.childNodes.forEach((child: any) => {
    child.addEventListener(
      "click",
      (e: any) => {
        throwErr();
        e.preventDefault();
        e.stopPropagation();
      },
      {
        capture: true,
      }
    );
    child.addEventListener(
      "change",
      (e: any) => {
        throwErr();
        e.preventDefault();
        e.stopPropagation();
      },
      {
        capture: true,
      }
    );
    if (child.nodeName === "INPUT") {
      child.disabled = true;
      return;
    }
    if (/el-input-number/gi.test(child.className)) {
      child.parentNode.innerHTML = `<span class="el-text el-text--small mx-1">无权限查看</span>`;
      return;
    }
    findInput(child);
  });
}
