<template>
  <section
    class="banner lazyload"
    :class="classes"
    :data-bg="
        banner
          ? storageUrl + '/img/content/' + banner
          : ''
      "
  >
    <div class="container">
      <div class="grid-banner-contacto wow fadeIn" data-wow-delay="0.5s">
        <h1>{{ title }}</h1>
        <slot name="title"></slot>
      </div>
      <slot name="default"></slot>
    </div>
  </section>
</template>
<script>
export default {
    props:{
      classes: String,
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