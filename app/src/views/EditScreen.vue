<template>
  <div class="edit-screen">
    <div class="is-size-2 has-text-centered">投稿内容の編集</div>
    <div class="content">
      <div class="columns is-centered">
        <div
          class="column box m-6 has-background-success-light has-text-centered"
        >
          <app-edit-form />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppEditForm from '@/components/AppEditForm'

export default {
  name: 'EditScreen',
  components: {
    AppEditForm,
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
