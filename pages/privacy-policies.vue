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
      en: "/privacy-policies",
      es: "/politicas-privacidad",
    },
  },
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/privacy-policies", {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },
  data() {
    return {
      page: {},
    };
  },
};
</script>