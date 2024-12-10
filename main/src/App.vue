<template>
  <div id="app">
    <h1>以下是直接加载的子应用页面</h1>
    <micro-app
      name="vue2"
      url="http://localhost:9090"
      router-mode="state"
      :data="data"
      inline
    >
      <!-- cookie问题解决： 
        1. 配置disable-patch-request：会将子应用的请求地址转到主应用的ip端口下，易捷6的单点登录相关接口 跳转地址 都要配置代理。 
        2. 后端在写入cookie时设置SameSite为None
       -->
      <!-- 使用router-mode='state' & disable-patch-request 的时候 易捷6的cms栏目管理字典接口有问题 -->
      <!-- destroy inline scopecss  baseRoute='/vue2'   iframe  disable-patch-request-->
    </micro-app>
  </div>
</template>

<script>
import ThemePicker from "@/components/ThemePicker";

export default {
  name: "App",
  components: { ThemePicker },
  metaInfo() {
    return {
      title:
        this.$store.state.settings.dynamicTitle &&
        this.$store.state.settings.title,
      titleTemplate: (title) => {
        return title
          ? `${title} - ${process.env.VUE_APP_TITLE}`
          : process.env.VUE_APP_TITLE;
      },
    };
  },
};
</script>
<style scoped>
#app .theme-picker {
  display: none;
}
</style>
