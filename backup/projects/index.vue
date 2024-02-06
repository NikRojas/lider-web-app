<template>
  <main class="projects">
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
    <ProjectsFilter
      :ubigeo.sync="filterUbigeo"
      :status.sync="filterStatus"
      :rooms.sync="filterRooms"
      @search="searchFilter"
      :loading="loadingProjects"
      :label="$t('Disponibles')"
      :filters="page.data.filters"
    />
    <section class="section">
      <div class="container">
        <div class="grid-col">
          <template v-if="loadingProjects">
            <div
              class="grid-s-12 grid-m-6 grid-l-4"
              v-for="(el, i) in 6"
              :key="'lo1' + i"
            >
              <PuSkeleton height="450px"></PuSkeleton>
            </div>
          </template>
          <template v-else>
            <div
              class="grid-s-12 grid-m-6 grid-l-4"
              v-for="el in page.data.projects.data"
              :key="el.id"
            >
              <CardProject :el="el"></CardProject>
            </div>
            <template v-if="loadingMoreProjects">
              <div
                class="grid-s-12 grid-m-6 grid-l-4"
                v-for="(el, i) in 3"
                :key="'lo2' + i"
              >
                <PuSkeleton height="450px"></PuSkeleton>
              </div>
            </template>

            <div
              class="grid-s-12"
              v-if="page.data.projects.last_page != projectsPageActive"
            >
              <div class="text-center wow fadeInUp">
                <button @click="searchFilter(true)" class="btn">
                  {{ $t("Ver más proyectos") }}
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import ProjectsFilter from "../../components/projects/Filter";
import Banner from "../../components/Banner";
import CardProject from "../../components/projects/Card";
export default {
  components: {
    Banner,
    ProjectsFilter,
    CardProject
  },
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/projects", {
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
  nuxtI18n: {
    paths: {
      en: "/projects",
      es: "/proyectos",
    },
  },
  data() {
    return {
      page: {},
      loadingProjects: false,
      loadingMoreProjects: false,
      projectsPageActive: 1,
      filterUbigeo: [],
      filterStatus: [],
      filterRooms: [],
    };
  },
  methods: {
    searchFilter(next = false) {
      if (next) {
        this.loadingMoreProjects = true;
      } else {
        this.loadingProjects = true;
      }
      this.$axios
        .$get("/api/paginate/projects", {
          params: {
            locale: this.$i18n.locale,
            ...(next ? { page: this.projectsPageActive + 1 } : { page: 1 }),
            ...(this.filterUbigeo
              ? { ubigeo: this.filterUbigeo }
              : {}),
            ...(this.filterStatus ? { status: this.filterStatus } : {}),
            ...(this.filterRooms ? { rooms: this.filterRooms } : {}),
          },
        })
        .then((response) => {
          if (next) {
            if (response.data.length) {
              this.projectsPageActive += 1;
              this.page.data.projects.data.push(...response.data);
            }
          } else {
            this.projectsPageActive = 1;
            this.page.data.projects = response;
          }
          this.loadingProjects = false;
          this.loadingMoreProjects = false;
        });
    },
  },
};
</script>