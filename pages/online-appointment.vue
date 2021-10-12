<template>
  <main class="online-appointment">
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
    <section class="section section-contacto">
      <div class="container">
        <div class="grid-col">
          <div class="grid-s-12 grid-m-12 grid-l-6">
            <div class="content wow fadeInUp">
              <h2
                v-if="
                  page.data.content[
                    page.data.content.findIndex((x) => x.name === 'Información')
                  ].content_formatted.includes('title') &&
                  page.data.content[
                    page.data.content.findIndex(
                      (el) => el.name === 'Información'
                    )
                  ].content.find((x) => x.field === 'title')[
                    'value_' + $i18n.locale
                  ]
                "
              >
                <b>{{
                  page.data.content[
                    page.data.content.findIndex(
                      (el) => el.name === "Información"
                    )
                  ].content.find((x) => x.field === "title")[
                    "value_" + $i18n.locale
                  ]
                }}</b>
              </h2>
              <div
                v-if="
                  page.data.content[
                    page.data.content.findIndex((x) => x.name === 'Información')
                  ].content_formatted.includes('description') &&
                  page.data.content[
                    page.data.content.findIndex(
                      (el) => el.name === 'Información'
                    )
                  ].content.find((x) => x.field === 'description')[
                    'value_' + $i18n.locale
                  ]
                "
                v-html="
                  page.data.content[
                    page.data.content.findIndex(
                      (el) => el.name === 'Información'
                    )
                  ].content.find((x) => x.field === 'description')[
                    'value_' + $i18n.locale
                  ]
                "
              ></div>
              <transition name="slide-fade">
                <div v-if="success" key="true" class="form__text-success-2">
                  <h3>
                    <b>¡{{ $t("Excelente") }}!</b>
                  </h3>
                  <p>
                    {{
                      $t(
                        "Hemos registrado tus datos con éxito. Pronto un asesor se pondrá en contacto contigo"
                      )
                    }}.
                  </p>
                  <b>{{ $t("¡Gracias por solicitar información!") }}</b>
                </div>
                <form v-else key="false" @submit.prevent="submit">
                  <div class="grid-col">
                    <div class="grid-s-12">
                      <div class="form-control">
                        <label for="project_id"
                          >{{ $t("Proyecto de interés") }}*</label
                        >
                        <select
                          name="project_id"
                          v-model="form.project_id"
                          id="project_id"
                          class="form-control"
                          @change="updateCalendarProject($event)"
                        >
                          <option
                            :value="el.id"
                            v-for="el in page.data.projects"
                            :key="el.id"
                          >
                            {{ el["name_" + $i18n.locale] }} -
                            {{ el.ubigeo_rel.district }}
                          </option>
                        </select>
                        <span
                          class="error error-red"
                          v-if="errors && errors.project_id"
                          for="project_id"
                          >{{ $t(errors.project_id[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12">
                      <div class="form-control">
                        <label for="schedule">{{ $t("Horario") }}*</label>
                        <!--<select
                          name="schedule"
                          id="schedule"
                          v-model="form.schedule"
                          class="form-control"
                        >
                          <option
                            :value="el.name"
                            v-for="el in page.data.timeDay"
                            :key="el.id"
                          >
                            {{ el.name }}
                          </option>
                        </select>-->
                        <div id="calendar"></div>
                        <span
                          style="margin-top: 12px; display: block;"
                          class="error error-red"
                          v-if="errors && errors.schedule"
                          for="schedule"
                          >{{ $t(errors.schedule[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12 grid-m-6 grid-l-6">
                      <div class="form-control">
                        <label for="name">{{ $t("Nombre") }}*</label>
                        <input type="text" id="name" v-model="form.name" />
                        <span
                          class="error error-red"
                          v-if="errors && errors.name"
                          for="name"
                          >{{ $t(errors.name[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12 grid-m-6 grid-l-6">
                      <div class="form-control">
                        <label for="name">{{ $t("Apellido") }}*</label>
                        <input
                          type="text"
                          id="lastname"
                          v-model="form.lastname"
                        />
                        <span
                          class="error error-red"
                          v-if="errors && errors.lastname"
                          for="lastname"
                          >{{ $t(errors.lastname[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12 grid-m-6 grid-l-6">
                      <div class="form-control">
                        <label for="dni">DNI*</label>
                        <input
                          type="text"
                          id="dni"
                          v-model="form.document_number"
                        />
                        <span
                          class="error error-red"
                          v-if="errors && errors.document_number"
                          for="document_number"
                          >{{ $t(errors.document_number[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12 grid-m-6 grid-l-6">
                      <div class="form-control">
                        <label for="phone">{{ $t("Teléfono") }}*</label>
                        <input type="text" id="phone" v-model="form.mobile" />
                        <span
                          class="error error-red"
                          v-if="errors && errors.mobile"
                          for="mobile"
                          >{{ $t(errors.mobile[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12">
                      <div class="form-control">
                        <label for="email">{{ $t("Correo") }}*</label>
                        <input type="text" id="email" v-model="form.email" />
                        <span
                          class="error error-red"
                          v-if="errors && errors.email"
                          for="email"
                          >{{ $t(errors.email[0]) }}</span
                        >
                      </div>
                    </div>

                    <div class="grid-s-12">
                      <div class="form-control">
                        <input
                          v-model="form.accepted"
                          class="checkbox"
                          id="accepted"
                          type="checkbox"
                        />
                        <label for="accepted"
                          >{{ $t("He leído y acepto los") }}
                          <Terms :content="page.data.terms"></Terms>
                          {{ $t("y") }}
                          <Policies :content="page.data.privacy"></Policies
                        ></label>
                        <span
                          class="error error-red"
                          v-if="errors && errors.accepted"
                          for="accepted"
                          >{{ $t(errors.accepted[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12">
                      <button
                        type="submit"
                        :class="request ? 'btn--opacity' : ''"
                        :disabled="request"
                        class="btn btn2 w-100"
                      >
                        {{ request ? $t("Cargando") + "..." : $t("Enviar") }}
                      </button>
                    </div>
                  </div>
                </form>
              </transition>
            </div>
          </div>
        </div>
      </div>
      <div
        class="banner-contact wow fadeInRight"
        data-wow-delay="1.5s"
        v-if="
          page.data.content[
            page.data.content.findIndex((x) => x.name === 'Información')
          ].content_formatted.includes('image')
        "
      >
        <img
          class="lazyload"
          :data-src="
            storageUrl +
            '/img/content/' +
            page.data.content[
              page.data.content.findIndex((x) => x.name === 'Información')
            ].content.find((x) => x.field === 'image').value
          "
          alt=""
        />
      </div>
    </section>
  </main>
</template>
<script>
import Banner from "../components/Banner";
import Terms from "../components/modals/Terms";
import Policies from "../components/modals/Policies";
import "../assets/scss/_calendar.scss";
export default {
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/online-appointment", {
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
      script: [
        {
          src: "/js/callider.min.js",
          /*"clid-llave":
            "V/By9ukAB/L8uCOX9D9wYS/xcoxcoxlHNCDrgg6ep/Ug7xIUikUQ7M7u1YjJzprsHbgv1MlLkx/dVtMkqJx0taDBnxzfWxaR",*/
          "clid-llave":
            "NvYlr6fKJo1ajMiKaC9jZ69vYUUOQFbFg9mEYDp6K7ZsTxlG7+fBT87u1YjJzprsHbgv1MlLkx9BASZyeAj923To1ooEc/Jk",
        },
      ],
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
  components: {
    Banner,
    Terms,
    Policies,
  },
  nuxtI18n: {
    paths: {
      en: "/online-appointment",
      es: "/cita-online",
    },
  },
  async validate({ params, $axios, app }) {
    const data = await $axios.$get("/api/page/online-appointment", {
      params: { locale: app.i18n.locale },
    });
    if (data.success) {
      return true;
    }
    return false;
  },
  async asyncData({ route, $axios, app }) {
    let { data } = await $axios.get("/api/page/online-appointment", {
      params: { locale: app.i18n.locale, project: route.query.project },
    });
    return { page: data };
  },
  data() {
    return {
      storageUrl: process.env.STORAGE_URL,
      errors: {},
      page: {},
      form: {
        project_id: null,
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_term: "",
        utm_content: "",
        accepted: false,
      },
      request: false,
      success: false,
    };
  },
  created() {
    /*if (this.page.data.project)
      this.form.project_id = this.page.data.project.id;
    this.page.data.timeDay.length
      ? (this.form.schedule = this.page.data.timeDay[0].name)
      : "";*/
  },
  methods: {
    updateCalendarProject(ref){
      let idProject;
        idProject = ref.target.value;
      let project = this.page.data.projects.find(x => x.id == idProject)
      let actLead = {
            grupo: project.sap_code,
            fechaInicio: "",
            fechaFin: "",
          };
          document
            .getElementById("calendar")
            .calLidLead("opcion", "actualizarLead", actLead);
            document.getElementById("calendar").calLidLead("refrescar");
    },
    restore() {
      this.errors = {};
      this.form = {
        accepted: false
      };
    },
    submit() {
      let utm_source, utm_medium, utm_campaign, utm_term, utm_content;
      utm_source = utm_medium = utm_campaign = utm_term = utm_content = "desconocido";
      if (this.$route.query.utm_source){
        this.form.utm_source = this.$route.query.utm_source;
        utm_source = this.form.utm_source;
      }
      if (this.$route.query.utm_medium){
        this.form.utm_medium = this.$route.query.utm_medium;
        utm_medium = this.form.utm_medium;
      }
      if (this.$route.query.utm_campaign){
        this.form.utm_campaign = this.$route.query.utm_campaign;
        utm_campaign = this.form.utm_campaign;
      }
      if (this.$route.query.utm_term){
        this.form.utm_term = this.$route.query.utm_term;
        utm_term = this.form.utm_term;
      }
      if (this.$route.query.utm_content){
        this.form.utm_content = this.$route.query.utm_content;
        utm_content = this.form.utm_content;
      }
      
      let utms = {
        source: utm_source,
        medium: utm_medium,
        campaign: utm_campaign,
        term: utm_term,
        content: utm_content,
        tipoDocumento: "D",
        nroDocumento: this.form.document_number,
        apellidoPaterno: this.form.lastname,
        apellidoMaterno: this.form.lastname,
        nombres: this.form.name,
        correo: this.form.email,
        telefono1: this.form.mobile
      };
      document.getElementById('calendar').calLidLead('opcion', 'actualizarLead', utms);
      let scheduleLead = document.getElementById("calendar").calLidLead('opcion','obtenerLead')
      console.log(scheduleLead);
      console.log(scheduleLead.fechaInicio);
      console.log(scheduleLead.fechaFin);
      if(scheduleLead.fechaInicio != ''){
        let fIni = scheduleLead.fechaInicio;
        let fFin = scheduleLead.fechaFin;
        fIni = fIni.toString();
        fFin = fFin.toString();
        this.form.schedule = fIni.substr(6, 2)+'/'+fIni.substr(4, 2)+'/'+fIni.substr(0, 4)+' '+fIni.substr(8, 2)+':'+fIni.substr(10, 2)+' - '+fFin.substr(6, 2)+'/'+fFin.substr(4, 2)+'/'+fFin.substr(0, 4)+' '+fFin.substr(8, 2)+':'+fFin.substr(10, 2)
      }
      else{
        this.form.schedule = "";
      }
      this.request = true;
      this.$axios
        .$post("/api/post/lead/online-appointment", this.form)
        .then((response) => {
          this.request = false;
          this.success = true;
          if(this.success){
            document.getElementById('calendar').calLidLead('opcion', 'registrarLead'); 
          }
          this.restore();
        })
        .catch((error) => {
          this.request = false;
          if (error.response.status === 422) {
            this.errors = error.response.data.errors || {};
            return;
          }
          this.restore();
        });
    },
  },
  mounted() {
    //window.addEventListener("load", (e) => {
      let projectCode = "";
    if (this.page.data.project){
      this.form.project_id = this.page.data.project.id;
      let project = this.page.data.projects.find(x => x.id == this.form.project_id)
      projectCode = project.sap_code;
      console.log(projectCode);
    }
      let cal = {
        lead: {
          tipoDocumento: "",
          nroDocumento: "",
          nombres: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          correo: "",
          telefono1: "",
          telefono2: "",
          fechaRecepcion: "",
          medio: 2,
          canal: "",
          grupo: projectCode,
          proyecto: "",
          comentario: "",
          source: "",
          medium: "",
          campaign: "",
          term: "",
          content: "",
          fechaInicio: "",
          fechaFin: "",
        },
        alto: "260px",
        ancho: "100%",
        lunesPrimero: true,
        formato24Horas: false,
        muestraFormulario: false,
        muestraBoton: false,
        idioma: 'es',
        /*finalizoCarga: function (args) {
        },
        seleccionoFecha: function (fIni, fFin) {},
        finalizoRegistro: function (args) {},*/
      };

      /*document
        .getElementById("slcGroup")
        .addEventListener("change", function () {
          let actLead = {
            grupo: this.value,
          };
          document
            .getElementById("calendar")
            .calLidLead("opcion", "actualizarLead", actLead);
          document.getElementById("calendar").calLidLead("refrescar");
        });

      document.getElementById("btnRef").addEventListener("click", function () {
        document.getElementById("calendar").calLidLead("refrescar");
      });

      document.getElementById("btnVer").addEventListener("click", function () {
        var lead = document.getElementById("calendar").calLidLead("opcion",'obtenerLead');
        console.log(lead);
      });*/

      document.getElementById('calendar').calLidLead(cal)
    //});
    /*if (this.page.data.project){
      this.updateCalendarProject(this.form.project_id);
    }*/

  },
};
</script>