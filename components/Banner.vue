<template>
  <section
    class="banner lazyload"
    :data-bg="
        banner
          ? storageUrl + '/img/content/' + banner
          : ''
      "
  >
    <div class="container">
      <div class="grid-banner-contacto wow fadeIn" data-wow-delay="0.5s">
        <h1>{{ title }}</h1>
      </div>
      <slot></slot>
    </div>
  </section>
</template>
<script>
export default {
    props:{
        title: String,
        banner: String
    }   ,
    data(){
      return{
        storageUrl: process.env.STORAGE_URL,
      }
    }
}
</script>