import request from '@/utils/request'

const post = 'post';
// const get = 'get';
export function createEquipment(data) {
  return request({
    url: '/industry/insetEquipmentMainData',
    method: post,
    data
  })
}

export function updateEquipment(data) {
  return request({
    url: '/industry/updateEquipmentMainData',
    method: post,
    data
  })
}

export function delEquipment(data) {
  return request({
    url: '/industry/deleteEquipmentMainData',
    method: post,
    data
  })
}
