<template>
  <div class="signin">
    <div class="is-size-2 has-text-centered">ログイン</div>
    <div class="content">
      <div class="box m-5 has-background-success-light">
        <div class="columns is-centered">
          <img alt="Vue logo" src="@/assets/logo.png" />
        </div>
        <app-sign-in />
      </div>

      <div class="columns is-centered">
        <router-link :to="{ name: 'signUp' }">
          新規登録の方はこちら
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AppSignIn from '@/components/AppSignIn'

export default {
  name: 'SignIn',
  components: {
    AppSignIn,
  },
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
