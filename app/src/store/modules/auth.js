import axios from 'axios'
import router from '@/router'

export default {
  state: {
    jwtToken: '',
    user: '',
    error: '',
  },
  mutations: {
    SET_TOKEN(state, value) {
      state.jwtToken = value
    },
    SET_USER(state, value) {
      state.user = value
    },
    SET_ERROR_MESSAGE(state, value) {
      state.error = value
    },
  },
  getters: {
    authenticated: (state) => state.jwtToken && state.user,
    errorMessage: (state) => state.error,
  },
  actions: {
    postSignUp: async ({ commit, dispatch }, postData) => {
      const res = await axios.post('auth/signUp', postData)
      commit('SET_ERROR_MESSAGE', res.data.error)

      try {
        dispatch('attempt', res.data.jwtToken)
      } catch (e) {
        commit('SET_TOKEN', '')
        commit('SET_USER', '')
      }
    },
    postSignIn: async ({ commit, dispatch }, postData) => {
      console.log(postData)
      const res = await axios.post('auth/signIn', postData)
      commit('SET_ERROR_MESSAGE', res.data.error)

      try {
        dispatch('attempt', res.data.jwtToken)
      } catch (e) {
        commit('SET_TOKEN', '')
        commit('SET_USER', '')
      }
    },
    attempt: async ({ state, commit }, token) => {
      commit('SET_TOKEN', token)
      const res = await axios.get('auth/verify')

      try {
        commit('SET_USER', res.data.decoded)
        router.push({ name: 'my-home', params: { id: state.user.userid } })
      } catch (e) {
        commit('SET_TOKEN', '')
        commit('SET_USER', '')
      }
    },
    logout: async ({ commit }) => {
      await axios.post('auth/logout')
      try {
        commit('SET_TOKEN', '')
        commit('SET_USER', '')
        router.push({ name: 'top' })
      } catch (e) {
        console.log(e)
      }
    },
  },
}
