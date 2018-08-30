import request from '@/utils/request'

const post = 'post';
// const get = 'get';
export function createGather(data) {
  return request({
    url: '/industry/insetCollectionData',
    method: post,
    data
  })
}

// 更新 状态
export function updateGather(data) {
  return request({
    url: '/industry/updateCollectionData',
    method: post,
    data
  })
}

export function delGather(data) {
  return request({
    url: '/industry/deleteCollectionData',
    method: post,
    data
  })
}


// 电机设备参数
export function createParament(data) {
  return request({
    url: '/industry/insetMotorDataCollection',
    method: post,
    data
  })
}

export function updateParament(data) {
  return request({
    url: '/industry/updateMotorDataCollection',
    method: post,
    data
  })
}

export function delParament(data) {
  return request({
    url: '/industry/deleteMotorDataCollection',
    method: post,
    data
  })
}

// 运行实时参数数据
export function createRealTimeData(data) {
  return request({
    url: '/industry/insetMotorRealData',
    method: post,
    data
  })
}

export function updateRealTimeData(data) {
  return request({
    url: '/industry/updateMotorRealData',
    method: post,
    data
  })
}

export function delRealTimeData(data) {
  return request({
    url: '/industry/deleteMotorRealData',
    method: post,
    data
  })
}

// 噪音数据
export function delNoisyData(data) {
  return request({
    url: '/industry/deleteMotorNoiseData',
    method: post,
    data
  })
}

// 电机震动数据
export function createVibrationData(data) {
  return request({
    url: '/industry/insetMotorShockData',
    method: post,
    data
  })
}

export function updateVibrationData(data) {
  return request({
    url: '/industry/updateMotorShockData',
    method: post,
    data
  })
}

export function delVibrationData(data) {
  return request({
    url: '/industry/deleteMotorShockData',
    method: post,
    data
  })
}


// 电机红外数据
export function delInfraredData(data) {
  return request({
    url: '/industry/deleteMotorInfraredData',
    method: post,
    data
  })
}

// 电机报告删除
export function delPumpReport(data) {
  return request({
    url: '/industry/deletePumpReportData',
    method: post,
    data
  })
}
