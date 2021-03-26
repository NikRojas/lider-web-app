<template>
  <main class="contact">
    <Banner :banner="page.data.content[
                  page.data.content.findIndex((x) => x.name === 'Banner')
                ].content_formatted.includes('image') ? 
                page.data.content[
                  page.data.content.findIndex((x) => x.name === 'Banner')
                ].content.find((x) => x.field === 'image').value : ''" :title="page.data.content[page.data.content.findIndex(x => x.name === 'Banner')].content_formatted.includes('title')
            && page.data.content[page.data.content.findIndex(el => el.name === 'Banner')].content.find(x => x.field === 'title')['value_'+$i18n.locale] ?
            page.data.content[page.data.content.findIndex(el => el.name === 'Banner')].content.find(x => x.field === 'title')['value_'+$i18n.locale]
            : ''">
            <div slot="title" class="grid-col-2">
        <a class="btn" :href="footer.information.link_jobs" v-if="footer.information && footer.information.link_jobs" rel="noopener" target="_blank">
          {{ $t('Trabaja con nosotros')}}
        </a>
        <nuxt-link :to="localePath('sell-your-land')" class="btn">{{ $t('Vende tu terreno')}}</nuxt-link>
      </div>
    </Banner>

    <section class="section section-contacto">
      <div class="container">
        <div class="grid-col">
          <div class="grid-s-12 grid-m-12 grid-l-6">
            <div class="content wow fadeInUp" data-wow-delay="1.5s">
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
                        <b>¡{{$t('Excelente')}}!</b>
                    </h3>
                    <p>{{ $t('Hemos registrado tus datos con éxito. Pronto un asesor se pondrá en contacto contigo')}}.</p>
                    <b>{{ $t('¡Gracias por solicitar información!')}}</b>
                </div>
                <form v-else key="false" @submit.prevent="submit">
                <div class="grid-col">
                  <div class="grid-s-12 grid-m-6 grid-l-6">
                    <div class="form-control">
                      <label for="name">{{ $t("Nombre")}}*</label>
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
                      <label for="telefono">{{ $t("Teléfono")}}*</label>
                      <input
                        type="text"
                        id="telefono"
                        v-model="form.mobile"
                      />
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
                      <label for="correo">{{ $t("Correo")}}*</label>
                      <input
                        type="text"
                        id="correo"
                        v-model="form.email"
                      />
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
                      <label for="message">{{ $t("Mensaje")}}</label>
                      <textarea
                        name="message"
                        id="message"
                        v-model="form.message"
                        cols="30"
                        rows="5"
                      ></textarea>
                      <span
                        class="error error-red"
                        v-if="errors && errors.message"
                        for="message"
                        >{{ $t(errors.message[0]) }}</span
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
                        >{{ $t('He leído y acepto los')}} <Terms :content="page.data.terms"></Terms> {{ $t("y") }}
                          <Policies :content="page.data.privacy"></Policies>.</label
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
                    <button type="submit" :class="request ? 'btn--opacity' : ''" :disabled="request" class="w-100 btn btn2">
                      {{ request ? $t("Cargando")+"..." : $t("Enviar") }} </button>
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
import Terms from "../components/modals/Terms";
import Policies from '../components/modals/Policies';
export default {
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/contact-us", {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },
  components: {
    Banner,
    Terms,
    Policies
  },
  nuxtI18n: {
    paths: {
      en: "/contact-us",
      es: "/contacto",
    },
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
  data(){
      return{
          request: false,
          storageUrl: process.env.STORAGE_URL,
          form:{

          },
          page:{},
          success: false,
          errors:{}
      }
  },
  methods:{
      submit() {
        this.request = true;
        this.$axios
            .$post("/api/post/lead/traditional", this.form)
            .then((response) => {
            this.request = false;
            this.success = true;
            })
            .catch((error) => {
            this.request = false;
            if (error.response.status === 422) {
                this.errors = error.response.data.errors || {};
                return;
            }
            });
        },
  },
  computed: {
    footer() {
      return this.$store.getters.getFooter;
    },
  },
};
</script>