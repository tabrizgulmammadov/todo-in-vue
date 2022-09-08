import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import components from "./components/components";
import router from "./router";
import store from "./store";
import "@/assets/sass/main.scss";
import { i18n } from "./plugins/i18n";
import API from "./services";
import globalMixin from "./mixins/globalMixins";

window.API = API;

Vue.config.productionTip = false;

export const eventBus = new Vue();
Vue.prototype.$eventBus = eventBus;

Vue.config.productionTip = false;

components.forEach(({ name, component }) => {
  Vue.component(name, component);
});

Vue.mixin(globalMixin);

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
