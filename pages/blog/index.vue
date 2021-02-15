<template>
  <main class="blog">
    <Banner> </Banner>
    <section class="section-filter-blog" v-if="page.data.categories">
      <div class="container">
        <div class="list-categoria wow fadeInUp">
          <h5>{{ $t("Categorías") }} :</h5>
          <nuxt-link class="btn active" :to="localePath('blog')"
            >Todos</nuxt-link
          >
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
    </section>
    <section class="bottom-section" v-if="page.data.posts">
        <div class="container">
            <div class="grid-col">
                <div class="grid-s-12 grid-m-6" :class="i == 0 || i == 1 ? ' grid-l-6' : ' grid-l-4'" v-for="(el,i) in page.data.posts" :key="'post' + el.id">
                    <Post :el="el"></Post>
                </div>
            </div>
        </div>
    </section>
  </main>
</template>
<script>
import Banner from "../../components/Banner";
import Post from "../../components/blog/Post";
export default {
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/blog", {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },
  components: {
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