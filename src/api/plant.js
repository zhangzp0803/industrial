import request from '@/utils/request'

const post = 'post';
// const get = 'get';
export function createPlant(data) {
  return request({
    url: '/industry/insetFactoryMainData',
    method: post,
    data
  })
}

export function updatePlant(data) {
  return request({
    url: '/industry/updateFactoryMainData',
    method: post,
    data
  })
}

export function delPlant(data) {
  return request({
    url: '/industry/deleteFactoryMainData',
    method: 'post',
    data
  })
}
