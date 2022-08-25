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

/**
 *获取用户信息
 * @param {*} id 用户ID
 * @returns Promise
 */
export function getInfo(id) {
  return request({
    url: `/user-service/user/${id}`
  })
}

export function logout() {

}
