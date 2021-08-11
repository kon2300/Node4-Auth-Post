import axios from 'axios'
import router from '@/router'

export default {
  state: {
    jwtToken: '',
    user: '',
    error: '',
    allArticle: [],
    originalArticle: [],
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
    SET_ALL_ARTICLE(state, value) {
      state.allArticle = value
    },
    SET_ORIGINAL_ARTICLE(state, value) {
      state.originalArticle = value
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
    postArticle: async ({ state }, postData) => {
      postData['user_id'] = state.user.userid
      await axios.post('post/postArticle', postData)
      router.push({ name: 'everybodys-posts' })
    },
    updateArticle: async ({ state }, postData) => {
      postData['article_id'] = state.originalArticle.id
      await axios.put('post/updateArticle', postData)
      router.push({ name: 'everybodys-posts' })
    },
    showArticles: async ({ commit }) => {
      const res = await axios.get('post/showArticles')
      commit('SET_ALL_ARTICLE', res.data.articles)
    },
    editArticle: async ({ commit }, article_id) => {
      const res = await axios.post('post/editArticle', {
        article_id: article_id,
      })
      commit('SET_ORIGINAL_ARTICLE', res.data.article)
    },
    removeArticle: async ({ state }) => {
      const postData = { article_id: state.originalArticle.id }

      const res = await axios.delete('post/removeArticle', { data: postData })
      console.log(res.data)
      router.push({ name: 'everybodys-posts' })
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
