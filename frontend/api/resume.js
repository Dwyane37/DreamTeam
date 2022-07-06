import request from '../utils/request'

export function submitResume(data) {
  return request({
    url: '/submitResume',
    method: 'post',
    data
  })
}

export function getResume(params) {
  return request({
    url: '/getResume',
    method: 'get',
    params
  })
}
