<template>
  <div class="signup">
    <div class="is-size-2 has-text-centered">新規登録</div>
    <div class="content">
      <div class="box m-5 has-background-success-light">
        <div class="columns is-centered">
          <img alt="Vue logo" src="@/assets/logo.png" />
        </div>
        <app-sign-up />
      </div>

      <div class="columns is-centered">
        <router-link :to="{ name: 'signIn' }"> 登録済の方はこちら </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AppSignUp from '@/components/AppSignUp'

export default {
  name: 'SignUp',
  components: {
    AppSignUp,
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
