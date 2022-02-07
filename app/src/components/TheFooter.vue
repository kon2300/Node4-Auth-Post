<template>
  <footer class="footer">
    <div class="container">
      <div class="content is-size-3 has-text-right">
        <router-link :to="{ name: 'top' }">Practice</router-link>
        <p class="subtitle">©2021 kon</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
}
</script>

<style></style>
