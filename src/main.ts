import Vue from "vue";
import VModal from "vue-js-modal";
import dotenv from "dotenv";
import App from "./App/index.vue";
import router from "./router";
import store from "@/store";
import myJSONAPI from "@/lib/myJSONAPI";
import "./registerServiceWorker";
dotenv.config();

Vue.config.productionTip = false;

Vue.use(VModal, { dialog: true });

// if (process.env.VUE_APP_INIT) {
//   Promise.all([myJSONAPI.initCurrentFucks(), myJSONAPI.initFuckGivenHistory()]).catch(() => {
//     throw new Error("Unable to establish backend");
//   });
// }

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
