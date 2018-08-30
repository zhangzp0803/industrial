import axios from 'axios'
import {
  createPumpParament, updatePumpParament, delPumpParament,
  createPumpRealTimeData, updatePumpRealTimeData, delPumpRealTimeData,
  createPumpInspectionData, updatePumpInspectionData, delPumpInspectionData,
  createPumpShockData, updatePumpShockData, delPumpShockData,
  delPumpInfraredData, delPumpReport
} from '@/api/gatherPump'

const SET_PUMP_PARAMETERDATALIST = 'SET_PUMP_PARAMETERDATALIST'; // 参数
const SET_PUMP_REALTIMEDATALIST = 'SET_PUMP_REALTIMEDATALIST'; // 实时数据
const SET_PUMP_INSPECTIONDATALIST = 'SET_PUMP_INSPECTIONDATALIST'; // 巡检数据
const SET_PUMP_SHOCKDATALIST = 'SET_PUMP_SHOCKDATALIST'; // 震动数据
const SET_PUMP_INFRAREDDATALIST = 'SET_PUMP_INFRAREDDATALIST'; // 红外探测数据
const SET_PUMP_REPORT = 'SET_PUMP_REPORT'; // 电机专家报告

const ADD_PUMP_PARAMETERDATALIST = 'ADD_PUMP_PARAMETERDATALIST';
const ADD_PUMP_REALTIMEDATALIST = 'ADD_PUMP_REALTIMEDATALIST';
const ADD_PUMP_INSPECTIONDATALIST = 'ADD_PUMP_INSPECTIONDATALIST';
const ADD_PUMP_SHOCKDATALIST = 'ADD_PUMP_SHOCKDATALIST';


const UPDATE_PUMP_PARAMETERDATALIST = 'UPDATE_PUMP_PARAMETERDATALIST';
const UPDATE_PUMP_REALTIMEDATALIST = 'UPDATE_PUMP_REALTIMEDATALIST';
const UPDATE_PUMP_INSPECTIONDATALIST = 'UPDATE_PUMP_INSPECTIONDATALIST';
const UPDATE_PUMP_SHOCKDATALIST = 'UPDATE_PUMP_SHOCKDATALIST';

const DEL_PUMP_PARAMETERDATALIST = 'DEL_PUMP_PARAMETERDATALIST';
const DEL_PUMP_REALTIMEDATALIST = 'DEL_PUMP_REALTIMEDATALIST';
const DEL_PUMP_INSPECTIONDATALIST = 'DEL_PUMP_INSPECTIONDATALIST';
const DEL_PUMP_SHOCKDATALIST = 'DEL_PUMP_SHOCKDATALIST'
const DEL_PUMP_INFRAREDDATALIST = 'DEL_PUMP_INFRAREDDATALIST'
const DEL_PUMP_REPORT = 'DEL_PUMP_REPORT'; // 电机专家报告

const gather = {
  namespaced: true,
  state: {
    pumpParameterDataList: [],
    pumpRealTimeDataList: [],
    pupmInspectionDataList: [],
    pupmShockDataList: [],
    pupmInfraredDataList: [],
    pumpReportList: []
  },
  actions: {
    // 泵设备参数增删改查
    getPumpParameterDataList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {collectionid: obj.collectionid}).then(data => {
        commit(SET_PUMP_PARAMETERDATALIST, data);
      })
    },
    updatePumpParameterData({ commit }, obj) {
      if (obj.obj.edit) { // 追加一条
        commit(ADD_PUMP_PARAMETERDATALIST, obj);
      } else { // 修改后更新
        if (obj.obj.state === 'new') {
          createPumpParament(obj.obj).then((res) => {
            if (res.data.state === 'success') {
              obj.obj.pumpequipmentid = res.data.resultid;
              commit(UPDATE_PUMP_PARAMETERDATALIST, obj);
            } else {
              console.log(res)
            }
          }, (error) => {
            console.log(error)
          })
        } else {
          updatePumpParament(obj.obj).then((res) => {
            if (res.data.state === 'success') {
              obj.obj.pumpequipmentid = res.data.resultid;
              commit(UPDATE_PUMP_PARAMETERDATALIST, obj);
            } else {
              console.log(res)
            }
          }, (error) => {
            console.log(error)
          })
        }
      }
    },
    delPumpParameterData({ commit }, obj) {
      delPumpParament({pumpequipmentid: obj.obj.pumpequipmentid}).then((res) => {
        if (res.data.state === 'success') {
          commit(DEL_PUMP_PARAMETERDATALIST, obj.rowIndex);
        } else {
          console.log(res)
        }
      }, (error) => {
        console.log(error)
      })
    },
    // 泵实时数据增删改查
    getPumpRealTimeDataList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {collectionid: obj.collectionid}).then(data => {
        commit(SET_PUMP_REALTIMEDATALIST, data);
      })
    },
    updatePumpRealTimeData({ commit }, obj) {
      if (obj.obj.edit) { // 追加一条
        commit(ADD_PUMP_REALTIMEDATALIST, obj);
      } else { // 修改后更新
        if (obj.obj.state === 'new') {
          createPumpRealTimeData(obj.obj).then((res) => {
            if (res.data.state === 'success') {
              obj.obj.pumprealtimeid = res.data.resultid;
              commit(UPDATE_PUMP_REALTIMEDATALIST, obj);
            } else {
              console.log(res)
            }
          }, (error) => {
            console.log(error)
          })
        } else {
          updatePumpRealTimeData(obj.obj).then((res) => {
            if (res.data.state === 'success') {
              obj.obj.pumprealtimeid = res.data.resultid;
              commit(UPDATE_PUMP_REALTIMEDATALIST, obj);
            } else {
              console.log(res)
            }
          }, (error) => {
            console.log(error)
          })
        }
      }
    },
    delPumpRealTimeData({ commit }, obj) {
      delPumpRealTimeData({pumprealtimeid: obj.obj.pumprealtimeid}).then((res) => {
        if (res.data.state === 'success') {
          commit(DEL_PUMP_REALTIMEDATALIST, obj.rowIndex);
        } else {
          console.log(res)
        }
      }, (error) => {
        console.log(error)
      })
    },
    // 泵巡检数据
    getPumpInspectionDataList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {collectionid: obj.collectionid}).then(data => {
        commit(SET_PUMP_INSPECTIONDATALIST, data);
      })
    },
    updatePumpInspectionData({ commit }, obj) {
      if (obj.obj.edit) { // 追加一条
        commit(ADD_PUMP_INSPECTIONDATALIST, obj);
      } else { // 修改后更新
        if (obj.obj.state === 'new') {
          createPumpInspectionData(obj.obj).then((res) => {
            if (res.data.state === 'success') {
              obj.obj.inspectionid = res.data.resultid;
              commit(UPDATE_PUMP_INSPECTIONDATALIST, obj);
            } else {
              console.log(res)
            }
          }, (error) => {
            console.log(error)
          })
        } else {
          updatePumpInspectionData(obj.obj).then((res) => {
            if (res.data.state === 'success') {
              obj.obj.inspectionid = res.data.resultid;
              commit(UPDATE_PUMP_INSPECTIONDATALIST, obj);
            } else {
              console.log(res)
            }
          }, (error) => {
            console.log(error)
          })
        }
      }
    },
    delPumpInspectionData({ commit }, obj) {
      delPumpInspectionData({inspectionid: obj.obj.inspectionid}).then((res) => {
        if (res.data.state === 'success') {
          commit(DEL_PUMP_INSPECTIONDATALIST, obj.rowIndex);
        } else {
          console.log(res)
        }
      }, (error) => {
        console.log(error)
      })
    },
    // 泵震动数据
    getPupmShockDataList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {collectionid: obj.collectionid}).then(data => {
        commit(SET_PUMP_SHOCKDATALIST, data);
      })
    },
    updatePumpShockData({ commit }, obj) {
      if (obj.obj.edit) { // 追加一条
        commit(ADD_PUMP_SHOCKDATALIST, obj);
      } else { // 修改后更新
        if (obj.obj.state === 'new') {
          createPumpShockData(obj.obj).then((res) => {
            if (res.data.state === 'success') {
              obj.obj.pumpshockid = res.data.resultid;
              commit(UPDATE_PUMP_SHOCKDATALIST, obj);
            } else {
              console.log(res)
            }
          }, (error) => {
            console.log(error)
          })
        } else {
          updatePumpShockData(obj.obj).then((res) => {
            if (res.data.state === 'success') {
              obj.obj.pumpshockid = res.data.resultid;
              commit(UPDATE_PUMP_SHOCKDATALIST, obj);
            } else {
              console.log(res)
            }
          }, (error) => {
            console.log(error)
          })
        }
      }
    },
    delPumpShockData({ commit }, obj) {
      delPumpShockData({pumpshockid: obj.obj.pumpshockid}).then((res) => {
        if (res.data.state === 'success') {
          commit(DEL_PUMP_SHOCKDATALIST, obj.rowIndex);
        } else {
          console.log(res)
        }
      }, (error) => {
        console.log(error)
      })
    },
    // 电机红外探测数据
    getPumpInfraredDataList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {collectionid: obj.collectionid}).then(data => {
        commit(SET_PUMP_INFRAREDDATALIST, data);
      })
    },
    delPumpInfraredData({ commit }, obj) {
      delPumpInfraredData({pumpinfraredid: obj.obj.pumpinfraredid}).then((res) => {
        if (res.data.state === 'success') {
          commit(DEL_PUMP_INFRAREDDATALIST, obj.rowIndex);
        } else {
          console.log(res)
        }
      }, (error) => {
        console.log(error)
      })
    },
    // 泵报告上传
    getPumpReportList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {collectionid: obj.collectionid}).then(data => {
        commit(SET_PUMP_REPORT, data);
      })
    },
    delPumpReport({ commit }, obj) {
      delPumpReport({pumpreportid: obj.obj.pumpreportid}).then((res) => {
        if (res.data.state === 'success') {
          commit(DEL_PUMP_REPORT, obj.rowIndex);
        } else {
          console.log(res)
        }
      }, (error) => {
        console.log(error)
      })
    }
  },
  mutations: {
    SET_PUMP_PARAMETERDATALIST(state, response) {
      response.data.forEach(d => {
        d.edit = false;
        d.state = 'edit';
      })
      state.pumpParameterDataList = response.data;
    },
    ADD_PUMP_PARAMETERDATALIST(state, data) {
      state.pumpParameterDataList.push(data.obj)
    },
    UPDATE_PUMP_PARAMETERDATALIST(state, data) {
      state.pumpParameterDataList.splice(data.rowIndex, 1, data.obj)
    },
    DEL_PUMP_PARAMETERDATALIST(state, rowIndex) {
      state.pumpParameterDataList.splice(rowIndex, 1)
    },
    SET_PUMP_REALTIMEDATALIST(state, response) {
      response.data.forEach(d => {
        d.edit = false;
        d.state = 'edit';
      })
      state.pumpRealTimeDataList = response.data;
    },
    ADD_PUMP_REALTIMEDATALIST(state, data) {
      state.pumpRealTimeDataList.push(data.obj)
    },
    UPDATE_PUMP_REALTIMEDATALIST(state, data) {
      state.pumpRealTimeDataList.splice(data.rowIndex, 1, data.obj)
    },
    DEL_PUMP_REALTIMEDATALIST(state, rowIndex) {
      state.pumpRealTimeDataList.splice(rowIndex, 1)
    },
    // 巡检数据
    SET_PUMP_INSPECTIONDATALIST(state, response) {
      response.data.forEach(d => {
        d.edit = false;
        d.state = 'edit';
      })
      state.pupmInspectionDataList = response.data;
    },
    ADD_PUMP_INSPECTIONDATALIST(state, data) {
      state.pupmInspectionDataList.push(data.obj)
    },
    UPDATE_PUMP_INSPECTIONDATALIST(state, data) {
      state.pupmInspectionDataList.splice(data.rowIndex, 1, data.obj)
    },
    DEL_PUMP_INSPECTIONDATALIST(state, rowIndex) {
      state.pupmInspectionDataList.splice(rowIndex, 1)
    },
    // 震动数据
    SET_PUMP_SHOCKDATALIST(state, response) {
      response.data.forEach(d => {
        d.edit = false;
        d.state = 'edit';
      })
      state.pupmShockDataList = response.data;
    },
    ADD_PUMP_SHOCKDATALIST(state, data) {
      state.pupmShockDataList.push(data.obj)
    },
    UPDATE_PUMP_SHOCKDATALIST(state, data) {
      state.pupmShockDataList.splice(data.rowIndex, 1, data.obj)
    },
    DEL_PUMP_SHOCKDATALIST(state, rowIndex) {
      state.pupmShockDataList.splice(rowIndex, 1)
    },
    // 红外数据
    SET_PUMP_INFRAREDDATALIST(state, response) {
      state.pupmInfraredDataList = response.data;
    },
    DEL_PUMP_INFRAREDDATALIST(state, rowIndex) {
      state.pupmInfraredDataList.splice(rowIndex, 1)
    },
    SET_PUMP_REPORT(state, response) {
      state.pumpReportList = response.data;
    },
    DEL_PUMP_REPORT(state, rowIndex) {
      state.pumpReportList.splice(rowIndex, 1)
    }

  }
}
export default gather
