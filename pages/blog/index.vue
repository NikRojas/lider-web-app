<template>
  <main class="blog">
    <Banner>
      <div class="section-filter-blog wow fadeInUp">
        <Search></Search>
      </div>
    </Banner>

    <section v-if="this.$route.query.q">
      <div class="container" v-if="page.data.posts.data.length">
        <div class="section-resultado">
          <h3>Resultados para "{{ this.$route.query.q }}"</h3>
        </div>
      </div>
      <div class="container" v-else>
        <div class="section-resultado no-data">
          <h3>Lo sentimos, no hay ningún resultado para "{{ this.$route.query.q }}"</h3>
        </div>
      </div>
    </section>

    <section class="section-filter-blog" v-if="page.data.categories">
      <div class="container">
        <div class="list-categoria wow fadeInUp">
          <h5>{{ $t("Categorías") }} :</h5>
          <nuxt-link class="btn" :class="this.$route.query.q ? '' : 'active'" :to="localePath('blog')"
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
    <section class="bottom-section" v-if="page.data.posts.data">
      <div class="container">
        <div class="grid-col">
          <div
            class="grid-s-12 grid-m-6"
            :class="i == 0 || i == 1 ? ' grid-l-6' : ' grid-l-4'"
            v-for="(el, i) in page.data.posts.data"
            :key="'post' + el.id"
          >
            <Post :el="el"></Post>
          </div>
          <template v-if="loadingMore">
            <div
              class="grid-s-12 grid-m-6"
              v-for="(el, i) in 6"
              :key="'load' + i"
            >
              <PuSkeleton height="300px"></PuSkeleton>
            </div>
          </template>
          <div class="grid-s-12">
            <div
              class="text-center wow fadeInUp"
              v-if="page.data.posts.last_page != pageActive"
            >
              <button
                :class="loadingMore ? 'btn--opacity' : ''"
                type="button"
                @click="paginateBlog"
                :disabled="loadingMore"
                class="btn"
              >
                {{ loadingMore ? $t("Cargando") + "..." : $t("Ver más notas") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import Banner from "../../components/Banner";
import Post from "../../components/blog/Post";
import Search from "../../components/blog/Search";
export default {
  watchQuery: true,
  async asyncData({ route, $axios, app }) {
    let { data } = await $axios.get("/api/page/blog", {
      params: {
        locale: app.i18n.locale,
        ...(route.query.q ? { q: route.query.q } : {}),
      },
    });
    return { page: data };
  },
  components: {
    Banner,
    Post,
    Search,
  },
  data() {
    return {
      page: {},
      loadingMore: false,
      pageActive: 1,
    };
  },
  methods: {
    paginateBlog() {
      this.loadingMore = true;
      this.$axios
        .$get("/api/paginate/blog", {
          params: {
            locale: this.$i18n.locale,
            page: this.pageActive + 1,
          },
        })
        .then((response) => {
          if (response.data.length) {
            this.pageActive += 1;
            this.page.data.posts.data.push(...response.data);
          }

          this.loadingMore = false;
        });
    },
  },
};
</script>