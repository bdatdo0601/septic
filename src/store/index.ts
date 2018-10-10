import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import fucks from "./fucks";
import { RootState } from "@/store/types";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "0.0.1",
  },
  modules: {
    fucks,
  },
};

export default new Vuex.Store(store);
