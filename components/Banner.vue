<template>
  <section
    class="banner"
    style="background-image: url(public/img/banners/banner-nosotros.jpg)"
  >
    <div class="container">
      <div class="grid-banner-contacto wow fadeIn" data-wow-delay="0.5s">
        <h1>{{ title }}</h1>
        <slot></slot>
      </div>
    </div>
  </section>
</template>
<script>
export default {
    props:{
        title: String,
    }   
}
</script>