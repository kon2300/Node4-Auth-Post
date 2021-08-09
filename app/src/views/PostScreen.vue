<template>
  <div class="post-screen">
    <div class="is-size-2 has-text-centered">投稿内容を入力してください</div>
    <div class="content">
      <div class="columns is-centered">
        <div
          class="column box m-6 has-background-success-light has-text-centered"
        >
          <app-post-form />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppPostForm from '@/components/AppPostForm'

export default {
  name: 'PostScreen',
  components: {
    AppPostForm,
  },
  setup() {
    const store = useStore()
    return {
      user: computed(() => store.state.auth['user'].username),
    }
  },
}
</script>

<style></style>
