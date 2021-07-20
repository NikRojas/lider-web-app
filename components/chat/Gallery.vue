<template>
  <!--<div class="chat__card__wrapper">
  <Tinybox
      v-model="index"
      :images="array"
  />
  <img
   v-for="(img, i) in array"
   :src="img.src"
   :alt="img.caption"
   height="50"
   width="auto"
   @click="index = i"
   :key="img.src"
   >
  </div>-->

  <div class="chat__card__wrapper">
    <swiper class="chat__carousel swiper-container" ref="mySwiper" :options="swiperOptionCarousel">
      <swiper-slide v-for="(el,i) in array" :key="el.src">
        <!--<div class="chat__carousel__image" :style="{ backgroundImage: `url(${el.image})` }"></div>-->
        <!--<div class="chat__image" :style="{ backgroundImage: `url(${el.src})` }"></div>-->
        <img :src="el.src" :alt="el.caption" @click="index = i" />
      </swiper-slide>
      <!--<div class="swiper-pagination" slot="pagination"></div>-->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <Tinybox v-model="index" :images="array" />
  </div>
</template>
<style lang="scss" scoped>
img {
  width: 100%;
  height: auto;
  cursor: pointer;
}
</style>
<script>
import Tinybox from "vue-tinybox";
export default {
  props: {
    array: Array
  },
  components: {
    Tinybox
  },
  data() {
    return {
      index: null,
      swiperOptionCarousel: {
        //loop: true,
        slidesPerView: 1,
        //spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        /*pagination: {
            el: '.swiper-pagination'
          },*/
        //slidesPerView: 2,
        autoWidth: true,
        breakpoints: {
          700: {
            slidesPerView: 1
            //spaceBetween: 30,
          },
          1440: {
            slidesPerView: 2
            //spaceBetween: 30,
          }
        }
      }
    };
  }
};
</script>