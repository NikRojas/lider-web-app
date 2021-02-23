<template>
   <section class="page-404 lazyload" 
   :data-bg="require('~/assets/img/404.jpg')"
   >
    <div class="contant-404">
        <h1><b>{{ $t('Algo salió mal')}}.</b></h1>
        <span>404</span>
        <h4>{{ $t('La página que estabas buscando no existe')}}.</h4>
        <h4>{{ $t('Volver a la página de inicio')}}</h4>
        <br>
        <nuxt-link :to="localePath('index')" class="btn btn2">{{ $t('Volver al inicio')}}</nuxt-link>
    </div>
</section>
</template>