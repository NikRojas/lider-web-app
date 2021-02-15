<template>
  <main class="blog--post">
    <Banner :title="page.data.post['title_' + $i18n.locale]"></Banner>
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
                  <a href="" class="compartir btn-circle facebook"
                    ><i class="flaticon-facebook"></i
                  ></a>
                  <a href="" class="compartir btn-circle linkedin"
                    ><i class="flaticon-linkedin"></i
                  ></a>
                  <a href="" class="compartir btn-circle whatsapp"
                    ><i class="flaticon-whatsapp"></i
                  ></a>
                  <a href="" class="compartir btn-circle mail"
                    ><i class="flaticon-mail"></i
                  ></a>
                </div>
              </div>
              <hr />
              <div>
                <h5><b>{{ $t('Comentarios')}}:</b></h5>
                <div
                  class="fb-comments"
                  data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
                  data-width=""
                  data-numposts="5"
                ></div>
              </div>
              <hr />
            </div>
          </div>
          <div class="grid-s-12 grid-m-12 grid-l-3">
            <div class="aside-blog">
              <div class="buscador">
                <input type="text" placeholder="| Que estas buscando" />
                <i class="flaticon-lupa"></i>
              </div>
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
            <Suscribe></Suscribe>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import Banner from "../../../../components/Banner";
import Suscribe from "../../../../components/Suscribe";
import Post from "../../../../components/blog/Post";
export default {
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
    Post
  },
  data() {
    return {
      page: {},
      storageUrl: process.env.STORAGE_URL,
    };
  },
  nuxtI18n: {
    paths: {
      en: "/blog/category/:category/:post",
      es: "/blog/categoria/:category/:post",
    },
  },
};
</script>