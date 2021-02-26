// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import i18n from './i18n'
Vue.prototype.echarts = echarts
import axios from 'axios' /* 引入axios进行地址访问*/
　　Vue.prototype.$http = axios
Vue.use(echarts)
Vue.use(Element)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
