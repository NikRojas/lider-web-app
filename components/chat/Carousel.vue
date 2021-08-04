<template>
  <div
    class="chat__carousel swiper-container"
    id="carouselContainer__chat"
    v-swiper:swiperCarousel="swiperOptionCarousel"
  >
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(el, i) in array" :key="el.image + i">
        <div
          class="chat__carousel__image"
          :style="{ backgroundImage: `url(${el.image})` }"
        ></div>
        <div class="chat__carousel__footer shadow">
          <div class="chat__carousel__title font-weight-bold">
            {{ el.title }}
          </div>
          <div class="chat__carousel__desc" v-if="el.description" v-html="el.description"></div>
          <template v-if="!triggered && !hide">
            <div class="chat__carousel__button" v-if="el.button">
              <button class="chat__link" id="chat__carouselButton" @click.prevent="click(el.button)">
                <span class="chat__link__text">{{ el.button }}</span>
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev shadow" id="buttonPrev_carousel" slot="button-prev"><</div>
    <div class="swiper-button-next shadow" id="buttonNext_carousel" slot="button-next">></div>
  </div>
</template>
<style lang="scss" scoped>
.chat__carousel {
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
    //color: #ffffff;
    color: #F15F23;
    font-size: 20px;
    //top: 23% !important;
    top: 50% !important;
    //background: rgba(0, 84, 148, 0.75);
    background: white;
    padding: 15px 12px;
    position: absolute;
    top: 49%;
    /*width: 42px;
    height: 50px;*/
    width: 32px;
    height: 64px;
    margin-top: -34px;
    z-index: 10;
    cursor: pointer;
    background-size: 27px 44px;
    background-position: 50%;
    background-repeat: no-repeat;
    display: grid;
    align-items: center;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
    padding-bottom: 35px !important;
  }
  div#carouselContainer__chat{
    overflow: inherit !important;
  }
  .swiper-pagination{
    opacity: 0 !important;
  }
  .chat__carousel__footer {
    padding: 15px 15px 15px 15px;
    text-align: center;
    background: #E8F4FF;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .chat__carousel__title {
    margin-bottom: 5px;
  }
  .chat__carousel__button {
    .chat__link {
      margin-bottom: 0;
    }
  }
  .chat__carousel__desc {
    font-size: 13px;
    margin-bottom: 8px;
  }
  .chat__carousel__image {
    border-radius: 10px 10px 0 0;
    /*height: 125px;*/
    height: 244px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}

/* ESTILOS JOSEPH */
button#chat__carouselButton {
    background: #F15F23;
    color: white;
    font-size: 12px;
    border: 1px solid #F15F23 !important;
    border-radius: 5px;
    width: 100%;
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
      swiperOptionCarousel: {
        //loop: true,
        slidesPerView: 1.5,
        spaceBetween: 20,
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        //autoWidth: true,
      },
    };
  },
};
</script>