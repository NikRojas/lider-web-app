<template>
  <main class="testimonials">
    <section
      class="banner"
      style="background-image: url(public/img/banners/banner-nosotros.jpg)"
    >
      <div class="container">
        <div class="text-center">
          <h1>Testimoniales</h1>
        </div>
      </div>
    </section>

    <section class="section section-testimoniales">
      <div class="container">
        <div class="text-center wow fadeInUp">
          <h2><b>Conoce lo que dicen nuestros vecinos Lider</b></h2>
          <p>
            Líder Grupo Constructor, cuenta con más de 18 años de experiencia
            haciendo felices a muchas familias.
          </p>
          <br />
        </div>
        <div
          class="grid-3col wow fadeInUp"
          v-if="page.data.testimonials.data.length"
        >
          <div
            class="card"
            :class="el.type_video ? 'card-testimonio1' : 'card-testimonio2'"
            v-for="el in page.data.testimonials.data"
            :key="el.i"
          >
            <div class="card-video" v-if="el.type_video">
              <img
                class="lazyload"
                :data-src="storageUrl + '/img/testimonials/' + el.image"
                :alt="el['title_' + $i18n.locale] + ' ' + el.project"
              />
              <a
                class="fancybox"
                data-fancybox="Testimonios"
                :href="el.url_video"
                ><i class="flaticon-boton-de-play"></i
              ></a>
            </div>
            <div v-else class="content">
              <img
                :data-src="require('~/assets/img/icon-testimonial.png')"
                class="lazyload"
                :alt="'Quote ' + el['title_' + $i18n.locale] + ' ' + el.project"
              />
              <div v-html="el['description_' + $i18n.locale]"></div>
            </div>
            <h5>
              <b>- {{ el["title_" + $i18n.locale] }}</b>
            </h5>
            <strong>{{ el.project }}</strong>
          </div>

          <template v-if="loadingMore">
            <div class="card" v-for="(el, i) in 3" :key="'test' + i">
              <PuSkeleton height="200px"></PuSkeleton>
            </div>
          </template>
        </div>

        <div
          class="text-center"
          v-if="page.data.testimonials.last_page != pageActive"
        >
          <button
            :class="loadingMore ? 'btn--opacity' : ''"
            type="button"
            @click="paginateTestimonials"
            :disabled="loadingMore"
            class="btn"
          >
            {{ loadingMore ? $t("Cargando")+"..." : $t("Más testimonios") }}
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
if (process.client) {
  require("/static/js/jq.fancybox.min.js");
}
import "/static/css/jq.fancybox.min.css";
export default {
  /*head: {
    link: [{ rel: "stylesheet", href: "/css/jq.fancybox.min.css" }],
    script: [{ src: "/js/jq.min.js" }, { src: "/js/jq.fancybox.min.js" }],
  },*/
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/testimonials", {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },
  nuxtI18n: {
    paths: {
      en: "/testimonials",
      es: "/testimonios",
    },
  },
  data() {
    return {
      page: {},
      loadingMore: false,
      pageActive: 1,
      storageUrl: process.env.STORAGE_URL,
    };
  },
  methods: {
    paginateTestimonials() {
      this.loadingMore = true;
      this.$axios
        .$get("/api/paginate/testimonials", {
          params: {
            locale: this.$i18n.locale,
            page: this.pageActive + 1,
          },
        })
        .then((response) => {
          if (response.data.length) {
            this.pageActive += 1;
            this.page.data.testimonials.data.push(...response.data);
          }

          this.loadingMore = false;
        });
    },
  },
  mounted() {
    $(document).ready(function () {
      $(".fancybox").fancybox();
      });
  },
};
</script>