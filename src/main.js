// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'es6-promise/auto'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import $ from 'jquery'
import * as filters from './filters' // global filters

import './permission' // permission control
import './mock' // simulation data
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.$http_Jsonp = function (url, para, callback) {
  var domain = 'http://10.12.16.29:8081';
  domain = '';
  $.ajax({
    url: domain + url,
    type: 'get',
    // dataType: 'jsonp',
    data: para,
    // jsonp: 'callback',
    success: function (rs) {
      callback(rs)
    },
    timeout: 300000
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
