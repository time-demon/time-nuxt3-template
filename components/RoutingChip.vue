<!-- 路由屑 -->
<template>
  <ul class="navbarBox" type="none">
    <li
      class="navbar"
      :class="[$route.name === home_routes.name ? 'this_navbar' : '']"
      @click="goPath(home_routes)"
    >
      <span class="title"> {{ home_routes.meta.title }}{{}} </span>
    </li>
    <template v-for="item in store_adminNavbar.adminNavbar" :key="item.name">
      <li
        v-if="store_adminNavbar.adminNavbar.length"
        class="navbar"
        :class="[$route.name === item.name ? 'this_navbar' : '']"
        @click.stop="goPath(item)"
      >
        <span class="title">
          {{ item.meta.title }}
        </span>
        <span class="close" @click.stop="navbarClose(item)">
          <i class="sg sg-guanbi_close"></i>
        </span>
      </li>
    </template>
    <li class="navbarTools">
      <div><i class="sg sg-shuangbottom_double-bottom-copy"></i></div>
      <ul class="navbarToolsUl">
        <li class="navbarToolsLi" @click="navbarClose('', 'all')">关闭所有</li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { adminNavbar } from "~/stores/adminNavbar";
const store_adminNavbar = reactive<any>(adminNavbar());
const routes = reactive<any>(
  useRouter().options.routes.find((item: any) => item.name === "admin")
);
const home_routes = reactive<any>(
  routes?.children.find((item: any) => item.name === "admin-home")
);

// 跳转路由页
const goPath = async (data: any, type: any) => {
  if (data.name === useRoute().name) return;
  await useRouter().push({ name: data.name });
};

// 路由屑关闭
const navbarClose = (data: any, type: any) => {
  if (type === "all") {
    adminNavbar().adminNavbarDel(data, "all");
    useRouter().push({ name: "admin-home" });
    return;
  }
  // 如果后面有路由
  if (
    adminNavbar().adminNavbar[
      adminNavbar().adminNavbar.findIndex(
        (item: any) => item.name === data.name
      ) + 1
    ]
  ) {
    useRouter().push({
      name: adminNavbar().adminNavbar[
        adminNavbar().adminNavbar.findIndex(
          (item: any) => item.name === data.name
        ) + 1
      ].name,
    });
  } else {
    // 如果后面没有路由但前面有路由
    if (
      adminNavbar().adminNavbar[
        adminNavbar().adminNavbar.findIndex(
          (item: any) => item.name === data.name
        ) - 1
      ]
    ) {
      useRouter().push({
        name: adminNavbar().adminNavbar[
          adminNavbar().adminNavbar.findIndex(
            (item: any) => item.name === data.name
          ) - 1
        ].name,
      });
    } else {
      // 如果后面没有路由且前面没有路由
      useRouter().push({ name: "admin-home" });
    }
  }
  adminNavbar().adminNavbarDel(data);
};
</script>

<style scoped lang="scss">
.navbarBox {
  position: relative;
  background: #ffffff;
  height: 36px;
  font-size: 12px;
  display: flex;
  vertical-align: top;
  align-items: center;
  padding: 5px 5px;
  > .navbar {
    white-space: nowrap;
    width: auto;
    height: 100%;
    position: relative;
    display: flex;
    vertical-align: top;
    justify-content: center;
    align-items: center;
    padding: 0 6px 0 10px;
    margin-right: 10px;
    border-radius: 2px;
    cursor: pointer;
    > .title {
      z-index: 1;
    }
    > .close {
      z-index: 1;
      margin: 0 0 0 5px;
      height: 100%;
      display: flex;
      align-items: center;
      > i {
        font-size: 12px;
        display: inline-block;
        scale: 0.6;
      }
    }
  }
  > .navbar:nth-last-of-type(1) {
    margin-right: 0;
  }
  > .navbar::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    border: 1px solid #d8dce5;
    border-radius: 2px;
  }
  > .this_navbar {
    background: #409eff;
    color: #ffffff;
    i {
      color: #ffffff;
    }
  }
  > .navbarTools {
    cursor: pointer;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    z-index: 999999;
    width: auto;
    > .navbarToolsUl {
      display: none;
      position: absolute;
      top: 30px;
      right: 5px;
      background: #ffffff;
      border-radius: 3px;
      overflow: hidden;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      > .navbarToolsLi {
        width: auto;
        max-width: 100vw;
        min-width: 80px;
        padding: 5px 15px;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
      > .navbarToolsLi:nth-of-type(1) {
        padding-top: 10px;
      }
      > .navbarToolsLi:nth-last-of-type(1) {
        padding-bottom: 10px;
      }
      > .navbarToolsLi:hover {
        background: #f5f7fa;
      }
    }
  }
  > .navbarTools::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 0px;
    height: 50%;
    border-left: 0.5px solid #dddddd;
  }
  > .navbarTools:hover {
    > .navbarToolsUl {
      display: block;
    }
  }
}
.navbarBox::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  border-bottom: 1px solid #eeeeee;
}
</style>
