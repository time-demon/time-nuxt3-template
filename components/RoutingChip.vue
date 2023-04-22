<!-- 路由屑 -->
<template>
  <ul class="navbarBox" type="none">
    <li
      class="navbar"
      :class="[$route.name === home_routes.name ? 'this_navbar' : '']"
      @click="goPath(home_routes)"
    >
      <span class="title">
        {{ home_routes.meta.title }}
      </span>
    </li>
    <template v-for="item in store_adminNavbar.adminNavbar" :key="item.name">
      <li
        v-if="store_adminNavbar.adminNavbar.length"
        class="navbar"
        :class="[$route.name === item.name ? 'this_navbar' : '']"
        @click.stop="goPath(item)"
      >
        <span class="title">
          <el-icon v-if="item.meta.keepAlive" :size="14" style="scale: 0.8">
            <Ship />
          </el-icon>
          {{ item.meta.title }}
        </span>
        <span class="close" @click.stop="navbarClose(item)">
          <i class="sg sg-guanbi_close"></i>
        </span>
      </li>
    </template>
    <li class="navbarTools">
      <ul class="navbarToolsUl" type="none">
        <li class="navbarToolsLi">
          <el-dropdown trigger="click" size="small">
            <el-icon style="font-size: 12px">
              <ArrowDown />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  :disabled="adminNavbar().adminNavbar.length === 0"
                  @click="navbarClose('', 'all')"
                >
                  <div style="font-size: 12px">关闭所有</div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
        <li class="navbarToolsLi">
          <el-popover
            :popper-class="'adminRoutingChipNavbarToolsPopover'"
            placement="bottom"
            :width="'auto'"
            trigger="click"
          >
            <template #reference>
              <el-icon style="font-size: 12px">
                <Warning />
              </el-icon>
            </template>
            <ul class="ul">
              <ul type="none">
                <li>
                  <el-divider content-position="left">
                    <el-text size="small">状态说明</el-text>
                  </el-divider>
                  <div style="font-size: 12px">
                    <el-icon> <Ship /> </el-icon>&nbsp;代表该路由被缓存
                  </div>
                </li>
              </ul>
            </ul>
          </el-popover>
        </li>
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
  z-index: 1;
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
      display: flex;
      vertical-align: top;
      align-items: center;
      justify-content: center;
      i {
        margin-right: 3px;
      }
    }
    > .close {
      z-index: 1;
      margin: 0 0 0 2px;
      height: 100%;
      display: flex;
      align-items: center;
      > i {
        font-size: 12px;
        display: inline-block;
        scale: 0.6;
        padding: 2px;
      }
    }
    > .close:hover {
      > i {
        background: var(--siderbar-head-bg);
        border-radius: 50%;
        color: #ffffff;
      }
    }
    > .close:active {
      > i {
        background: var(--siderbar-head-bg);
        border-radius: 50%;
        color: #ffffff;
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
  > .navbar:hover::after {
    border: 1px solid var(--siderbar-head-bg);
  }
  > .this_navbar {
    background: var(--siderbar-head-bg);
    color: #ffffff;
    > .title i {
      color: #ffffff;
    }
    > .close:hover {
      > i {
        background: #ffffff;
        border-radius: 50%;
        color: initial;
      }
    }
    > .close:active {
      > i {
        background: #ffffff;
        border-radius: 50%;
        color: initial;
      }
    }
  }
  > .navbarTools {
    z-index: 1;
    cursor: pointer;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    width: auto;
    padding: 0 5px;
    > .navbarToolsUl {
      height: 100%;
      display: flex;
      vertical-align: top;
      > .navbarToolsLi {
        width: 25px;
        display: flex;
        vertical-align: top;
        align-items: center;
        justify-content: center;
        > .el-dropdown {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .el-icon {
          width: 100%;
          height: 100%;
          svg {
          }
        }
      }
      > .navbarToolsLi:active {
        background: #fff8f8;
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
