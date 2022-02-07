<template>
  <the-header />

  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <the-footer />
</template>
<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter.vue'
export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },
  setup() {},
}
</script>
<style>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active,
.route-leave-active {
  transition: all 0.6s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>
