import axios from 'axios'
import {
  createParament,
  updateParament,
  delParament,
  createRealTimeData,
  updateRealTimeData,
  delRealTimeData,
  delNoisyData,
  delInfraredData,
  delMotorReport,
  createVibrationData,
  updateVibrationData,
  delVibrationData
} from '@/api/gather'

const SET_GATHERLIST = 'SET_GATHERLIST';// 采集主数据
const SET_PARAMETERDATALIST = 'SET_PARAMETERDATALIST';
const SET_REALTIMEDATALIST = 'SET_REALTIMEDATALIST';
const SET_NOISYDATALIST = 'SET_NOISYDATALIST';
const SET_VIBRATIONDATALIST = 'SET_VIBRATIONDATALIST';
const SET_INFRAREDDATA = 'SET_INFRAREDDATA';
const SET_MOTORREPORT = 'SET_MOTORREPORT'; // 电机专家报告

const ADD_GATHER = 'ADD_GATHER';
const ADD_PARAMETERDATALIST = 'ADD_PARAMETERDATALIST';
const ADD_REALTIMEDATALIST = 'ADD_REALTIMEDATALIST';
const ADD_VIBRATIONDATALIST = 'ADD_VIBRATIONDATALIST';


const UPDATE_GATHER = 'UPDATE_GATHER';
const UPDATE_PARAMETERDATALIST = 'UPDATE_PARAMETERDATALIST';
const UPDATE_REALTIMEDATALIST = 'UPDATE_REALTIMEDATALIST';
const UPDATE_VIBRATIONDATALIST = 'UPDATE_VIBRATIONDATALIST';

const DEL_GATHER = 'DEL_GATHER';
const DEL_PARAMETERDATALIST = 'DEL_PARAMETERDATALIST';
const DEL_REALTIMEDATALIST = 'DEL_REALTIMEDATALIST';
const DEL_NOISYDATALIST = 'DEL_NOISYDATALIST'
const DEL_VIBRATIONDATALIST = 'DEL_VIBRATIONDATALIST'
const DEL_INFRAREDDATA = 'DEL_INFRAREDDATA' // 点击红外探测数据
const DEL_MOTORREPORT = 'DEL_MOTORREPORT'; // 电机专家报告

const gather = {
  namespaced: true,
  state: {
    gatherList: [],
    parameterDataList: [],
    realTimeDataList: [],
    noisyDataList: [],
    vibrationDataList: [],
    infraredDataList: [],
    motorReportList: []
  },
  actions: {
    // 采集主数据增删改查
    getGatherList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {}).then(data => {
        commit(SET_GATHERLIST, data);
      })
    },
    addGather({ commit }, obj) {
      commit(ADD_GATHER, obj);
    },
    updateGather({ commit }, obj) {
      commit(UPDATE_GATHER, obj);
    },
    delGather({ commit }, obj) {
      commit(DEL_GATHER, obj);
    },
    // 电机设备参数增删改查
    getParameterDataList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {collectionid: obj.collectionid}).then(data => {
        commit(SET_PARAMETERDATALIST, data);
      })
    },
    updateParameterData({ commit }, obj) {
      if (obj.obj.edit) { // 追加一条
        commit(ADD_PARAMETERDATALIST, obj);
      } else { // 修改后更新
        if (obj.obj.state === 'new') {
          createParament(obj.obj).then((res) => {
            if (res.data.state === 'success') {
              obj.obj.motorequipmentid = res.data.resultid;
              commit(UPDATE_PARAMETERDATALIST, obj);
            } else {
              console.log(res)
            }
          }, (error) => {
            console.log(error)
          })
        } else {
          updateParament(obj.obj).then((res) => {
            if (res.data.state === 'success') {
              obj.obj.motorequipmentid = res.data.resultid;
              commit(UPDATE_PARAMETERDATALIST, obj);
            } else {
              console.log(res)
            }
          }, (error) => {
            console.log(error)
          })
        }
      }
    },
    delParameterData({ commit }, obj) {
      delParament({motorequipmentid: obj.obj.motorequipmentid}).then((res) => {
        if (res.data.state === 'success') {
          commit(DEL_PARAMETERDATALIST, obj.rowIndex);
        } else {
          console.log(res)
        }
      }, (error) => {
        console.log(error)
      })
    },
    // 电机实时数据增删改查
    getRealTimeDataList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {collectionid: obj.collectionid}).then(data => {
        commit(SET_REALTIMEDATALIST, data);
      })
    },
    updateRealTimeData({ commit }, obj) {
      if (obj.obj.edit) { // 追加一条
        commit(ADD_REALTIMEDATALIST, obj);
      } else { // 修改后更新
        if (obj.obj.state === 'new') {
          createRealTimeData(obj.obj).then((res) => {
            if (res.data.state === 'success') {
              obj.obj.motorrealdataid = res.data.resultid;
              commit(UPDATE_REALTIMEDATALIST, obj);
            } else {
              console.log(res)
            }
          }, (error) => {
            console.log(error)
          })
        } else {
          updateRealTimeData(obj.obj).then((res) => {
            if (res.data.state === 'success') {
              obj.obj.motorrealdataid = res.data.resultid;
              commit(UPDATE_REALTIMEDATALIST, obj);
            } else {
              console.log(res)
            }
          }, (error) => {
            console.log(error)
          })
        }
      }
    },
    delRealTimeData({ commit }, obj) {
      delRealTimeData({motorrealdataid: obj.obj.motorrealdataid}).then((res) => {
        if (res.data.state === 'success') {
          commit(DEL_REALTIMEDATALIST, obj.rowIndex);
        } else {
          console.log(res)
        }
      }, (error) => {
        console.log(error)
      })
    },
    // 电机噪音数据增删改查
    getNoisyDataList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {collectionid: obj.collectionid}).then(data => {
        commit(SET_NOISYDATALIST, data);
      })
    },
    delNoisyData({ commit }, obj) {
      delNoisyData({motornoiseid: obj.obj.motornoiseid}).then((res) => {
        if (res.data.state === 'success') {
          commit(DEL_NOISYDATALIST, obj.rowIndex);
        } else {
          console.log(res)
        }
      }, (error) => {
        console.log(error)
      })
    },

    // 电机报告上传
    getMotorReportList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {collectionid: obj.collectionid}).then(data => {
        commit(SET_MOTORREPORT, data);
      })
    },
    delMotorReport({ commit }, obj) {
      delMotorReport({motorreportid: obj.obj.motorreportid}).then((res) => {
        if (res.data.state === 'success') {
          commit(DEL_MOTORREPORT, obj.rowIndex);
        } else {
          console.log(res)
        }
      }, (error) => {
        console.log(error)
      })
    },
    // 电机震动数据
    getVibrationDataList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {collectionid: obj.collectionid}).then(data => {
        commit(SET_VIBRATIONDATALIST, data);
      })
    },
    updateVibrationData({ commit }, obj) {
      if (obj.obj.edit) { // 追加一条
        commit(ADD_VIBRATIONDATALIST, obj);
      } else { // 修改后更新
        if (obj.obj.state === 'new') {
          createVibrationData(obj.obj).then((res) => {
            if (res.data.state === 'success') {
              obj.obj.motorshockid = res.data.resultid;
              commit(UPDATE_VIBRATIONDATALIST, obj);
            } else {
              console.log(res)
            }
          }, (error) => {
            console.log(error)
          })
        } else {
          updateVibrationData(obj.obj).then((res) => {
            if (res.data.state === 'success') {
              obj.obj.motorshockid = res.data.resultid;
              commit(UPDATE_VIBRATIONDATALIST, obj);
            } else {
              console.log(res)
            }
          }, (error) => {
            console.log(error)
          })
        }
      }
    },
    delVibrationData({ commit }, obj) {
      delVibrationData({motorshockid: obj.obj.motorshockid}).then((res) => {
        if (res.data.state === 'success') {
          commit(DEL_VIBRATIONDATALIST, obj.rowIndex);
        } else {
          console.log(res)
        }
      }, (error) => {
        console.log(error)
      })
    },
    // 电机红外探测数据
    getInfraredDataList({ commit }, obj) {
      axios.post(process.env.BASE_API + obj.url, {collectionid: obj.collectionid}).then(data => {
        commit(SET_INFRAREDDATA, data);
      })
    },
    delInfraredData({ commit }, obj) {
      delInfraredData({motorinfraredid: obj.obj.motorinfraredid}).then((res) => {
        if (res.data.state === 'success') {
          commit(DEL_INFRAREDDATA, obj.rowIndex);
        } else {
          console.log(res)
        }
      }, (error) => {
        console.log(error)
      })
    }

  },
  mutations: {
    SET_GATHERLIST(state, response) {
      state.gatherList = response.data;
    },
    ADD_GATHER(state, data) {
      state.gatherList.push(data)
    },
    UPDATE_GATHER(state, data) {
      state.gatherList.splice(data.rowIndex, 1, data)
    },

    DEL_GATHER(state, rowIndex) {
      state.gatherList.splice(rowIndex, 1)
    },
    SET_PARAMETERDATALIST(state, response) {
      response.data.forEach(d => {
        d.edit = false;
        d.state = 'edit';
      })
      state.parameterDataList = response.data;
    },
    ADD_PARAMETERDATALIST(state, data) {
      state.parameterDataList.push(data.obj)
    },
    UPDATE_PARAMETERDATALIST(state, data) {
      state.parameterDataList.splice(data.rowIndex, 1, data.obj)
    },
    DEL_PARAMETERDATALIST(state, rowIndex) {
      state.parameterDataList.splice(rowIndex, 1)
    },
    SET_REALTIMEDATALIST(state, response) {
      response.data.forEach(d => {
        d.edit = false;
        d.state = 'edit';
      })
      state.realTimeDataList = response.data;
    },
    ADD_REALTIMEDATALIST(state, data) {
      state.realTimeDataList.push(data.obj)
    },
    UPDATE_REALTIMEDATALIST(state, data) {
      state.realTimeDataList.splice(data.rowIndex, 1, data.obj)
    },
    DEL_REALTIMEDATALIST(state, rowIndex) {
      state.realTimeDataList.splice(rowIndex, 1)
    },
    SET_NOISYDATALIST(state, response) {
      state.noisyDataList = response.data;
    },
    DEL_NOISYDATALIST(state, rowIndex) {
      state.noisyDataList.splice(rowIndex, 1)
    },
    SET_MOTORREPORT(state, response) {
      state.motorReportList = response.data;
    },
    DEL_MOTORREPORT(state, rowIndex) {
      state.motorReportList.splice(rowIndex, 1)
    },
    SET_VIBRATIONDATALIST(state, response) {
      response.data.forEach(d => {
        d.edit = false;
        d.state = 'edit';
      })
      state.vibrationDataList = response.data;
    },
    ADD_VIBRATIONDATALIST(state, data) {
      state.vibrationDataList.push(data.obj)
    },
    UPDATE_VIBRATIONDATALIST(state, data) {
      state.vibrationDataList.splice(data.rowIndex, 1, data.obj)
    },
    DEL_VIBRATIONDATALIST(state, rowIndex) {
      state.vibrationDataList.splice(rowIndex, 1)
    },
    SET_INFRAREDDATA(state, response) {
      state.infraredDataList = response.data;
    },
    DEL_INFRAREDDATA(state, rowIndex) {
      state.infraredDataList.splice(rowIndex, 1)
    }

  }
}
export default gather
