import axios from 'axios'
import router from '@/router'

export default {
  state: {
    allArticle: [],
    originalArticle: [],
  },
  mutations: {
    SET_ALL_ARTICLE(state, value) {
      state.allArticle = value
    },
    SET_ORIGINAL_ARTICLE(state, value) {
      state.originalArticle = value
    },
  },
  getters: {},
  actions: {
    postArticle: async (_, postData) => {
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
  },
}
