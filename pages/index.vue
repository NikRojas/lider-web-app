<template>
  <main>
    <div style="400px;"></div>
    <section class="slider" v-if="page.data.slider.length">
      <client-only>
        <carousel :items="1" loop nav dots>
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
        </carousel>
      </client-only>
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
              v-for="(el,i) in 6"
              :key="'lo1'+i"
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
              v-for="(el,i) in 3"
              :key="'lo2'+i"
            >
               
              <PuSkeleton height="450px" ></PuSkeleton>
            </div>
            </template>
            

            <div
              class="grid-s-12"
              v-if="page.data.projects.last_page != projectsPageActive"
            >
              <div class="text-center wow fadeInUp">
                <button @click="searchFilter(true)" class="btn">Ver más proyectos</button>
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
          <div class="item">
            <div class="card card-blog">
              <div class="img">
                <img src="public/img/blog/blog1.png" alt="" />
                <a href="single-blog.php"><i class="flaticon-cancelar"></i></a>
              </div>
              <a href="single-blog.php"
                ><h4>5 ventajas de vivir en un condominio</h4></a
              >
              <p>
                El primer paso para iniciar una vida en familia es contar con un
                hogar propio, para ello, es importante determinar el lugar donde
                deseas vivir...
              </p>
              <div class="tag">
                <div class="categoria">
                  <i class="flaticon-label"> </i>Life Style
                </div>
                <div class="calendario">
                  <i class="flaticon-calendario"> </i>12, Julio 2020
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="card card-blog">
              <div class="img">
                <img src="public/img/blog/blog2.png" alt="" />
                <a href="single-blog.php"><i class="flaticon-cancelar"></i></a>
              </div>
              <a href="single-blog.php"
                ><h4>
                  6 cosas que puedes hacer en casa para aprovechar tu tiempo
                </h4></a
              >
              <p>
                El primer paso para iniciar una vida en familia es contar con un
                hogar propio, para ello, es importante determinar el lugar donde
                deseas vivir...
              </p>
              <div class="tag">
                <div class="categoria">
                  <i class="flaticon-label"> </i>Life Style
                </div>
                <div class="calendario">
                  <i class="flaticon-calendario"> </i>12, Julio 2020
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="card card-blog">
              <div class="img">
                <img src="public/img/blog/blog3.png" alt="" />
                <a href="single-blog.php"><i class="flaticon-cancelar"></i></a>
              </div>
              <a href="single-blog.php"
                ><h4>5 ventajas de vivir en un condominio</h4></a
              >
              <p>
                El primer paso para iniciar una vida en familia es contar con un
                hogar propio, para ello, es importante determinar el lugar donde
                deseas vivir...
              </p>
              <div class="tag">
                <div class="categoria">
                  <i class="flaticon-label"> </i>Life Style
                </div>
                <div class="calendario">
                  <i class="flaticon-calendario"> </i>12, Julio 2020
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="card card-blog">
              <div class="img">
                <img src="public/img/blog/blog4.png" alt="" />
                <a href="single-blog.php"><i class="flaticon-cancelar"></i></a>
              </div>
              <a href="single-blog.php"
                ><h4>
                  ¡Llega la nueva edición de 3 días de Locura Inmobiliaria!
                </h4></a
              >
              <p>
                El primer paso para iniciar una vida en familia es contar con un
                hogar propio, para ello, es importante determinar el lugar donde
                deseas vivir...
              </p>
              <div class="tag">
                <div class="categoria">
                  <i class="flaticon-label"> </i>Life Style
                </div>
                <div class="calendario">
                  <i class="flaticon-calendario"> </i>12, Julio 2020
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="top-section">
          <div class="text-center wow fadeInUp">
            <nuxt-link :to="localePath('blog')" class="btn"
              >Ver más notas</nuxt-link
            >
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ProjectsFilter from "../components/projects/Filter";
import CardProject from "../components/projects/Card";
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
  },
  methods: {
    searchFilter(next = false) {
      /*console.log(this.filterDepartments);
      console.log(this.filterDistricts);
      console.log(this.filterStatuses);
      console.log( this.$i18n.locale)*/
      if(next){
        this.loadingMoreProjects = true;
      }
      else{
        this.loadingProjects = true;
      }
      this.$axios
        .$get("/api/paginate/projects", {
          params: {
            locale: this.$i18n.locale,
            ...(next ? { page: this.projectsPageActive + 1 } : {page: 1}),
            ...(this.filterDepartments ? { departments: this.filterDepartments } : {}),
            ...(this.filterDistricts ? { districts: this.filterDistricts } : {}),
            ...(this.filterStatuses ? { statuses: this.filterStatuses } : {}),
          },
        })
        .then((response) => {
          if(next){
            if (response.data.length) {
              this.projectsPageActive += 1;
              this.page.data.projects.data.push(...response.data);
            }
          }
          else{
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
};
</script>
