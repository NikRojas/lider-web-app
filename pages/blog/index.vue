<template>
  <main class="blog">
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
          <h3>
            Lo sentimos, no hay ningún resultado para "{{
              this.$route.query.q
            }}"
          </h3>
        </div>
      </div>
    </section>

    <section class="section-filter-blog" v-if="page.data.categories">
      <div class="container">
        <div class="list-categoria wow fadeInUp">
          <h5>{{ $t("Categorías") }} :</h5>
          <nuxt-link
            class="btn"
            :class="this.$route.query.q ? '' : 'active'"
            :to="localePath('blog')"
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