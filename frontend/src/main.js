import Vue from "vue";
import App from "./views/App.vue";
import router from "./router";
import store from "./store/store.js";
import "./registerServiceWorker";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./css/main.css";
import $ from "jquery";
import VueSweetalert2 from "vue-sweetalert2";
import Swal from "sweetalert2";

Vue.use(VueSweetalert2);
Vue.use(Element);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
