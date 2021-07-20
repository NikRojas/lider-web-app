<template>
  <div
    class="chat__carousel-button swiper-container"
    v-swiper:swiperCarousel="swiperOptionCarouselButtons"
    v-if="!triggered && !hide"
  >
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(el, i) in array" :key="'button' + i">
        <button
          class="chat__link chat__link--button shadow"
          @click.prevent="click(el.text)"
        >
          <span class="chat__link__text">{{ el.text }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.chat__carousel-button {
  &.swiper-container {
    width: 100%;
    height: 100%;
    padding-bottom: 35px !important;
  }

  .chat__link--button {
    display: inline !important;
  }

  .swiper-slide {
    width: auto !important;
  }
}
</style>
<script>
export default {
  props: {
    array: Array,
    triggered: {
      default: false,
    },
  },
  methods: {
    click(text) {
      this.hide = true;
      this.$emit("click", text, true);
    },
  },
  data() {
    return {
      hide: false,
      swiperOptionCarouselButtons: {
        slidesPerView: "auto",
        spaceBetween: 10,
      },
    };
  },
};
</script>