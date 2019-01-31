import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const USER_STORE = 'session.user'

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    UPDATE_USER (state, newUser) {
      state.user = newUser
    }
  },
  actions: {
    initUser ({ commit }) {
      const stored = localStorage.getItem(USER_STORE)
      if (stored) {
        try {
          const user = JSON.parse(stored)
          commit('UPDATE_USER', user)
        } catch (error) {}
      }
    },
    setUser ({ commit }, newUser) {
      commit('UPDATE_USER', newUser)
      localStorage.setItem(USER_STORE, newUser)
    },
    logout ({ commit }) {
      commit('UPDATE_USER', {})
      localStorage.removeItem(USER_STORE)
    }
  },
  getters: {
    user: state => state.user,
    isLoggedIn: state => !!state.user.id
  }
})
