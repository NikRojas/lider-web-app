<template>
    <main class="blog--post"></main>
</template>
<script>
export default {
    nuxtI18n: {
    paths: {
      en: "/blog/category/:category/:post",
      es: "/blog/categoria/:category/:post",
    },
  },
}
</script>