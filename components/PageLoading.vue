<!-- 加载页 -->
<template>
  <div class="pageLoading_container" v-if="PageLoadingConfig.state">
    <div class="pageLoading">
      <div class="svgLoading">
        <div class="ball-scale-multiple">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="loadingText">加载中，请稍等</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const PageLoadingConfig = reactive<any>({
  state: true,
});
onMounted(() => {
  setTimeout(() => {
    PageLoadingConfig.state = false;
  }, 1500);
});
</script>

<style lang="scss" scoped>
.pageLoading_container {
  background: #ffffff;
  position: absolute;
  z-index: 999999999;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  vertical-align: top;
  align-items: center;
  justify-content: center;
  > .pageLoading {
    display: flex;
    vertical-align: top;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > .loadingText {
      font-size: 14px;
      letter-spacing: 1px;
      text-align: center;
      color: var(--theme-color);
    }
  }
}
.svgLoading {
  position: relative;
  bottom: 30px;
  flex: 0 1 auto;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 25%;
  max-width: 25%;
  align-items: center;
  justify-content: center;
  .ball-scale-multiple {
    -webkit-transform: translateY(-30px);
    transform: translateY(-30px);
  }

  .ball-scale-multiple > div {
    background-color: var(--theme-color);
    border-radius: 100%;
  }

  .ball-scale-multiple > div:nth-child(2) {
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }

  .ball-scale-multiple > div:nth-child(3) {
    -webkit-animation-delay: -0.2s;
    animation-delay: -0.2s;
  }

  .ball-scale-multiple > div {
    position: absolute;
    left: -30px;
    top: 0;
    opacity: 0;
    margin: 0;
    width: 60px;
    height: 60px;
    -webkit-animation: ball-scale-multiple 1s 0s linear infinite;
    animation: ball-scale-multiple 1s 0s linear infinite;
  }
  @keyframes ball-scale-multiple {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 0;
    }
    5% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
  }
}
</style>
