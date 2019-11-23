import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'
// import axios from'axios'

Vue.config.productionTip = false
Vue.prototype.$http = http
// Vue.prototype.axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

