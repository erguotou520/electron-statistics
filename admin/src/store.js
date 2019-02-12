import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const USER_STORE = 'session.user'

let stored = localStorage.getItem(USER_STORE)
if (stored) {
  try {
    stored = JSON.parse(stored)
  } catch (error) {}
}

export default new Vuex.Store({
  state: {
    user: stored ? stored.user : {},
    token: stored ? stored.token : ''
  },
  mutations: {
    UPDATE_USER (state, { user, token }) {
      state.user = user
      state.token = token
    }
  },
  actions: {
    setUser ({ commit }, { user, token }) {
      commit('UPDATE_USER', { user, token })
      localStorage.setItem(USER_STORE, JSON.stringify({ user, token }))
    },
    logout ({ commit }) {
      commit('UPDATE_USER', { user: {}, token: '' })
      localStorage.removeItem(USER_STORE)
    }
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
    isLoggedIn: state => !!state.user.name
  }
})
