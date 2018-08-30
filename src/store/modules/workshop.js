import axios from 'axios'

const SET_WORKSHOPLIST = 'SET_WORKSHOPLIST';
const ADD_WORKSHOP = 'ADD_WORKSHOP';
const UPDATE_WORKSHOP = 'UPDATE_WORKSHOP';
const DEL_WORKSHOP = 'DEL_WORKSHOP';

const workshop = {
  namespaced: true,
  state: {
    workshopList: []
  },
  actions: {
    getWorkshopList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {}).then(data => {
        commit(SET_WORKSHOPLIST, data);
      })
    },
    addWorkshop({ commit }, obj) {
      commit(ADD_WORKSHOP, obj);
    },
    updateWorkshop({ commit }, obj) {
      commit(UPDATE_WORKSHOP, obj);
    },
    delWorkshop({ commit }, rowIndex) {
      commit(DEL_WORKSHOP, rowIndex);
    }

  },
  mutations: {
    SET_WORKSHOPLIST(state, response) {
      state.workshopList = response.data;
    },
    ADD_WORKSHOP(state, data) {
      state.workshopList.push(data)
    },
    UPDATE_WORKSHOP(state, data) {
      let index = data.rowIndex;
      delete data.rowIndex;
      state.workshopList.splice(index, 1, data)
    },
    DEL_WORKSHOP(state, rowIndex) {
      state.workshopList.splice(rowIndex, 1)
    }
  }
}
export default workshop
