<template>
    <div>
        projtects
    </div>
</template>
<script>
export default {
    async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/projects", {
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
    nuxtI18n: {
        paths: {
            en: '/projects', 
            es: '/proyectos' 
        }
    },
    data(){
        return{
            page:{}
        }
    }
}
</script>