<template>
  <div class="nav-bar" :class="{ active: menuOpen }">
    <div class="sombra"></div>
    <div class="content">
      <div class="head">
        <img
          :data-src="require('~/assets/img/logo.png')"
          class="lazyload"
          alt=""
        />
        <a href="#" @click.prevent="closeMenu"
          ><i class="flaticon-cancelar"></i
        ></a>
      </div>
      <div class="link-menu">
        <ul>
          <li>
            <nuxt-link :to="localePath('about-us')" @click.native="closeMenu">{{
              $t("nosotros")
            }}</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('projects')" @click.native="closeMenu">{{
              $t("proyectos")
            }}</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('testimonials')" @click.native="closeMenu">{{
              $t("testimoniales")
            }}</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('cami')" @click.native="closeMenu"
              >{{ $t("comunidad amiga") }} - CAMI</nuxt-link
            >
          </li>
          <li>
            <nuxt-link :to="localePath('blog')" @click.native="closeMenu">{{ $t("blog") }}</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('contact')" @click.native="closeMenu">{{
              $t("contacto")
            }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="redes">
        <ul>
          <li
            v-for="(social, index) in menu.social_networks"
            :key="'sm' + index"
          >
            <a
              class="btn-circle"
              :href="social.url"
              target="_blank"
              rel="noopener"
            >
              <i
                :class="'flaticon-' + social.master_social_networks.icon"
                v-if="social.master_social_networks.icon"
              ></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    menu() {
      return this.$store.getters.getMenu;
    },
    menuOpen() {
      return this.$store.getters.getMenuOpen;
    },
  },
  methods: {
    closeMenu() {
      this.$store.dispatch("setMenuOpen");
    },
  },
  data() {
    return {};
  },
};
</script>