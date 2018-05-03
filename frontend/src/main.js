import Vue from 'vue'
import App from './views/App.vue'
import router from './router'
import store from './store/store.js'
import './registerServiceWorker'

import Element from 'element-ui'
 
Vue.use(Element)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
