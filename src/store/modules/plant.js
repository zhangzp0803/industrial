import axios from 'axios'

const SET_PLANTLIST = 'SET_PLANTLIST';
const ADD_PLANT = 'ADD_PLANT';
const UPDATE_PLANT = 'UPDATE_PLANT';
const DEL_PLANT = 'DEL_PLANT';

const plant = {
  namespaced: true,
  state: {
    plantList: []
  },
  actions: {
    getPlantList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {}).then(data => {
        commit(SET_PLANTLIST, data);
      })
    },
    addPlant({ commit }, obj) {
      commit(ADD_PLANT, obj);
    },
    updatePlant({ commit }, obj) {
      commit(UPDATE_PLANT, obj);
    },
    delPlant({ commit }, rowIndex) {
      commit(DEL_PLANT, rowIndex);
    }

  },
  mutations: {
    SET_PLANTLIST(state, response) {
      state.plantList = response.data;
    },
    ADD_PLANT(state, data) {
      state.plantList.push(data)
    },
    UPDATE_PLANT(state, data) {
      let index = data.rowIndex;
      delete data.rowIndex;
      state.plantList.splice(index, 1, data)
    },
    DEL_PLANT(state, rowIndex) {
      state.plantList.splice(rowIndex, 1)
    }
  }
}
export default plant
