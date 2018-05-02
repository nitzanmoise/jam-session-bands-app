import Vue from 'vue'
import App from './views/Home.vue'
import router from './router'
import store from './store/store.js'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
