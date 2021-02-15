<template>
  <main>
    <div style="400px;"></div>
    <section class="slider" v-if="page.data.slider.length">
      <div class="hero-slider owl-carousel owl-theme nav-absolute">
        <div
            class="single-hs-item"
            v-for="el in page.data.slider"
            :key="el.id"
          >
            <div class="img-slide">
              <picture>
                <source
                  media="(min-width: 720px)"
                  :data-srcset="
                    storageUrl + '/img/slider/' + el['image_' + $i18n.locale]
                  "
                />
                <source
                  media="(max-width: 720px)"
                  :data-srcset="
                    storageUrl +
                    '/img/slider/' +
                    el['image_responsive_' + $i18n.locale]
                  "
                />
                <img
                  class="lazyload"
                  :data-src="
                    storageUrl +
                    '/img/slider/' +
                    el['image_responsive_' + $i18n.locale]
                  "
                  alt=""
                />
              </picture>
            </div>
          </div>
      </div>
    </section>
    <ProjectsFilter
      :departments.sync="filterDepartments"
      :districts.sync="filterDistricts"
      :statuses.sync="filterStatuses"
      @search="searchFilter"
      :loading="loadingProjects"
      label="Proyectos en venta"
      :filters="page.data.filters"
    />

    <section class="top-section">
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

    <!--<section class="top-section">
      <div class="container">
        <div class="img wow fadeInUp">
          <a href="page-cami.php">
            <img src="public/img/cami.png" alt="" />
          </a>
        </div>
      </div>
    </section>-->

    <section class="section" v-if="page.data.posts.length">
      <div class="container">
        <div class="title center wow fadeInUp">
          <h2>Últimas notas</h2>
        </div>
        <div class="home-blog owl-carousel owl-theme wow fadeInUp">
          <div class="item" v-for="el in page.data.posts" :key="'post' + el.id">
            <Post :el="el"></Post>
          </div>
        </div>

        <div class="top-section">
          <div class="text-center wow fadeInUp">
            <nuxt-link :to="localePath('blog')" class="btn">{{
              $t("Ver más notas")
            }}</nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ProjectsFilter from "../components/projects/Filter";
import CardProject from "../components/projects/Card";
import Post from "../components/blog/Post";
if (process.client) {
  require("owl.carousel");
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.green.css";
export default {
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/home", {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },
  head() {
    return {};
  },
  data() {
    return {
      page: {},
      storageUrl: process.env.STORAGE_URL,
      loadingProjects: false,
      loadingMoreProjects: false,
      projectsPageActive: 1,
      filterDepartments: [],
      filterDistricts: [],
      filterStatuses: [],
      filterRooms: [],
    };
  },
  components: {
    ProjectsFilter,
    CardProject,
    Post,
  },
  methods: {
    searchFilter(next = false) {
      /*console.log(this.filterDepartments);
      console.log(this.filterDistricts);
      console.log(this.filterStatuses);
      console.log( this.$i18n.locale)*/
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
            ...(this.filterDepartments
              ? { departments: this.filterDepartments }
              : {}),
            ...(this.filterDistricts
              ? { districts: this.filterDistricts }
              : {}),
            ...(this.filterStatuses ? { statuses: this.filterStatuses } : {}),
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
          setTimeout(() => {
            this.loadingProjects = false;
            this.loadingMoreProjects = false;
          }, 1000);
        });
    },
  },
  mounted() {
    $(document).ready(function () {
      $('.hero-slider').owlCarousel({
  animateIn: 'pulse',
  items:1,
  loop:true,
  nav:true,
  dots: true
});
      $(".home-blog").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 2,
          },
          1025: {
            items: 3,
          },
        },
      });
    });
  },
};
</script>
