<template>
  <main class="main_page">
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

    <section class="section">
      <div class="container">
        <div
          class="text text-justify"
          v-if="
            page.data.content[
              page.data.content.findIndex((x) => x.name === 'Información')
            ].content_formatted.includes('description') &&
            page.data.content[
              page.data.content.findIndex((el) => el.name === 'Información')
            ].content.find((x) => x.field === 'description')[
              'value_' + $i18n.locale
            ]
          "
          v-html="
            page.data.content[
              page.data.content.findIndex((el) => el.name === 'Información')
            ].content.find((x) => x.field === 'description')[
              'value_' + $i18n.locale
            ]
          "
        ></div>

        <div class="personal-form-data__buttons" v-if="
            page.data.content[
              page.data.content.findIndex((x) => x.name === 'Archivos')
            ].content_formatted.includes('files_pdfs_buttons') &&
            page.data.content[
              page.data.content.findIndex((el) => el.name === 'Archivos')
            ].content.find((x) => x.field === 'files_pdfs_buttons')[
              'value'
            ]
          ">
            <div class="grid-col" v-if=" page.data.content[
              page.data.content.findIndex((el) => el.name === 'Archivos')
            ].content.find((x) => x.field === 'files_pdfs_buttons')[
              'value'
            ].length">

                <div class="grid-s-12 grid-m-6 grid-l-3" v-for="(el, j) in  page.data.content[
                    page.data.content.findIndex((el) => el.name === 'Archivos')
                    ].content.find((x) => x.field === 'files_pdfs_buttons')[
                    'value'
                    ]" :key="j+'button'">

                    <a  v-if="el['button_' + $i18n.locale] && el['file']"
                    :href="storageUrl + '/files/forms/' + el['file']" target="_blank" class="btn">
                    {{ el['button_' + $i18n.locale] }}</a>
                </div>
            </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import Banner from "../components/Banner";
export default {
  components: {
    Banner,
  },
  nuxtI18n: {
    paths: {
      en: "/personal-data-form",
      es: "/formulario-datos-personales",
    },
  },
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/personal-data-form", {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },  
  head() {
    return { 
      htmlAttrs: {
        lang: this.$i18n.locale == 'en' ? this.$i18n.locale+'_US' : this.$i18n.locale+'_PE'
      },
      title: this.page.data.page["title_"+this.$i18n.locale] ? this.page.data.page["title_"+this.$i18n.locale] : "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page.data.page['seo_description_'+this.$i18n.locale]
            ? this.page.data.page['seo_description_'+this.$i18n.locale]
            : ""
        },
        {
          itemprop: "name",
          content: this.page.data.page['title_'+this.$i18n.locale] ? this.page.data.page['title_'+this.$i18n.locale] : ""
        },
        {
          itemprop: "description",
          content: this.page.data.page['seo_description_'+this.$i18n.locale]
            ? this.page.data.page['seo_description_'+this.$i18n.locale]
            : ""
        },
        {
          itemprop: "image",
          content: this.page.data.page['seo_image']
            ? process.env.STORAGE_URL +
              "/img/pages/" +
              this.page.data.page['seo_image']
            : ""
        },
        {
          name: "keywords",
          content: this.page.data.page['seo_keywords_'+this.$i18n.locale]
            ? this.page.data.page['seo_keywords_'+this.$i18n.locale]
            : ""
        },
        { name: "og:url", content: process.env.BASE_URL+this.$route.path  },
        { name: "og:type", content: "website" },
        {
          name: "og:title",
          content: this.page.data.page['title_'+this.$i18n.locale] ? this.page.data.page['title_'+this.$i18n.locale] : ""
        },
        {
          name: "og:description",
          content: this.page.data.page['seo_description_'+this.$i18n.locale]
            ? this.page.data.page['seo_description_'+this.$i18n.locale]
            : ""
        },
        {
          name: "og:image",
          content: this.page.data.page['seo_image']
            ? process.env.STORAGE_URL +
              "/img/pages/" +
              this.page.data.page['seo_image']
            : ""
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: this.page.data.page['title_'+this.$i18n.locale] ? this.page.data.page['title_'+this.$i18n.locale] : ""
        },
        {
          name: "twitter:description",
          content: this.page.data.page['seo_description_'+this.$i18n.locale]
            ? this.page.data.page['seo_description_'+this.$i18n.locale]
            : ""
        },
        {
          name: "twitter:image",
          content: this.page.data.page['seo_image']
            ? process.env.STORAGE_URL +
              "/img/pages/" +
              this.page.data.page['seo_image']
            : ""
        }
      ]
    };
  },
  data() {
    return {
      page: {},
      storageUrl: process.env.STORAGE_URL,
    };
  },
};
</script>