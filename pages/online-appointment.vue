<template>
  <main class="online-appointment">
    <Banner :banner="page.data.content[
                  page.data.content.findIndex((x) => x.name === 'Banner')
                ].content_formatted.includes('image') ? 
                page.data.content[
                  page.data.content.findIndex((x) => x.name === 'Banner')
                ].content.find((x) => x.field === 'image').value : ''" :title="page.data.content[page.data.content.findIndex(x => x.name === 'Banner')].content_formatted.includes('title')
            && page.data.content[page.data.content.findIndex(el => el.name === 'Banner')].content.find(x => x.field === 'title')['value_'+$i18n.locale] ?
            page.data.content[page.data.content.findIndex(el => el.name === 'Banner')].content.find(x => x.field === 'title')['value_'+$i18n.locale]
            : ''"> </Banner>
    <section class="section section-contacto">
      <div class="container">
        <div class="grid-col">
          <div class="grid-s-12 grid-m-12 grid-l-6">
            <div class="content wow fadeInUp">
              <h2 v-if="page.data.content[page.data.content.findIndex(x => x.name === 'Información')].content_formatted.includes('title')
            && page.data.content[page.data.content.findIndex(el => el.name === 'Información')].content.find(x => x.field === 'title')['value_'+$i18n.locale]"
            ><b>{{ page.data.content[page.data.content.findIndex(el => el.name === 'Información')].content.find(x => x.field === 'title')['value_'+$i18n.locale] }}</b>
          </h2>
              <div v-if="page.data.content[page.data.content.findIndex(x => x.name === 'Información')].content_formatted.includes('description')
            && page.data.content[page.data.content.findIndex(el => el.name === 'Información')].content.find(x => x.field === 'description')['value_'+$i18n.locale]"
                      v-html="
                        page.data.content[page.data.content.findIndex(el => el.name === 'Información')].content.find(x => x.field === 'description')['value_'+$i18n.locale]
                      "></div>
              <transition name="slide-fade">
                <div v-if="success" key="true" class="form__text-success-2">
                    <h3>
                        <strong>¡{{$t('Listo')}}!</strong>
                    </h3>
                    <p>{{ $t('Te contactaremos muy pronto')}}.</p>
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
                        <select
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
                        </select>
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
                    <div class="grid-s-12 grid-m-6 grid-l-6">
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
                          <nuxt-link :to="localePath('terms-conditions')">{{ $t("Términos y Condiciones") }}</nuxt-link> {{ $t("y") }}
                          <nuxt-link :to="localePath('privacy-policies')">{{ $t("Políticas de privacidad") }}</nuxt-link
                          >.</label
                        >
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
      <div class="banner-contact wow fadeInRight" data-wow-delay="1.5s" v-if=" page.data.content[
                  page.data.content.findIndex((x) => x.name === 'Información')
                ].content_formatted.includes('image')">
        <img class="lazyload" :data-src="storageUrl+'/img/content/'+page.data.content[
                  page.data.content.findIndex((x) => x.name === 'Información')
                ].content.find((x) => x.field === 'image').value" alt="" />
      </div>
    </section>
  </main>
</template>
<script>
import Banner from "../components/Banner";
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
        lang: this.$i18n.locale == 'en' ? this.$i18n.locale+'_US' : this.$i18n.locale+'_PE'
      },
      title: this.page.data.page["title_"+this.$i18n.locale] ? this.page.data.page["title_"+this.$i18n.locale] : "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page.data.page['seo_description_'+this.$i18n.locale]
            ? this.page.data.page['seo_description_'+this.$i18n.locale]
            : ""
        },
        {
          itemprop: "name",
          content: this.page.data.page['title_'+this.$i18n.locale] ? this.page.data.page['title_'+this.$i18n.locale] : ""
        },
        {
          itemprop: "description",
          content: this.page.data.page['seo_description_'+this.$i18n.locale]
            ? this.page.data.page['seo_description_'+this.$i18n.locale]
            : ""
        },
        {
          itemprop: "image",
          content: this.page.data.page['seo_image']
            ? process.env.STORAGE_URL +
              "/img/pages/" +
              this.page.data.page['seo_image']
            : ""
        },
        {
          name: "keywords",
          content: this.page.data.page['seo_keywords_'+this.$i18n.locale]
            ? this.page.data.page['seo_keywords_'+this.$i18n.locale]
            : ""
        },
        { name: "og:url", content: process.env.BASE_URL+this.$route.path  },
        { name: "og:type", content: "website" },
        {
          name: "og:title",
          content: this.page.data.page['title_'+this.$i18n.locale] ? this.page.data.page['title_'+this.$i18n.locale] : ""
        },
        {
          name: "og:description",
          content: this.page.data.page['seo_description_'+this.$i18n.locale]
            ? this.page.data.page['seo_description_'+this.$i18n.locale]
            : ""
        },
        {
          name: "og:image",
          content: this.page.data.page['seo_image']
            ? process.env.STORAGE_URL +
              "/img/pages/" +
              this.page.data.page['seo_image']
            : ""
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: this.page.data.page['title_'+this.$i18n.locale] ? this.page.data.page['title_'+this.$i18n.locale] : ""
        },
        {
          name: "twitter:description",
          content: this.page.data.page['seo_description_'+this.$i18n.locale]
            ? this.page.data.page['seo_description_'+this.$i18n.locale]
            : ""
        },
        {
          name: "twitter:image",
          content: this.page.data.page['seo_image']
            ? process.env.STORAGE_URL +
              "/img/pages/" +
              this.page.data.page['seo_image']
            : ""
        }
      ]
    };
  },
  components: {
    Banner,
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
      },
      request: false,
      success: false,
    };
  },
  created() {
    if (this.page.data.project)
      this.form.project_id = this.page.data.project.id;
    this.page.data.timeDay.length
      ? (this.form.schedule = this.page.data.timeDay[0].name)
      : "";
  },
  methods: {
    restore() {
      this.errors = {};
      this.form = {};
    },
    submit() {
      this.request = true;
      this.$axios
        .$post("/api/post/lead/online-appointment", this.form)
        .then((response) => {
          this.request = false;
          this.success = true;

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
};
</script>