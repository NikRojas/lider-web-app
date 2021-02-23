<template>
  <main class="cami">
    <Banner
      :banner="
        page.data.content[
          page.data.content.findIndex((x) => x.name === 'Banner')
        ].content_formatted.includes('image')
          ? page.data.content[
              page.data.content.findIndex((x) => x.name === 'Banner')
            ].content.find((x) => x.field === 'image').value
          : ''
      "
      :title="
        page.data.content[
          page.data.content.findIndex((x) => x.name === 'Banner')
        ].content_formatted.includes('title') &&
        page.data.content[
          page.data.content.findIndex((el) => el.name === 'Banner')
        ].content.find((x) => x.field === 'title')['value_' + $i18n.locale]
          ? page.data.content[
              page.data.content.findIndex((el) => el.name === 'Banner')
            ].content.find((x) => x.field === 'title')['value_' + $i18n.locale]
          : ''
      "
    >
    </Banner>

    <section class="section section-cami">
      <div class="container">
        <div class="grid-col">
          <div class="grid-s-12 grid-m-12 grid-l-6">
            <div class="content text-justify wow fadeInUp" data-wow-delay="1s">
              <img
                class="lazyload"
                v-if="page.data.cami && page.data.cami.logo"
                :data-src="storageUrl + '/img/cami/' + page.data.cami.logo"
                alt="Logo Cami"
              />
              <div class="">
                <h2
                  v-if="
                    page.data.cami && page.data.cami['title_' + $i18n.locale]
                  "
                >
                  <b>{{ page.data.cami["title_" + $i18n.locale] }}</b>
                </h2>
                <div
                  id="cami-description"
                  v-if="
                    page.data.cami &&
                    page.data.cami['description_' + $i18n.locale]
                  "
                  v-html="page.data.cami['description_' + $i18n.locale]"
                ></div>
                <div class="si-movil" style="display: none">
                  <button
                    @click="showCami"
                    class="btn w-100"
                    id="btn-show-cami"
                  >
                    {{ $t("Leer más") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="grid-s-12 grid-m-12 grid-l-6"
            v-if="
              page.data.cami &&
              page.data.cami.images_format &&
              page.data.cami.images_format.length
            "
          >
            <div class="grid-col-2">
              <div class="gal1 card-video wow fadeInUp" data-wow-delay="1.4s">
                <img
                  :data-src="
                    storageUrl + '/img/cami/' + page.data.cami.images_format[0]
                  "
                  class="lazyload"
                />
                <a
                  v-if="page.data.cami && page.data.cami.url_video"
                  class="fancybox"
                  data-fancybox="Cami"
                  :href="page.data.cami.url_video"
                  ><i class="flaticon-boton-de-play"></i
                ></a>
              </div>
              <div class="gal2">
                <template v-for="(el, i) in page.data.cami.images_format">
                  <div
                    class="wow fadeInUp"
                    :data-wow-delay="1.2 + i * 0.2 + 's'"
                    :key="i"
                    v-if="i != 0"
                  >
                    <img
                      :data-src="storageUrl + '/img/cami/' + el"
                      class="lazyload"
                    />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-tab">
      <div class="">
        <div class="container">
          <div class="title center wow fadeInUp">
            <h2
              v-if="
                page.data.cami &&
                page.data.cami['title_projects_' + $i18n.locale]
              "
            >
              {{ page.data.cami["title_projects_" + $i18n.locale] }}
            </h2>
          </div>
          <!-- Tab links -->
          <div
            class="tabs2 movil-col-2 margin-botton wow fadeInUp"
            v-if="page.data.cami_elements.length"
          >
            <a
              class="tablinks btn"
              :class="{ active: page.data.cami_elements[0].id == el.id }"
              :data-country="'s' + el.id"
              v-for="el in page.data.cami_elements"
              :key="'ca' + el.id"
            >
              {{ el["name_" + $i18n.locale] }}
            </a>
            <!--<a class="tablinks btn" data-country="s5"> Gestión Comunitaria </a>-->
          </div>
        </div>
        <div class="wrapper_tabcontent" v-if="page.data.cami_elements.length">
          <div
            :class="{ active: page.data.cami_elements[0].id == el.id }"
            :id="'s' + el.id"
            class="tabcontent"
            v-for="el in page.data.cami_elements"
            :key="'wa' + el.id"
          >
            <div class="section-cami-tab">
              <div class="grid-col">
                <div class="grid-s-12 grid-m-12 grid-l-5">
                  <div class="content wow fadeInLeft">
                    <h3>
                      <b>{{ el["name_" + $i18n.locale] }}</b>
                    </h3>
                    <div v-html="el['description_' + $i18n.locale]"></div>
                  </div>
                </div>
                <div class="grid-s-12 grid-m-12 grid-l-7 wow fadeInRight">
                  <h4 class="titulo-cami-carousel">
                    <b>{{ el["title_elements_" + $i18n.locale] }}</b>
                  </h4>
                  <div
                    class="carousel-sociocultural owl-carousel owl-theme"
                    v-if="el['elements_' + $i18n.locale + '_format']"
                  >
                    <div
                      class="item"
                      v-for="item in el['elements_' + $i18n.locale + '_format']"
                      :key="item.icon"
                    >
                      <div class="card-cultura">
                        <div class="content-cultura">
                          <img
                            class="cami__item__image lazyload"
                            :data-src="
                              storageUrl + '/img/cami-elements/' + item.file
                            "
                          />
                          <div
                            class="text"
                            v-html="item['description_' + $i18n.locale]"
                          ></div>
                        </div>
                        <div class="titulo">
                          <img
                            height="43"
                            class="cami__item__icon lazyload img--width-auto"
                            :data-src="
                              storageUrl + '/img/cami-elements/' + item.icon
                            "
                          />
                          <h5>
                            <b>{{ item["title_" + $i18n.locale] }}</b>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="grid-s-12 grid-m-12 grid-l-5">
                  <div class="img2 card-video wow fadeInLeft">
                    <img
                      class="lazyload"
                      :data-src="storageUrl + '/img/cami-elements/' + el.image"
                      :alt="el['name_' + $i18n.locale]"
                    />
                    <a
                      class="fancybox"
                      v-if="el.url_video"
                      data-fancybox="Cami"
                      :href="el.url_video"
                      ><i class="flaticon-boton-de-play"></i
                    ></a>
                  </div>
                </div>
                <div
                  class="grid-s-12 grid-m-12 grid-l-7"
                  v-if="el['description_video_' + $i18n.locale]"
                >
                  <div
                    class="content wow fadeInRight"
                    v-html="el['description_video_' + $i18n.locale]"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
if (process.client) {
  require("/static/js/jq.fancybox.min.js");
  require("owl.carousel");
}
import "/static/css/jq.fancybox.min.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.green.css";
import Banner from "../components/Banner";
export default {
  components: {
    Banner,
  },
  head() {
    return {
      htmlAttrs: {
        lang:
          this.$i18n.locale == "en"
            ? this.$i18n.locale + "_US"
            : this.$i18n.locale + "_PE",
      },
      title: this.page.data.page["title_" + this.$i18n.locale]
        ? this.page.data.page["title_" + this.$i18n.locale]
        : "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page.data.page["seo_description_" + this.$i18n.locale]
            ? this.page.data.page["seo_description_" + this.$i18n.locale]
            : "",
        },
        {
          itemprop: "name",
          content: this.page.data.page["title_" + this.$i18n.locale]
            ? this.page.data.page["title_" + this.$i18n.locale]
            : "",
        },
        {
          itemprop: "description",
          content: this.page.data.page["seo_description_" + this.$i18n.locale]
            ? this.page.data.page["seo_description_" + this.$i18n.locale]
            : "",
        },
        {
          itemprop: "image",
          content: this.page.data.page["seo_image"]
            ? process.env.STORAGE_URL +
              "/img/pages/" +
              this.page.data.page["seo_image"]
            : "",
        },
        {
          name: "keywords",
          content: this.page.data.page["seo_keywords_" + this.$i18n.locale]
            ? this.page.data.page["seo_keywords_" + this.$i18n.locale]
            : "",
        },
        { name: "og:url", content: process.env.BASE_URL + this.$route.path },
        { name: "og:type", content: "website" },
        {
          name: "og:title",
          content: this.page.data.page["title_" + this.$i18n.locale]
            ? this.page.data.page["title_" + this.$i18n.locale]
            : "",
        },
        {
          name: "og:description",
          content: this.page.data.page["seo_description_" + this.$i18n.locale]
            ? this.page.data.page["seo_description_" + this.$i18n.locale]
            : "",
        },
        {
          name: "og:image",
          content: this.page.data.page["seo_image"]
            ? process.env.STORAGE_URL +
              "/img/pages/" +
              this.page.data.page["seo_image"]
            : "",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: this.page.data.page["title_" + this.$i18n.locale]
            ? this.page.data.page["title_" + this.$i18n.locale]
            : "",
        },
        {
          name: "twitter:description",
          content: this.page.data.page["seo_description_" + this.$i18n.locale]
            ? this.page.data.page["seo_description_" + this.$i18n.locale]
            : "",
        },
        {
          name: "twitter:image",
          content: this.page.data.page["seo_image"]
            ? process.env.STORAGE_URL +
              "/img/pages/" +
              this.page.data.page["seo_image"]
            : "",
        },
      ],
    };
  },
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/cami", {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },
  data() {
    return {
      page: {
        cami: {},
      },
      storageUrl: process.env.STORAGE_URL,
    };
  },
  methods: {
    showCami() {
      $("#cami-description > .ql-align-justify").each(function (i, obj) {
        if (i > 0) {
          $(this).show();
        }
      });
      $("#btn-show-cami").hide();
    },
  },
  mounted() {
    var tabLinks = document.querySelectorAll(".tablinks");
    var tabContent = document.querySelectorAll(".tabcontent");

    tabLinks.forEach(function (el) {
      el.addEventListener("click", openTabs);
    });

    function openTabs(el) {
      var btnTarget = el.currentTarget;
      var country = btnTarget.dataset.country;

      tabContent.forEach(function (el) {
        el.classList.remove("active");
      });

      tabLinks.forEach(function (el) {
        el.classList.remove("active");
      });

      document.querySelector("#" + country).classList.add("active");
      btnTarget.classList.add("active");
    }
    $(window).resize(function () {
      if ($(window).width() <= 720) {
        $("#cami-description > .ql-align-justify").each(function (i, obj) {
          if (i > 0) {
            $(this).hide();
          }
        });
      } else {
        $("#cami-description > .ql-align-justify").each(function (i, obj) {
          if (i > 0) {
            $(this).show();
          }
        });
      }
    });
    $(document).ready(function () {
      $(".fancybox").fancybox();
      $(".carousel-sociocultural").owlCarousel({
        nav: true,
        autoplay: true,
        margin: 25,
        dots: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        pagination: true,
        paginationNumbers: true,
        rewindNav: true,
        scrollPerPage: true,
        singleItem: true,
        loop: true,
        responsive: {
          0: {
            items: 1.2,
          },
          600: {
            items: 2,
          },
          1025: {
            items: 2.5,
          },
        },
      });
    });
    if ($(window).width() <= 720) {
      $("#cami-description > .ql-align-justify").each(function (i, obj) {
        if (i > 0) {
          $(this).hide();
        }
      });
    }
  },
};
</script>