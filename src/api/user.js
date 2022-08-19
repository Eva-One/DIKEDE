import request from '@/utils/request'

/**
 * 登录
 * @param {*} data 登录用户信息
 * @returns Promise
 */
export function login(data) {
  return request({
    url: '/user-service/user/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {

}

export function logout() {

}
