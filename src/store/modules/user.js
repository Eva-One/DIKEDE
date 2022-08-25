import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getId, setId, removeId } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userId: getId(),
    userInfo: {},
    dktTime: ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    REMOVE_TOKEN(state) {
      state.token = null
      removeToken()
    },
    SET_USERID(state, userId) {
      state.userId = userId
      setId(userId)
    },
    REMOVE_USERID(state) {
      state.userId = null
      removeId()
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo
    },
    REMOVE_USERINFO(state) {
      state.userInfo = {}
    },
    SET_DKTTIME(state, time) {
      state.dktTime = time
    }
  },
  actions: {
    async login({ commit }, data) {
      const res = await login(data)
      commit('SET_TOKEN', res.token)
      commit('SET_USERID', res.userId)
      commit('SET_DKTTIME', +new Date())
    },

    // 获取用户信息
    async getInfo({ commit }, id) {
      const res = await getInfo(id)
      commit('SET_USERINFO', res)
    },

    logout({ commit }) {
      commit('REMOVE_TOKEN')
      commit('REMOVE_USERID')
      commit('REMOVE_USERINFO')
    }
  }
}
