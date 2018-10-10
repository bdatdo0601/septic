import Vue from "vue";
import dotenv from "dotenv";
import App from "./App/index.vue";
import router from "./router";
import store from "@/store";
import JSONStoreAPI from "@/lib/jsonStoreAPI";
import "./registerServiceWorker";
dotenv.config();

Vue.config.productionTip = false;

if (process.env.VUE_APP_INIT) {
  Promise.all([JSONStoreAPI.initCurrentFucks(), JSONStoreAPI.initFuckGivenHistory()]).catch(() => {
    throw new Error("Unable to establish backend");
  });
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
