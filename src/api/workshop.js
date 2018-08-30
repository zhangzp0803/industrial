import request from '@/utils/request'

const post = 'post';
// const get = 'get';
export function createWorkshop(data) {
  return request({
    url: '/industry/insetPlantMainData',
    method: post,
    data
  })
}

export function updateWorkshop(data) {
  return request({
    url: '/industry/updatePlantMainData',
    method: post,
    data
  })
}

export function delWorkshop(data) {
  return request({
    url: '/industry/deletePlantMainData',
    method: post,
    data
  })
}
