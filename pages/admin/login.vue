<template>
  <Title>登录</Title>
  <div class="loginContainer flexCenter">
    <div class="centerBox">
      <div class="leftBox md_none">
        <div class="left">
          <div class="outText" v-html="outText"></div>
        </div>
      </div>
      <div
        class="rightBox"
        v-loading="loginButton.loading"
        element-loading-text="登录中"
      >
        <h1 class="title">
          {{
            store.adminConfig.title ? store.adminConfig.title + " · " : ""
          }}后台管理系统
        </h1>
        <div class="typeBox">
          <div class="type">登录Login</div>
        </div>
        <template v-if="true">
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginFormRules"
            style="max-width: 460px"
          >
            <el-form-item prop="account">
              <el-input
                v-model="loginForm.account"
                placeholder="账号"
                clearable
                size="large"
                :prefix-icon="User"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                placeholder="密码"
                clearable
                show-password
                size="large"
                :prefix-icon="Lock"
              />
            </el-form-item>
            <el-form-item prop="agree">
              <el-checkbox v-model="agreeState" />
              <p style="display: inline-block; font-size: 12px">
                &nbsp; 我同意 服务条款
              </p>
            </el-form-item>
            <el-form-item>
              <div
                class="flexCenter"
                style="width: 100%; justify-content: space-between"
              >
                <div class="">忘记密码？</div>
                <el-button
                  :loading="loginButton.loading"
                  @click="loginIn(loginFormRef)"
                >
                  {{ loginButton.loading ? "登录中..." : "登录" }}
                </el-button>
              </div>
            </el-form-item>
          </el-form></template
        >
        <template v-else> </template>
        <div class="copyrightBox">
          {{ new Date().getFullYear() }} &copy; 时光
          <a href="https://timebk.cn/" target="_blank">timebk.cn</a>
        </div>
      </div>
    </div>
  </div>
  <div class="bannerSVG"></div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { FormInstance, FormRules } from "element-plus";
import { adminConfig } from "~/stores/adminConfig";
import { adminInfor } from "~/stores/adminInfor";
import { PROPERTY_TYPES } from "@babel/types";
const store = reactive<any>(adminConfig());

// 输出文字
const outText = ref<any>("");
let outTexts = `欢迎访问<br />作者：时光<br />个人博客：https://timebk.cn/`;
let outTextsIndex = 0;
const outTextFun = () => {
  if (outTextsIndex === outTexts.length) {
    return;
  }
  outText.value += outTexts.split("")[outTextsIndex];
  outTextsIndex++;
  setTimeout(() => {
    outTextFun();
  }, Math.floor(Math.random() * (300 - 100 + 1)) + 100);
};
onMounted(() => {
  outTextFun();
});

// 是否同意服务条款
const agreeState = ref<boolean>(false);

// 登录表单
const loginFormRef = ref<FormInstance>();
const loginForm = reactive<any>({
  account: "",
  password: "",
});
// 表单规则
const loginFormRules = reactive<FormRules>({
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
// 登录按钮状态
const loginButton = reactive<any>({
  loading: false,
  state: true,
});
// 登录！
const loginIn = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      if (!agreeState.value) {
        ElMessage({
          message: "请同意 服务条款",
          type: "warning",
        });
        return;
      }
      loginButton.loading = true;
      // 去除首尾空格
      for (let i in loginForm) {
        loginForm[i] = loginForm[i].trim();
      }

      // 对接接口时请删除这个！
      // if (true) {
      //   setTimeout(() => {
      //     // 登录并存储管理员信息
      //     adminInfor().loginIn({ name: "时光" });
      //     loginButton.loading = false;
      //   }, 300);
      //   return;
      // }

      // 开始登录 接口自定义，文件在 server/api/admin/login.ts
      useAxios({
        url: "/api/admin/login",
        data: loginForm,
      })
        .then((r: any) => {
          if (r.code === 200) {
            setTimeout(() => {
              // 登录并存储管理员信息
              adminInfor().loginIn(r.data);
              loginButton.loading = false;
            }, 300);
            return;
          }
          setTimeout(() => {
            loginButton.loading = false;
            ElMessage({
              message: r.msg,
              type: "error",
              duration: 1000,
            });
          }, 300);
        })
        .catch((err: any) => {
          loginButton.loading = false;
          ElMessage({
            message: "异常",
            type: "error",
            duration: 1000,
          });
        });
    } else {
      // 不合表单规则
    }
  });
};
</script>

<style scoped lang="scss">
.loginContainer {
  background: url(/img/login/background.svg) no-repeat;
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  > .centerBox {
    width: auto;
    height: auto;
    min-height: 500px;
    max-height: 500px;
    display: flex;
    vertical-align: top;
    justify-content: center;
    position: relative;
    > .leftBox {
      border-radius: 3px 0 0 3px;
      width: 400px;
      position: relative;
      display: flex;
      align-items: center;
      > .left {
        position: relative;
        background: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        width: 100%;
        height: 90%;
        > .outText {
          position: absolute;
          top: 50%;
          left: 100px;
          transform: translateY(-50%);
        }
      }
    }
    > .rightBox {
      border-radius: 3px;
      position: relative;
      z-index: 1;
      flex: auto;
      min-width: 400px;
      padding: 80px 40px;
      background: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      > .title {
        text-align: center;
        font-size: 20px;
        font-weight: 400;
        margin: 0 0 40px;
      }
      > .typeBox {
        display: flex;
        vertical-align: top;
        margin: 0 0 20px;
        font-size: 20px;
        color: #aaaaaa;
        cursor: pointer;
        > .type {
          margin-right: 20px;
        }
        > .type:nth-last-of-type(1) {
          margin-right: 0;
        }
      }
      > .copyrightBox {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 13px;
        color: #aaaaaa;
      }
    }
  }

  @media screen and (max-width: 768px) {
    > .centerBox {
      width: 95%;
      max-width: 400px;
      > .leftBox {
        display: none;
      }
      > .rightBox {
        min-width: auto;
        padding: 40px 20px;
      }
    }
  }
}
.bannerSVG {
  width: 100vw;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
