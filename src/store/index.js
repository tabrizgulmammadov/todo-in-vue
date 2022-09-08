import Vue from "vue";
import Vuex from "vuex";

import Common from "./modules/common";
import SearchParams from "./modules/searchParams";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Common,
    SearchParams,
  },
});
