import axios from 'axios'

const SET_EQUIPMENTLIST = 'SET_EQUIPMENTLIST';
const ADD_EQUIPMENT = 'ADD_EQUIPMENT';
const UPDATE_EQUIPMENT = 'UPDATE_EQUIPMENT';
const DEL_EQUIPMENT = 'DEL_EQUIPMENT';

const workshop = {
  namespaced: true,
  state: {
    equipmentList: []
  },
  actions: {
    getEquipmentList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {}).then(data => {
        commit(SET_EQUIPMENTLIST, data);
      })
    },
    addEquipment({ commit }, obj) {
      commit(ADD_EQUIPMENT, obj);
    },
    updateEquipment({ commit }, obj) {
      commit(UPDATE_EQUIPMENT, obj);
    },
    delEquipment({ commit }, rowIndex) {
      commit(DEL_EQUIPMENT, rowIndex);
    }

  },
  mutations: {
    SET_EQUIPMENTLIST(state, response) {
      state.equipmentList = response.data;
    },
    ADD_EQUIPMENT(state, data) {
      state.equipmentList.push(data)
    },
    UPDATE_EQUIPMENT(state, data) {
      let index = data.rowIndex;
      delete data.rowIndex;
      state.equipmentList.splice(index, 1, data)
    },
    DEL_EQUIPMENT(state, rowIndex) {
      state.equipmentList.splice(rowIndex, 1)
    }
  }
}
export default workshop
