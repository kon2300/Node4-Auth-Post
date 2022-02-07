<template>
  <div class="everybodys-post">
    <div class="is-size-2 has-text-centered">みんなの投稿</div>
    <app-all-articles />
  </div>
</template>

<script>
import AppAllArticles from '@/components/AppAllArticles'
export default {
  name: 'EverybodysPosts',
  components: {
    AppAllArticles,
  },
  setup() {},
}
</script>

<style></style>
