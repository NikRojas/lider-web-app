<template>
  <header :class="$route.name == 'projects-slug___es' || $route.name == 'projects-slug___en' ? 'header2' : ''" id="header">
    <div class="container">
      <div class="grid-menu">
        <div class="left wow fadeInLeft">
          <div class="logo">
            <nuxt-link :to="localePath('index')">
              <img
                :data-src="require('~/assets/img/logo-color.png')"
                alt=""
                class="logo1 lazyload"
                style="display: none"
              />
              <img
                :data-src="require('~/assets/img/logo.png')"
                alt=""
                class="logo2 lazyload"
              />
            </nuxt-link>
          </div>
          <div class="menu">
            <a id="abrir-side" @click.prevent="openMenu"
              ><i class="flaticon-menu"></i
            ></a>
          </div>
        </div>
        <div class="nav wow fadeIn" data-wow-delay="0.2s">
          <a href="" class="btn-circle"><i class="flaticon-whatsapp-1"></i></a>
          <a href="" class="btn-circle"><i class="flaticon-telephone"></i></a>
          <a href="" class="btn-idioma"
            >ES
            <img
              class="lazyload"
              :data-src="require('~/assets/img/es.png')"
              alt="" />
            <i class="flaticon-download"></i
          ></a>
        </div>
      </div>
    </div>

    <!--<div style="background: green; color: white">
      <nuxt-link
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        >{{ locale.name }}</nuxt-link
      >

      {{ $t("bienvenido") }}
    </div>-->
  </header>
</template>

<script>
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
    menu() {
      return this.$store.getters.getMenu;
    },
  },
  data() {
    return {};
  },
  methods: {
    openMenu() {
      this.$store.dispatch("setMenuOpen");
    },
  },

  

};
</script>
