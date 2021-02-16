<template>
  <main class="blog--category">
    <Banner> 
      <div class="section-filter-blog wow fadeInUp">
        <Search></Search>
      </div> 
    </Banner>
    <section class="section-filter-blog" v-if="page.data.categories">
      <div class="container">
        <div class="list-categoria wow fadeInUp">
          <h5>{{ $t("Categorías") }}:</h5>
          <nuxt-link class="btn" :to="localePath('blog')"
            >{{ $t("Todos") }}</nuxt-link
          >
          <nuxt-link
            class="btn"
            :class="$route.params.category == category['slug_' + $i18n.locale] ? 'active' : ''"
            :to="
              localePath({
                name: 'blog-category-category',
                params: { category: category['slug_' + $i18n.locale] },
              })
            "
            v-for="category in page.data.categories"
            :key="category.id"
          >
            {{ category["name_" + $i18n.locale] }}
          </nuxt-link>
        </div>
      </div>
    </section>
    <section class="bottom-section" v-if="page.data.posts.data">
        <div class="container">
            <div class="grid-col">
                <div class="grid-s-12 grid-m-6" :class="i == 0 || i == 1 ? ' grid-l-6' : ' grid-l-4'" v-for="(el,i) in page.data.posts.data" :key="'post' + el.id">
                    <Post :el="el"></Post>
                </div>
            </div>
        </div>
    </section>
  </main>
</template>
<script>
import Banner from "../../../../components/Banner";
import Post from "../../../../components/blog/Post";
export default {
  head() {
    return { 
      htmlAttrs: {
        lang: this.$i18n.locale == 'en' ? this.$i18n.locale+'_US' : this.$i18n.locale+'_PE'
      },
      title: this.page.data.page["title_"+this.$i18n.locale] ? this.page.data.page["title_"+this.$i18n.locale] + ' - '+ (this.$i18n.locale == 'en' ? 'Category' : 'Categoría') + ' ' + this.page.data.category["name_"+this.$i18n.locale] : "",
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
          content: this.page.data.page['title_'+this.$i18n.locale] ? this.page.data.page['title_'+this.$i18n.locale] + ' - '+ (this.$i18n.locale == 'en' ? 'Category' : 'Categoría') + ' ' + this.page.data.category["name_"+this.$i18n.locale] : ""
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
          content: this.page.data.page['title_'+this.$i18n.locale] ? this.page.data.page['title_'+this.$i18n.locale] + ' - '+ (this.$i18n.locale == 'en' ? 'Category' : 'Categoría') + ' ' + this.page.data.category["name_"+this.$i18n.locale] : ""
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
          content: this.page.data.page['title_'+this.$i18n.locale] ? this.page.data.page['title_'+this.$i18n.locale] + ' - '+ (this.$i18n.locale == 'en' ? 'Category' : 'Categoría') + ' ' + this.page.data.category["name_"+this.$i18n.locale] : ""
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
  async validate({ params, $axios, app }) {
    const data = await $axios.$get("/api/page/blog/category/" + params.category, {
      params: { locale: app.i18n.locale },
    });
    if (data.success) {
      return true;
    }
    return false;
  },
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/blog/category/" + params.category, {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },
  nuxtI18n: {
    paths: {
      en: "/blog/category/:category",
      es: "/blog/categoria/:category",
    },
  },
  components:{
    Banner,
    Post
  },
  data() {
    return {
      page: {},
    };
  },
};
</script>