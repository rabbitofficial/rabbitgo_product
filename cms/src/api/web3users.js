import request from '@/utils/request'

export function userList(data) {
  return request({
    url: 'app_data/users/userList',
    method: 'post',
    data
  })
}
