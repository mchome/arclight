import Vue from 'vue'
import axios from 'axios'
import { VueHammer } from 'vue2-hammer'

import App from './App'
import router from './router'
import store from './store'

Vue.use(VueHammer)
VueHammer.config.press = {
  threshold: 2000
}

window.print = console.log
window.localStorage.clear()

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
// Vue.config.performance = true

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
