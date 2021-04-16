<template>
  <header
    :class="
      $route.name == 'project___es' ||
      $route.name == 'project___en' ||
      $route.name == 'quotation___en' ||
      $route.name == 'quotation___es'
        ? 'header2'
        : ''
    "
    id="header"
  >
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
          <Dropdown
            :right="true"
            classWrapper="dropdown-width"
            v-if="
              menu.information &&
              menu.information.whatsapp_numbers &&
              menu.information.whatsapp_numbers.length
            "
          >
            <div slot="active-text" class="btn-circle">
              <i class="flaticon-whatsapp-1"></i>
            </div>
            <div slot="dropdown-content">
              <a
                class="dropdown-item"
                target="_blank"
                @click.prevent="shareWhatsapp(el.number)"
                v-for="(el, i) in menu.information.whatsapp_formatted"
                :key="'w' + i"
                >{{ el.department }}: {{ el.number_format }}</a
              >
            </div>
          </Dropdown>
          <Dropdown
            :right="true"
            classWrapper="dropdown-width"
            v-if="
              menu.information &&
              menu.information.phone_numbers &&
              menu.information.phone_numbers.length
            "
          >
            <div slot="active-text" class="btn-circle">
              <i class="flaticon-telephone"></i>
            </div>
            <div slot="dropdown-content">
              <a
                class="dropdown-item"
                :href="'tel:' + el.number"
                v-for="(el, i) in menu.information.phone_numbers_formatted"
                :key="'t' + i"
                >{{ el.department }}: {{ el.number }}</a
              >
            </div>
          </Dropdown>
          <Dropdown :right="true" classWrapper="dropdown-language">
            <div slot="active-text" class="btn-idioma">
              {{ $i18n.locale.toUpperCase() }}
              <img
                :key="$i18n.locale"
                class="lazyload"
                :data-src="require('~/assets/img/' + $i18n.locale + '.png')"
                alt=""
              />
              <i class="flaticon-download"></i>
            </div>
            <div slot="dropdown-content">
              <template v-for="locale in availableLocales">
                <template
                  v-if="
                    $route.name != 'blog-category-category-post___es' &&
                    $route.name != 'blog-category-category-post___en' &&
                    $route.name != 'blog-category-category___es' &&
                    $route.name != 'blog-category-category___en'
                  "
                >
                  <nuxt-link
                    class="dropdown-item"
                    v-if="locale.code != $i18n.locale"
                    :key="locale.code"
                    :to="switchLocalePath(locale.code)"
                  >
                    {{ locale.name }}
                    <img
                      class="lazyload dropdown-item__img"
                      height="12"
                      :data-src="
                        require('~/assets/img/' + locale.code + '.png')
                      "
                      alt=""
                  /></nuxt-link>
                </template>
                <template v-else>
<template
                  v-if="
                    $route.name == 'blog-category-category___es' ||
                    $route.name == 'blog-category-category___en'
                  "
                >
                  <nuxt-link
                    class="dropdown-item"
                    v-if="locale.code != $i18n.locale"
                    :key="locale.code"
                    :to="
                      localePath(
                        {
                          name: 'blog-category-category',
                          params: {
                            category:
                              currentPage.data.category['slug_' + locale.code],
                          },
                        },
                        locale.code
                      )
                    "
                  >
                    {{ locale.name }}
                    <img
                      class="lazyload dropdown-item__img"
                      height="12"
                      :data-src="
                        require('~/assets/img/' + locale.code + '.png')
                      "
                      alt=""
                  /></nuxt-link>
                </template>
                <template
                  v-else
                >
                  <nuxt-link
                    class="dropdown-item"
                    v-if="locale.code != $i18n.locale && currentPage.data.post"
                    :key="locale.code"
                    :to="
                      localePath(
                        {
                          name: 'blog-category-category-post',
                          params: {
                            category:
                              currentPage.data.category['slug_' + locale.code],
                            post: currentPage.data.post['slug_' + locale.code],
                          },
                        },
                        locale.code
                      )
                    "
                  >
                    {{ locale.name }}
                    <img
                      class="lazyload dropdown-item__img"
                      height="12"
                      :data-src="
                        require('~/assets/img/' + locale.code + '.png')
                      "
                      alt=""
                  /></nuxt-link>
                </template>
                </template>
                <!--<template
                  v-if="
                    $route.name == 'blog-category-category___es' ||
                    $route.name == 'blog-category-category___en'
                  "
                >
                  <nuxt-link
                    class="dropdown-item"
                    v-if="locale.code != $i18n.locale"
                    :key="locale.code"
                    :to="
                      localePath(
                        {
                          name: 'blog-category-category',
                          params: {
                            category:
                              currentPage.data.category['slug_' + locale.code],
                          },
                        },
                        locale.code
                      )
                    "
                  >
                    {{ locale.name }}
                    <img
                      class="lazyload dropdown-item__img"
                      height="12"
                      :data-src="
                        require('~/assets/img/' + locale.code + '.png')
                      "
                      alt=""
                  /></nuxt-link>
                </template>
                <template
                  v-if="
                    $route.name == 'blog-category-category-post___es' ||
                    $route.name == 'blog-category-category-post___en'
                  "
                >
                  <nuxt-link
                    class="dropdown-item"
                    v-if="locale.code != $i18n.locale"
                    :key="locale.code"
                    :to="
                      localePath(
                        {
                          name: 'blog-category-category-post',
                          params: {
                            category:
                              currentPage.data.category['slug_' + locale.code],
                            post: currentPage.data.post['slug_' + locale.code],
                          },
                        },
                        locale.code
                      )
                    "
                  >
                    {{ locale.name }}
                    <img
                      class="lazyload dropdown-item__img"
                      height="12"
                      :data-src="
                        require('~/assets/img/' + locale.code + '.png')
                      "
                      alt=""
                  /></nuxt-link>
                </template>-->
              </template>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Dropdown from "../Dropdown";
export default {
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
    menu() {
      return this.$store.getters.getMenu;
    },
    currentPage() {
      return this.$store.getters.getCurrentPage;
    },
  },
  data() {
    return {};
  },
  components: {
    Dropdown,
  },
  methods: {
    openMenu() {
      this.$store.dispatch("setMenuOpen");
    },
    shareWhatsapp(phone) {
      let msg = "¡Hola!";
      window.open(
        "https://api.whatsapp.com/send?phone=51" +
          phone +
          "&text=" +
          encodeURIComponent(msg),
        "_blank"
      );
    },
  },
};
</script>
