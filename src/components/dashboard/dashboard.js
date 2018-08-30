import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);
export default {
  namespaced: true,
  state: {
    monitor: {},
    errorList: [],
    realTime: {},
    EMSData: {},
    b: {},
    f: {},
    cmswavedata: {},
    tendata: {},
    daydata: {},
    cmsstatisticdata: {},
    statedata: {},
    errordata: {},
    powcurvedata: {}
  },
  actions: {
    getMonitor({ commit }, obj) {
      axios.get(obj.url, {withCredentials: true}).then(data => {
        commit('updateMonitor', data);
      })
    },
    getErrorList({ commit }, obj) {
      Vue.prototype.$http_Jsonp(obj.url, {timeNum: -1}, function (data) {
        console.log(data)
        commit('updateErrorList', data);
      })
    },
    getRealTime({ commit }, obj) {
      Vue.prototype.$http_Jsonp(obj.url, {withCredentials: true}, function (data) {
        commit('updateRealTime', data);
      })
    },
    getEMSData({ commit }, obj) {
      Vue.prototype.$http_Jsonp(obj.url, {withCredentials: true}, data => {
        commit('updateEMSData', data);
      })
    },
    getBData({ commit }, obj) {
      Vue.prototype.$http_Jsonp(obj.url, {withCredentials: true}, data => {
        commit('updateBData', data);
      })
    },
    getFData({ commit }, obj) {
      Vue.prototype.$http_Jsonp(obj.url, {withCredentials: true}, data => {
        commit('updateFData', data);
      })
    },
    getCmswavedata({ commit }, obj) {
      Vue.prototype.$http_Jsonp(obj.url, {withCredentials: true}, data => {
        commit('updateCmswavedata', data);
      })
    },
    getTendata({ commit }, obj) {
      Vue.prototype.$http_Jsonp(obj.url, {withCredentials: true}, data => {
        commit('updateTendata', data);
      })
    },
    getDaydata({ commit }, obj) {
      Vue.prototype.$http_Jsonp(obj.url, {withCredentials: true}, data => {
        commit('updateDaydata', data);
      })
    },
    getCmsstatisticdata({ commit }, obj) {
      Vue.prototype.$http_Jsonp(obj.url, {withCredentials: true}, data => {
        commit('updateCmsstatisticdata', data);
      })
    },
    getStatedata({ commit }, obj) {
      Vue.prototype.$http_Jsonp(obj.url, {withCredentials: true}, data => {
        commit('updateStatedata', data);
      })
    },
    getErrordata({ commit }, obj) {
      Vue.prototype.$http_Jsonp(obj.url, {withCredentials: true}, data => {
        commit('updateErrordata', data);
      })
    },
    getPowcurvedata({ commit }, obj) {
      Vue.prototype.$http_Jsonp(obj.url, {withCredentials: true}, data => {
        commit('updatePowcurvedata', data);
      })
    }
  },
  mutations: {
    updateMonitor(state, response) {
      state.monitor = response.data;
    },
    updateErrorList(state, response) {
      state.errorList = response;
    },
    updateRealTime(state, response) {
      state.realTime = response;
    },
    updateEMSData(state, response) {
      state.EMSData = response;
    },
    updateBData(state, response) {
      state.b = response;
    },
    updateFData(state, response) {
      state.f = response;
    },
    updateCmswavedata(state, response) {
      state.cmswavedata = response;
    },
    updateTendata(state, response) {
      state.tendata = response;
    },
    updateDaydata(state, response) {
      state.daydata = response;
    },
    updateCmsstatisticdata(state, response) {
      state.cmsstatisticdata = response;
    },
    updateStatedata(state, response) {
      state.statedata = response;
    },
    updateErrordata(state, response) {
      state.errordata = response;
    },
    updatePowcurvedata(state, response) {
      state.powcurvedata = response;
    }
  }
}
