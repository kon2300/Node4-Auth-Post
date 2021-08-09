<template>
  <div v-if="user">
    <div v-for="article in allArticle" :key="article.id">
      <div class="content columns is-centered">
        <div
          class="box m-5 has-background-success-light column is-6 is-offset-6"
        >
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img alt="Vue logo" src="@/assets/logo.png" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <div>
                  <strong>{{ article.User.name }}</strong>
                  <small>@{{ article.User.id }}</small>
                  <br />
                  <p><strong>- タイトル -</strong></p>
                  <p>{{ article.title }}</p>
                  <p><strong>- 内容 -</strong></p>
                  <p>{{ article.content }}</p>
                </div>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item" aria-label="like">
                    <span class="icon is-small">
                      <fa :icon="['far', 'heart']" aria-hidden="true"></fa>
                    </span>
                  </a>
                </div>
                <div v-if="article.User.id === user.userid">
                  <a
                    class="level-item"
                    aria-label="edit"
                    @click="postedEdit(article.id)"
                  >
                    <span class="icon is-small">
                      <fa icon="edit" aria-hidden="true"></fa>
                    </span>
                  </a>
                </div>
                <div class="level-right">
                  <small> 更新日</small>
                  <time datetime="article.updatedAt">
                    {{ article.updatedAt }}
                  </time>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>

  <div v-if="!user">
    <div class="has-text-centered">
      <p class="has-text-info">※ログインすると投稿できるようになります※</p>
    </div>
    <div v-for="article in allArticle" :key="article.id">
      <div class="content columns is-centered">
        <div
          class="box m-5 has-background-success-light column is-6 is-offset-6"
        >
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img alt="Vue logo" src="@/assets/logo.png" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <div>
                  <strong>{{ article.User.name }}</strong>
                  <small>@{{ article.User.id }}</small>
                  <br />
                  <p>[TITLE]{{ article.title }}</p>
                  <p>[CONTENT]{{ article.content }}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'AppAllArticles',
  setup() {
    const store = useStore()
    const router = useRouter()

    onMounted(() => {
      store.dispatch('showArticles')
    })

    return {
      allArticle: computed(() => store.state.auth['allArticle']),
      user: computed(() => store.getters['authenticated']),
      postedEdit: (articleId) => {
        store.commit('SET_ORIGINAL_ARTICLE', { articleId })
        router.push({
          name: 'edit-screen',
          params: { id: articleId },
        })
      },
    }
  },
}
</script>

<style></style>
