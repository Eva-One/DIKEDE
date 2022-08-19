import { login } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      setToken(token)
    },
    REMOVE_TOKEN(state, token) {
      state.token = null
      removeToken(token)
    }
  },
  actions: {
    async login({ commit }, data) {
      const res = await login(data)
      commit('SET_TOKEN', res.token)
    }
  }
}
