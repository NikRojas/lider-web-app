<template>
  <div class="nav-bar" :class="{ active: menuOpen }">
    <div class="sombra" @click.prevent="closeMenu"></div>
    <div class="content">
      <div class="head">
        <nuxt-link :to="localePath('index')" @click.native="closeMenu">
          <img
            :data-src="require('~/assets/img/logo.png')"
            class="lazyload"
            alt=""
          />
        </nuxt-link>
        <a href="#" @click.prevent="closeMenu"
          ><i class="flaticon-cancelar"></i
        ></a>
      </div>
      <div class="link-menu">
        <ul>
          <li>
            <nuxt-link :to="localePath('about-us')" @click.native="closeMenu">{{
              $t("Nosotros")
            }}</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('index')" @click.native="closeMenu">{{
              $t("Proyectos")
            }}</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('testimonials')" @click.native="closeMenu">{{
              $t("Testimoniales")
            }}</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('cami')" @click.native="closeMenu"
              >{{ $t("Comunidad Amiga") }} - CAMI</nuxt-link
            >
          </li>
          <li>
            <nuxt-link :to="localePath('blog')" @click.native="closeMenu">{{ $t("Blog") }}</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="localePath('contact')" @click.native="closeMenu">{{
              $t("Contacto")
            }}</nuxt-link>
          </li>
        </ul>
        <Dropdown classWrapper="dropdown-language dropdown-border">
            <div slot="active-text" class="btn-idioma">
              {{ $i18n.locale.toUpperCase() }} <img
                :key="$i18n.locale"
                class="lazyload"
                :data-src="require('~/assets/img/' + $i18n.locale + '.png')"
                alt=""
              />
              <i class="flaticon-download"></i>
            </div>
            <div slot="dropdown-content">
              <template v-for="locale in availableLocales">
                  <nuxt-link
                    class="dropdown-item"
                    v-if="locale.code != $i18n.locale"
                    :key="locale.code"
                    :to="switchLocalePath(locale.code)"
                    @click.native="closeMenu"
                  >
                    {{ locale.name }}
                    <img
                      class="lazyload dropdown-item__img"
                      height="12"
                      :data-src="
                        require('~/assets/img/' + locale.code + '.png')
                      "
                      alt=""
                  ></nuxt-link>
                </template>
            </div>
          </Dropdown>
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
import Dropdown from "../Dropdown";
export default {
  computed: {
    menu() {
      return this.$store.getters.getMenu;
    },
    menuOpen() {
      return this.$store.getters.getMenuOpen;
    },
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
  components:{
    Dropdown
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