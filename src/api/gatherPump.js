import request from '@/utils/request'

const post = 'post';

// 电机设备参数
export function createPumpParament(data) {
  return request({
    url: '/industry/insetPumpDataCollection',
    method: post,
    data
  })
}

export function updatePumpParament(data) {
  return request({
    url: '/industry/updatePumpDataCollection',
    method: post,
    data
  })
}

export function delPumpParament(data) {
  return request({
    url: '/industry/deletePumpDataCollection',
    method: post,
    data
  })
}

// 运行实时参数数据
export function createPumpRealTimeData(data) {
  return request({
    url: '/industry/insetPumpRealData',
    method: post,
    data
  })
}

export function updatePumpRealTimeData(data) {
  return request({
    url: '/industry/updatePumpRealData',
    method: post,
    data
  })
}

export function delPumpRealTimeData(data) {
  return request({
    url: '/industry/deletePumpRealData',
    method: post,
    data
  })
}

// 巡检数据
export function createPumpInspectionData(data) {
  return request({
    url: '/industry/insetPumpInspectionData',
    method: post,
    data
  })
}

export function updatePumpInspectionData(data) {
  return request({
    url: '/industry/updatePumpInspectionData',
    method: post,
    data
  })
}

export function delPumpInspectionData(data) {
  return request({
    url: '/industry/deletePumpInspectionData',
    method: post,
    data
  })
}

// 电机震动数据
export function createPumpShockData(data) {
  return request({
    url: '/industry/insetPumpShockData',
    method: post,
    data
  })
}

export function updatePumpShockData(data) {
  return request({
    url: '/industry/updatePumpShockData',
    method: post,
    data
  })
}

export function delPumpShockData(data) {
  return request({
    url: '/industry/deletePumpShockData',
    method: post,
    data
  })
}


// 电机红外数据
export function delPumpInfraredData(data) {
  return request({
    url: '/industry/deletePumpInfraredData',
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
