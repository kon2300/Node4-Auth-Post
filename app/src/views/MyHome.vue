<template>
  <div class="myhome">
    <div class="is-size-2 has-text-centered">MyHome</div>

    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img alt="Vue logo" src="@/assets/logo.png" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ user.username }}</p>
          <p class="subtitle is-6">@{{ user.userid }}</p>
        </div>
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
        iaculis mauris.
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MyHome',
  setup() {
    const store = useStore()
    return {
      user: computed(() => store.state.auth['user']),
    }
  },
}
</script>

<style></style>
