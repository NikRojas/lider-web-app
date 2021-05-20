<template>
  <main class="reserve-your-property">
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
    <div class="container">
      <Steps active="index" text="Elige tu inmueble" />
    </div>

    <section class="estates">
      <div class="container">
        <Filters  :range.sync="range" 
        :views.sync="views"
        :floors.sync="floors"
        :departments.sync="departments"
        :rooms.sync="rooms"
        :statuses.sync="statuses"
        :projects.sync="projects"
        :typeDepartments.sync="typeDepartments" @set="get" @clear="clear" :data="page.data.filters"></Filters>
        <hr />
        <div id="buttons" >
        <button class="btn" @click="toggleShow()">
          {{ $t("Ver") }} {{ showData != "list" ? "En lista" : "En grilla" }}
        </button>
        <select v-model="sortBy">
          <option :value="s.value" v-for="s in sorts" :key="s.value">
            {{ s.desc }}
          </option>
        </select>
        </div>
        <div id="estates" style="padding-bottom: 60px; padding-top: 60px;">
          <Datatable
          :loading="loadingEls"
            :data="page.data.departments.data"
            v-show="showData == 'list'"
          ></Datatable>
          <Grid
            :loading="loadingEls"
            :data="page.data.departments.data"
            v-show="showData == 'grid'"
          ></Grid>
          <Pagination @get="getEls" :data="page.data.departments"></Pagination>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import Banner from "../../components/Banner";
import Steps from "../../components/reserve-your-property/Steps";
import Filters from "../../components/reserve-your-property/Filters";
import Pagination from "../../components/reserve-your-property/Pagination";
export default {
  async validate({ params, $axios, app }) {
    const data = await $axios.$get("/api/page/reserve-your-property", {
      params: { locale: app.i18n.locale },
    });
    if (data.success) {
      return true;
    }
    return false;
  },
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/reserve-your-property", {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },
  nuxtI18n: {
    paths: {
      es: "/separa-tu-inmueble",
      en: "/reserve-your-property",
    },
  },
  components: {
    Banner,
    Steps,
    Filters,
    Pagination,
  },
  data() {
    return {
      sortBy: 'initial',
      sorts:[
        {'value': 'initial', 'desc': 'Ordenar por defecto'},
        {'value': 'low-high', 'desc': 'Menor precio a mayor precio'},
        {'value': 'high-low', 'desc': 'Mayor precio a menor precio'},
      ],
      showData: "grid",
      page: {},
      storageUrl: process.env.STORAGE_URL,
      loadingEls: false,
      pageActive: 1,
      range: [],
      views: [],
          floors: [],
          departments: [],
          rooms: [],
          statuses: [],
          projects: [],
          typeDepartments: []
    };
  },
  methods: {
    //get(range, views, floors, departments, rooms, statuses,projects, typedepartments){
    get(){
      /*this.range = range;
      this.views = views;
      this.floors = floors;
      this.departments = departments;
      this.rooms = rooms;
      this.statuses = statuses;
      this.projects = projects;
      this.typeDepartments = typedepartments;*/
      this.getEls(1);
    },
    clear(){
      this.sortBy = 'initial';
      this.getEls(1);
    },
    getEls(page = false) {
      this.loadingEls = true;
      if(page) this.pageActive = page;
      this.$scrollTo(document.getElementById("estates"),900,{offset:-30});
      this.$axios
        .$get("/api/paginate/departments", {
          params: {
            locale: this.$i18n.locale,
            page: this.pageActive,
            sort_by: this.sortBy,
            range: this.range,
            views: this.views,
            floors: this.floors,
            rooms: this.rooms,
            statuses: this.statuses,
            projects: this.projects,
            ubigeo: this.departments,
            type: this.typeDepartments
          },
        })
        .then((response) => {
          this.page.data.departments = Object.assign({}, response);
          this.loadingEls = false;
        });
    },
    toggleShow() {
      if (this.showData == "grid") {
        this.showData = "list";
      } else {
        this.showData = "grid";
      }
    },
  },
  watch: {
    sortBy: {
      handler: function (newValue) {
        this.getEls(1);
      },
    },
  },
};
</script>