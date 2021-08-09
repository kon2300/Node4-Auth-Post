<template>
  <div class="top">
    <div class="columns is-centered">
      <div class="box m-6 has-background-success-light has-text-centered">
        <router-link :to="{ name: 'signUp' }">
          <img alt="Vue logo" src="@/assets/logo.png" />
          <p>ご登録はこちらから</p>
        </router-link>
      </div>

      <div class="box m-6 has-background-success-light has-text-centered">
        <router-link :to="{ name: 'signIn' }">
          <img alt="Vue logo" src="@/assets/logo.png" />
          <p>ログインはこちらから</p>
        </router-link>
      </div>
    </div>
    <div class="has-text-centered">
      <router-link :to="{ name: 'everybodys-posts' }"
        >ゲストモードで進む</router-link
      >
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Top',
  setup() {
    const store = useStore()
    const router = useRouter()
    onMounted(() => {
      if (store.getters['authenticated']) {
        const userid = store.state.auth['user'].userid
        router.push({ name: 'my-home', params: { id: userid } })
      }
    })
  },
}
</script>

<style></style>
