<template>
  <div class="chat__card__wrapper chat__card__gallery__wrapper">
    <div
      class="chat__carousel__gallery swiper-container"
      v-swiper:swiperCarousel="swiperOptionCarousel"
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(el, i) in array" :key="el.src + i">
          <img :src="el.src" :alt="el.caption ? el.caption : ''" @click="index = i" />
        </div>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"><</div>
      <div class="swiper-button-next" slot="button-next">></div>
    </div>
    <Tinybox v-model="index" :images="array" />
  </div>
</template>
<style lang="scss">
.chat__card__gallery__wrapper{
  .tinybox__thumbs__item{
    opacity: .3 ;
    &.tinybox__thumbs__item--active{
      opacity: 1;
    }
  }
}
.chat__carousel__gallery{
.swiper-container {
    width: 100%;
    height: 100%;
    padding-bottom: 35px !important;
  }
  .swiper-button-prev {
    left: 0;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
  .swiper-button-next {
    right: 0px;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .swiper-button-next {
    right: 0 !important;
  }
  .swiper-button-next:focus,
  .swiper-button-prev:focus {
    outline: 0 !important;
  }
  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 35px !important;
  }
  .swiper-button-prev {
    left: 0 !important;
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: #ffffff;
    font-size: 20px;
    top: 23% !important;
    background: rgba(0, 84, 148, 0.75);
    padding: 15px 12px;

    position: absolute;
    top: 49%;
    width: 42px;
    height: 50px;
    margin-top: -34px;
    z-index: 10;
    cursor: pointer;
    background-size: 27px 44px;
    background-position: 50%;
    background-repeat: no-repeat;
  }
img {
  width: 100%;
  height: auto;
  cursor: pointer;
}
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
        //slidesPerView: 1,
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