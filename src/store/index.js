import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    auth: {
      loggedIn: false,
      employee: null
    }
  },
  mutations: {
    login(state, payload) {
      state.auth.loggedIn = true
      state.auth.employee = payload
    },
    logout(state) {
      state.auth.loggedIn = false
      state.auth.employee = null
    }
  },
  actions: {
    login({ commit }, loginData) {
      return axios.post('/loginEmployee', loginData)
        .then(response => {
          // 假設後端回傳資料中包含所需的資訊
          commit('login', response.data)
        })
    },
    logout({ commit }) {
      commit('logout')
    }
  },
  modules: {}
})