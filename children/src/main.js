import Vue from "vue";

import Cookies from "js-cookie";

import Element from "element-ui";
import "./assets/styles/element-variables.scss";

import microApp from "@micro-zoe/micro-app";
Vue.config.ignoredElements = ["micro-app-vue"];

import "@/assets/styles/index.scss"; // global css
import "@/assets/styles/ruoyi.scss"; // ruoyi css
import App from "./App";
import store from "./store";
import router from "./router";
import directive from "./directive"; // directive
import plugins from "./plugins"; // plugins
import { download } from "@/utils/request";

import "./assets/icons"; // icon
import "./permission"; // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import {
  parseTime,
  resetForm,
  addDateRange,
  selectDictLabel,
  selectDictLabels,
  handleTree,
} from "@/utils/ruoyi";
// 分页组件
import Pagination from "@/components/Pagination";
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar";
// 富文本组件
import Editor from "@/components/Editor";
// 文件上传组件
import FileUpload from "@/components/FileUpload";
// 图片上传组件
import ImageUpload from "@/components/ImageUpload";
// 图片预览组件
import ImagePreview from "@/components/ImagePreview";
// 字典标签组件
import DictTag from "@/components/DictTag";
// 头部标签组件
import VueMeta from "vue-meta";
// 字典数据组件
import DictData from "@/components/DictData";

// 全局方法挂载
Vue.prototype.getDicts = getDicts;
Vue.prototype.getConfigKey = getConfigKey;
Vue.prototype.parseTime = parseTime;
Vue.prototype.resetForm = resetForm;
Vue.prototype.addDateRange = addDateRange;
Vue.prototype.selectDictLabel = selectDictLabel;
Vue.prototype.selectDictLabels = selectDictLabels;
Vue.prototype.download = download;
Vue.prototype.handleTree = handleTree;

// 全局组件挂载
Vue.component("DictTag", DictTag);
Vue.component("Pagination", Pagination);
Vue.component("RightToolbar", RightToolbar);
Vue.component("Editor", Editor);
Vue.component("FileUpload", FileUpload);
Vue.component("ImageUpload", ImageUpload);
Vue.component("ImagePreview", ImagePreview);

Vue.use(directive);
Vue.use(plugins);
Vue.use(VueMeta);
DictData.install();

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get("size") || "medium", // set element-ui default size
});

Vue.config.productionTip = false;

// 循环嵌套
microApp.start({
  tagName: "micro-app-vue",
});
let app = null;
// -------------------分割线-umd模式------------------ //
// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => {
  // return new Promise((resolve) => {
  // setTimeout(() => {

  app = new Vue({
    el: "#app",
    router,
    store,
    render: (h) => h(App),
  });
  console.log("【micro子应用】微应用vue2渲染了 -- UMD模式");
  // resolve()
  // }, 3000)
  // })
};

// 👇 将卸载操作放入 unmount 函数
window.unmount = () => {
  return new Promise((resolve) => {
    // setTimeout(() => {
    app.$destroy();
    app.$el.innerHTML = "";
    app = null;
    console.log("【micro子应用】微应用vue2卸载了 -- UMD模式");
    resolve();
    // }, 3000)
  });
};

// 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  console.log("【micro子应用】非微前端环境------------");

  window.mount();
}

// -------------------分割线------------------ //
