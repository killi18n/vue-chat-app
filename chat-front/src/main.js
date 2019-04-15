import Vue from "vue";
import Vuetify from "vuetify";
import store from "./store";
import "./plugins/vuetify";
import "./plugins/socketPlugin";
import Directives from "./plugins/directives";
import router from "./router";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(Directives);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
