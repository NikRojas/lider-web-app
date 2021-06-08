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
        <!--<Filters  :range.sync="range" 
        :views.sync="views"
        :floors.sync="floors"
        :departments.sync="departments"
        :rooms.sync="rooms"
        :statuses.sync="statuses"
        :projects.sync="projects"
        :typeDepartments.sync="typeDepartments" @set="get" @clear="clear" :data="page.data.filters"></Filters>-->
        <Filters @set="getEls" @clear="clear" :data="page.data.filters"></Filters>
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
import Steps from "../../components/payment/Steps";
import Filters from "../../components/payment/Filters";
import Pagination from "../../components/payment/Pagination";
export default {
  name: 'ReserveIndex',
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
  async validate({ params, $axios, app }) {
    const data = await $axios.$get("/api/page/reserve", {
      params: { locale: app.i18n.locale },
    });
    if (data.success) {
      return true;
    }
    return false;
  },
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/reserve", {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },
  nuxtI18n: {
    paths: {
      es: "/separa-tu-depa",
      en: "/reserve-your-department",
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
    /*get(){
      this.getEls(1);
    },*/
    clear(){
      this.sortBy = 'initial';
      this.getEls(1);
    },
    //getEls(page = false) {
    getEls(page = false, range = false, views = false, floors = false, ubigeo = false , rooms = false, statuses = false, projects = false, type = false) {
      this.loadingEls = true;
      if(page) this.pageActive = page;
      this.$scrollTo(document.getElementById("estates"),900,{offset:-30});
      console.log(range);
      console.log(views);
      console.log(floors);
      console.log(ubigeo);
      console.log(rooms);
      console.log(statuses);
      console.log(projects);
      console.log(type);
      if(range) this.range = range;
      if(views) this.views = views;
      if(floors) this.floors = floors;
      if(rooms) this.rooms = rooms;
      if(statuses) this.statuses = statuses;
      if(ubigeo) this.ubigeo = ubigeo;
      if(projects) this.projects = projects;
      if(type) this.type = type;
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