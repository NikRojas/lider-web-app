<template>
  <main class="about-us">
    <Banner :banner="page.data.content[
                  page.data.content.findIndex((x) => x.name === 'Banner')
                ].content_formatted.includes('image') ? 
                page.data.content[
                  page.data.content.findIndex((x) => x.name === 'Banner')
                ].content.find((x) => x.field === 'image').value : ''" :title="page.data.content[page.data.content.findIndex(x => x.name === 'Banner')].content_formatted.includes('title')
            && page.data.content[page.data.content.findIndex(el => el.name === 'Banner')].content.find(x => x.field === 'title')['value_'+$i18n.locale] ?
            page.data.content[page.data.content.findIndex(el => el.name === 'Banner')].content.find(x => x.field === 'title')['value_'+$i18n.locale]
            : ''">
    </Banner>
    <section class="top-section">
      <div class="container">
        <div class="grid-col">
          <div class="grid-s-12 grid-m-6 grid-l-6">
            <div class="box-n box-gris wow fadeInUp text-justify">
              <h2  v-if="page.data.first['1'] &&  page.data.first['1']['title_' + $i18n.locale]">
                <b>{{page.data.first['1']['title_' + $i18n.locale]}}</b>
              </h2>
              <div v-if="page.data.first['1'] &&  page.data.first['1']['description_' + $i18n.locale]"
              v-html="page.data.first['1'] &&  page.data.first['1']['description_' + $i18n.locale]"></div>
            </div>
          </div>
          <div class="grid-s-12 grid-m-6 grid-l-6">
            <div
              class="box-n box-video card-video wow fadeInUp text-justify"
              data-wow-delay="0.4s"
            >
              <img v-if="page.data.first['2'] && page.data.first['2']['image']"
              class="lazyload" :data-src="storageUrl+'/img/about/'+page.data.first['2']['image']"/>
              <a  v-if="page.data.first['2'] && page.data.first['2']['url_video']" class="fancybox"
                  data-fancybox
              :href="page.data.first['2']['url_video']"
                ><i class="flaticon-boton-de-play"></i
              ></a>
            </div>
          </div>
          <div class="grid-s-12 grid-m-6 grid-l-4">
            <div
              class="box-n box-mision color-white wow fadeInUp text-justify"
              data-wow-delay="0.8s"
            >
              <h2>{{ $t('Misión')}}</h2>
              <div v-if="page.data.first['3'] &&  page.data.first['3']['description_' + $i18n.locale]"
              v-html="page.data.first['3'] &&  page.data.first['3']['description_' + $i18n.locale]"></div>
            </div>
          </div>
          <div class="grid-s-12 grid-m-6 grid-l-4">
            <div class="box-n box-img wow fadeInUp text-justify" data-wow-delay="1.2s">
              <img v-if="page.data.first['4'] &&  page.data.first['4']['image']" class="lazyload" 
              :data-src="storageUrl+'/img/about/'+page.data.first['4']['image']" />
            </div>
          </div>
          <div class="grid-s-12 grid-m-6 grid-l-4">
            <div
              class="box-n box-vision color-white wow fadeInUp text-justify"
              data-wow-delay="1.6s"
            >
              <h2>{{ $t('Visión')}}</h2>
             <div v-if="page.data.first['5'] &&  page.data.first['5']['description_' + $i18n.locale]"
              v-html="page.data.first['5'] &&  page.data.first['5']['description_' + $i18n.locale]"></div>
            </div>
          </div>
          <div class="grid-s-12 grid-m-6 grid-l-5">
            <div class="box-n box-img wow fadeInUp text-justify" data-wow-delay="2s">
              <img v-if="page.data.first['6'] &&  page.data.first['6']['image']" class="lazyload" 
              :data-src="storageUrl+'/img/about/'+page.data.first['6']['image']" />
            </div>
          </div>
          <div class="grid-s-12 grid-m-6 grid-l-4">
            <div
              class="box-n box-mision color-white wow fadeInUp text-justify"
              data-wow-delay="2.4s"
            >
              <h2 v-if="page.data.first['7'] &&  page.data.first['7']['quantity']"><b>{{page.data.first['7']['quantity']}}</b></h2>
              <div v-if="page.data.first['7'] &&  page.data.first['7']['description_' + $i18n.locale]"
              v-html="page.data.first['7'] &&  page.data.first['7']['description_' + $i18n.locale]"></div>
              <div class="star">
                <span></span><span></span><span></span><span></span
                ><span></span>
              </div>
            </div>
          </div>
          <div class="grid-s-12 grid-m-6 grid-l-3">
            <div class="box-n box-gris wow fadeInUp text-justify" data-wow-delay="2.8s">
              <img v-if="page.data.first['8'] &&  page.data.first['8']['icon']" class="lazyload" 
              :data-src="storageUrl+'/img/about/'+page.data.first['8']['icon']" />
              <h2 v-if="page.data.first['8'] &&  page.data.first['8']['quantity']"><b>{{page.data.first['8']['quantity']}}</b></h2>
              <div v-if="page.data.first['8'] &&  page.data.first['8']['description_' + $i18n.locale]"
              v-html="page.data.first['8'] &&  page.data.first['8']['description_' + $i18n.locale]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="top-section" v-if="page.data.second">
      <div class="container">
        <div class="text-content text-center wow fadeInUp">
          <div
            class="title center movil-left"
            v-if="page.data.second['title_' + $i18n.locale]"
          >
            <h2>{{ page.data.second["title_" + $i18n.locale] }}</h2>
          </div>
          <div
            class="movil-text-justify"
            v-if="page.data.second['description_' + $i18n.locale]"
            v-html="page.data.second['description_' + $i18n.locale]"
          ></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="title center wow fadeInUp movil-left" v-if="page.data.third['1']">
          <h2>{{ page.data.third["1"]["title_" + $i18n.locale] }}</h2>
        </div>
        <div
          class="proyectos-entregados owl-carousel owl-theme nav-absolute2 wow fadeInUp"
          v-if="page.data.third['2'] && page.data.third['2'].length"
        >
          <div
            class="item"
            v-for="(el, i) in page.data.third['2']"
            :key="'pe' + i"
          >
            <div class="box-proyecto text-justify" v-for="(el2, j) in el" :key="'item'+j">
              <img
                class="lazyload"
                :data-src="storageUrl + '/img/about/' + el2.image"
                :alt="el2.name + ' ' + i"
              />
              <h4>
                <b>{{ el2.name }}</b>
              </h4>
              <div
                v-if="el2['description_' + $i18n.locale]"
                v-html="el2['description_' + $i18n.locale]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="section bg-nosotros-1 lazyload"
      :data-bg="
        page.data.fourth['1'] && page.data.fourth['1']['image']
          ? storageUrl + '/img/about/' + page.data.fourth['1']['image']
          : ''
      "
    >
      <div class="container">
        <div class="grid-col">
          <div class="grid-s-12 grid-m-12 grid-l-6">
            <div class="color-white text-justify li-check wow fadeInLeft">
              <h2
                v-if="
                  page.data.fourth['1'] &&
                  page.data.fourth['1']['title_' + $i18n.locale]
                "
              >
                {{ page.data.fourth["1"]["title_" + $i18n.locale] }}
              </h2>
              <div
                v-if="
                  page.data.fourth['1'] &&
                  page.data.fourth['1']['description_' + $i18n.locale]
                "
                v-html="page.data.fourth['1']['description_' + $i18n.locale]"
              ></div>
              <ul v-if="page.data.fourth['2'].length">
                <li
                  v-for="el in page.data.fourth['2']"
                  :key="el.id"
                  v-html="el['description_' + $i18n.locale]"
                ></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="text-center wow fadeInUp">
          <div class="title center movil-left">
            <h2
              v-if="
                page.data.fifth['1'] &&
                page.data.fifth['1']['title_' + $i18n.locale]
              "
            >
              {{ page.data.fifth["1"]["title_" + $i18n.locale] }}
            </h2>
          </div>
          <div
           class="movil-text-justify"
            v-if="
              page.data.fifth['1'] &&
              page.data.fifth['1']['description_' + $i18n.locale]
            "
            v-html="page.data.fifth['1']['description_' + $i18n.locale]"
          ></div>
        </div>
        <div class="grid-col" v-if="page.data.fifth['2'].length">
          <div
            class="grid-s-12 grid-m-12 grid-l-4"
            v-for="(el, i) in page.data.fifth['2']"
            :key="'fif' + i"
          >
            <div class="box-ser-cliente wow fadeInLeft">
              <span>{{ i + 1 }}</span>
              <div>
                <h4 v-if="el['title_'+ $i18n.locale]"><b>{{ el['title_'+ $i18n.locale]}}</b></h4>
                <div  v-if="el['description_'+ $i18n.locale]"
                v-html="el['description_'+ $i18n.locale]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
<!--NROJAS 06.02.2024-->
    <section
      class="section bg-nosotros-1 lazyload"
      data-bg="https://admin.lider.com.pe/storage/img/about/aw-1613740843602fbb2bb06cb.jpg"      
    ><div class="container"></div>
    </section>
<!--FIN-->
  </main>
</template>
<script>
import Banner from "../components/Banner";
if (process.client) {
  require("owl.carousel");
  require("/static/js/jq.fancybox.min.js");
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.green.css";
import "/static/css/jq.fancybox.min.css";
export default {
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/about-us", {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
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
  components: {
    Banner,
  },
  data() {
    return {
      page: {},
      storageUrl: process.env.STORAGE_URL,
    };
  },
  mounted() {
    $(document).ready(function () {
       $(".fancybox").fancybox();
      $(".proyectos-entregados.owl-carousel").owlCarousel({
        loop:false,
        margin: 20,
        nav: true,
        autoplay: true,
        dots: false,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 2,
          },
          600: {
            items: 2.5,
          },
          1025: {
            items: 4,
          },
        },
      });
    });
  },
  nuxtI18n: {
    paths: {
      en: "/about-us",
      es: "/nosotros",
    },
  },
};
</script>