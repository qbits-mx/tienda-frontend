import Vue from 'vue'
import axios from 'axios'
import router from './router'
import VModal from 'vue-js-modal'
import VueToast from 'vue-toast-notification'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import 'vue-toast-notification/dist/theme-sugar.css';
import App from './App'

Vue.use(VModal, BootstrapVue, IconsPlugin, VueToast)

axios.defaults.baseURL = process.env.VUE_APP_URL

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
