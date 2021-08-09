<template>
  <header v-if="user" class="header hero is-primary mb-5">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand"></div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item is-size-2">
            <router-link :to="{ name: 'top' }" exact-active-class="no-active"
              >Practice</router-link
            >
          </a>
        </div>

        <div class="navbar-end">
          <a class="navbar-item">
            <router-link :to="{ name: 'everybodys-posts' }"
              >みんなの投稿</router-link
            >
          </a>
          <a class="navbar-item">
            <router-link
              :to="{ name: 'post-screen', params: { id: user.userid } }"
              >新規投稿</router-link
            >
          </a>
          <a class="navbar-item">
            <router-link :to="{ name: 'my-home', params: { id: user.userid } }"
              >Home</router-link
            >
          </a>

          <div class="navbar-item has-dropdown is-hoverable has-text-dark">
            <a class="navbar-link"> {{ user.username }} </a>

            <div class="navbar-dropdown is-right">
              <a class="navbar-item">
                <base-button :btn-text="'LogOut'" @click="logout" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <header v-if="!user" class="header hero is-primary mb-5">
    <div class="hero-body has-text-centered p-4">
      <div class="title is-size-1">
        <router-link :to="{ name: 'top' }">Practice</router-link>
      </div>
      <p class="subtitle">~EXPRESS*VUE*MYSQL~</p>
    </div>
  </header>
</template>

<script>
import BaseButton from '@/components/baseItem/BaseButton'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'TheHeader',
  components: {
    BaseButton,
  },
  setup() {
    const store = useStore()
    return {
      user: computed(() => store.getters['authenticated']),
      logout: () => store.dispatch('logout'),
    }
  },
}
</script>

<style></style>
