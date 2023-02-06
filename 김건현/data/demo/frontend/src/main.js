import Vue from 'vue'
import App from './App'
import axios from "axios";
import store from "@/store";
import router from "@/router";

Vue.prototype.$axios = axios;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
