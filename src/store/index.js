import Vue from 'vue'
import Vuex from 'vuex'

import gather from './modules/gather';
import gatherPump from './modules/gatherPump';
import dashboard from '../components/dashboard/dashboard';
import user from './modules/user'
import plant from './modules/plant'
import workshop from './modules/workshop'
import equipment from './modules/equipment'
import getters from './getters'
import permission from './modules/permission'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    showSidbar: true,
    collapse: false
  },
  mutations: {
    updateShowSidabr(state, data) {
      state.showSidbar = data;
    },
    updateCollapse(state, data) {
      state.collapse = !state.collapse;
    }
  },
  actions: {
    updateShowSidabr({commit}, data) {
      commit('updateShowSidabr', data);
    },
    updateCollapse({commit}, data) {
      commit('updateCollapse', data);
    }
  },
  modules: {
    dashboard,
    // login,
    permission,
    gather,
    gatherPump,
    user,
    plant,
    workshop,
    equipment
  },
  getters
});
export default store
