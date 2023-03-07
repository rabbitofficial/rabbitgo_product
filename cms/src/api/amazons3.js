import request from '@/utils/request'

export function amazonS3(data) {
  return request({
    url: 'app_data/AmazonS3',
    method: 'post',
    data
  })
}

export function amazonS3List() {
  return request({
    url: 'app_data/AmazonS3/list',
    method: 'get'
  })
}

export function amazonS3test(data) {
  return request({
    url: 'app_data/AmazonS3/test',
    method: 'post',
    data
  })
}
