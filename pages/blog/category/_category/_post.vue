<template>
  <main class="blog--post">
    <Banner :banner="
        page.data.content[
          page.data.content.findIndex((x) => x.name === 'Banner')
        ].content_formatted.includes('image')
          ? page.data.content[
              page.data.content.findIndex((x) => x.name === 'Banner')
            ].content.find((x) => x.field === 'image').value
          : ''
      " title="Blog"></Banner>
    <section class="section">
      <div class="container">
        <div class="grid-col">
          <div class="grid-s-12 grid-m-12 grid-l-9">
            <div class="single-blog">
              <div class="img">
                <img
                  class="lazyload"
                  :data-src="storageUrl + '/img/posts/' + page.data.post.image"
                  :alt="page.data.post['title_' + $i18n.locale]"
                />
              </div>
              <div class="content-single-blog">
                <div class="titulo">
                  {{ page.data.post["title_" + $i18n.locale] }}
                </div>
                <hr />
                <div v-html="page.data.post['content_' + $i18n.locale]"></div>
              </div>
              <hr />
              <div class="compartir">
                <h5><b>{{ $t('Compartir')}}:</b></h5>
                <div class="lista-compartir">
                  <ShareNetwork
                    class="compartir btn-circle"
                      network="facebook"
                      :url="baseUrl+$route.path"
                      :title="page.data.post['title_' + $i18n.locale]"
                      :description="page.data.post['excerpt_' + $i18n.locale]"
                    >
                      <i class="flaticon-facebook"></i
                  >
                  </ShareNetwork>
                  <ShareNetwork
                    class="compartir btn-circle"
                      network="linkedin"
                      :url="baseUrl+$route.path"
                      :title="page.data.post['title_' + $i18n.locale]"
                      :description="page.data.post['excerpt_' + $i18n.locale]"
                    >
                      <i class="flaticon-linkedin"></i
                  >
                  </ShareNetwork>
                  <ShareNetwork
                    class="compartir btn-circle"
                      network="whatsapp"
                      :url="baseUrl+$route.path"
                      :title="page.data.post['title_' + $i18n.locale]"
                      :description="page.data.post['excerpt_' + $i18n.locale]"
                    >
                      <i class="flaticon-whatsapp-1"></i
                  >
                  </ShareNetwork>
                   <ShareNetwork
                    class="compartir btn-circle"
                      network="email"
                      :url="baseUrl+$route.path"
                      :title="page.data.post['title_' + $i18n.locale]"
                      :description="page.data.post['excerpt_' + $i18n.locale]"
                    >
                      <i class="flaticon-mail"></i
                  >
                  </ShareNetwork>
                </div>
              </div>
              <hr />
              <div>
                <h5><b>{{ $t('Comentarios')}}:</b></h5>

                <client-only>
                  <div
                    class="fb-comments"
                    :data-href="baseUrl+$route.path"
                    data-width="100%"
                    data-numposts="10"
                    data-lazy="true"
                  ></div>
                  <div id="fb-root"></div>
                </client-only>
              </div>
              <hr />
            </div>
          </div>
          <div class="grid-s-12 grid-m-12 grid-l-3">
            <div class="aside-blog">
              <Search></Search>
              <div class="list-categoria">
                <h5><b>{{ $t('Categorías')}}:</b></h5>
                <div class="grid-col-2">
                  <nuxt-link class="btn" :to="localePath('blog')">{{
                    $t("Todos")
                  }}</nuxt-link>
                  <nuxt-link
                    class="btn"
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
              <div class="otros-blog">
                <h5><b>{{$t('Últimos artículos')}}:</b></h5>
                <template v-for="(el, i) in page.data.posts">
                  <Post :el="el" :key="'post' + el.id"></Post>
                </template>
                <div>
                  <nuxt-link class="btn btn2" :to="localePath('blog')">{{
                    $t("Todos")
                  }}</nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <div class="grid-s-12 grid-m-12 grid-l-9">
            <Suscribe :banner="page.data.content[
          page.data.content.findIndex((x) => x.name === 'Suscríbete')
        ].content_formatted.includes('background')
          ? page.data.content[
              page.data.content.findIndex((x) => x.name === 'Suscríbete')
            ].content.find((x) => x.field === 'background').value
          : ''" :image="page.data.content[
          page.data.content.findIndex((x) => x.name === 'Suscríbete')
        ].content_formatted.includes('image')
          ? page.data.content[
              page.data.content.findIndex((x) => x.name === 'Suscríbete')
            ].content.find((x) => x.field === 'image').value
          : ''"></Suscribe>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import Search from "../../../../components/blog/Search";
import Banner from "../../../../components/Banner";
import Suscribe from "../../../../components/Suscribe";
import Post from "../../../../components/blog/Post";
export default {  
  head() {
    return { 
      htmlAttrs: {
        lang: this.$i18n.locale == 'en' ? this.$i18n.locale+'_US' : this.$i18n.locale+'_PE'
      },
      title: this.page.data.post["title_"+this.$i18n.locale] ? this.page.data.post["title_"+this.$i18n.locale] : "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page.data.post['seo_description_'+this.$i18n.locale]
            ? this.page.data.post['seo_description_'+this.$i18n.locale]
            : ""
        },
        {
          itemprop: "name",
          content: this.page.data.post['title_'+this.$i18n.locale] ? this.page.data.post['title_'+this.$i18n.locale] : ""
        },
        {
          itemprop: "description",
          content: this.page.data.post['seo_description_'+this.$i18n.locale]
            ? this.page.data.post['seo_description_'+this.$i18n.locale]
            : ""
        },
        {
          itemprop: "image",
          content: this.page.data.post['image']
            ? process.env.STORAGE_URL +
              "/img/pages/" +
              this.page.data.post['image']
            : ""
        },
        {
          name: "keywords",
          content: this.page.data.post['seo_keywords_'+this.$i18n.locale]
            ? this.page.data.post['seo_keywords_'+this.$i18n.locale]
            : ""
        },
        { name: "og:url", content: process.env.BASE_URL+this.$route.path  },
        { name: "og:type", content: "website" },
        {
          name: "og:title",
          content: this.page.data.post['title_'+this.$i18n.locale] ? this.page.data.post['title_'+this.$i18n.locale] : ""
        },
        {
          name: "og:description",
          content: this.page.data.post['seo_description_'+this.$i18n.locale]
            ? this.page.data.post['seo_description_'+this.$i18n.locale]
            : ""
        },
        {
          name: "og:image",
          content: this.page.data.post['image']
            ? process.env.STORAGE_URL +
              "/img/pages/" +
              this.page.data.post['image']
            : ""
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: this.page.data.post['title_'+this.$i18n.locale] ? this.page.data.post['title_'+this.$i18n.locale] : ""
        },
        {
          name: "twitter:description",
          content: this.page.data.post['seo_description_'+this.$i18n.locale]
            ? this.page.data.post['seo_description_'+this.$i18n.locale]
            : ""
        },
        {
          name: "twitter:image",
          content: this.page.data.post['image']
            ? process.env.STORAGE_URL +
              "/img/pages/" +
              this.page.data.post['image']
            : ""
        }
      ]
    };
  },
  async validate({ params, $axios, app }) {
    const data = await $axios.$get(
      "/api/page/blog/category/" + params.category + "/" + params.post,
      {
        params: { locale: app.i18n.locale },
      }
    );
    if (data.success) {
      return true;
    }
    return false;
  },
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get(
      "/api/page/blog/category/" + params.category + "/" + params.post,
      {
        params: { locale: app.i18n.locale },
      }
    );
    return { page: data };
  },
  components: {
    Banner,
    Suscribe,
    Post,
    Search
  },
  data() {
    return {
      page: {},
      baseUrl: process.env.BASE_URL,
      storageUrl: process.env.STORAGE_URL,
    };
  },
  updated() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  },
  nuxtI18n: {
    paths: {
      en: "/blog/category/:category/:post",
      es: "/blog/categoria/:category/:post",
    },
  },
};
</script>