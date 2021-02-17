<template>
  <main class="work-with-us">
    <Banner :banner="page.data.content[
                  page.data.content.findIndex((x) => x.name === 'Banner')
                ].content_formatted.includes('image') ? 
                page.data.content[
                  page.data.content.findIndex((x) => x.name === 'Banner')
                ].content.find((x) => x.field === 'image').value : ''" :title="page.data.content[page.data.content.findIndex(x => x.name === 'Banner')].content_formatted.includes('title')
            && page.data.content[page.data.content.findIndex(el => el.name === 'Banner')].content.find(x => x.field === 'title')['value_'+$i18n.locale] ?
            page.data.content[page.data.content.findIndex(el => el.name === 'Banner')].content.find(x => x.field === 'title')['value_'+$i18n.locale]
            : ''">
            <div class="no-movil grid-col-2">
        <nuxt-link :to="localePath('contact')" class="btn">{{ $t('Contact')}}</nuxt-link>
        <nuxt-link :to="localePath('sell-your-land')" class="btn"
          >{{ $t('Vende tu terreno')}}</nuxt-link
        >
      </div>
    </Banner>
    

    <section class="section section-contacto">
      <div class="container">
        <div class="grid-col">
          <div class="grid-s-12 grid-m-12 grid-l-6">
            <div class="content wow fadeInUp" data-wow-delay="1.5s">
              <h2><b>Déjanos tu consulta CAMIBAR</b></h2>
              <p>
                TEST Envianos tus datos y tu {{ $t("Mensaje")}} de consulta para que un asesor
                pueda resolverlo.
              </p>
              <transition name="slide-fade">
                <div v-if="success" key="true" class="form__text-success-2">
                  <h3>
                    <strong>¡Registro exitoso!</strong>
                  </h3>
                  <p>
                    Si cumples con el perfil te contactaremos a la brevedad
                    posible. ¡Suerte!
                  </p>
                </div>
                <form v-else key="false" @submit.prevent="submit">
                  <div class="grid-col">
                    <div class="grid-s-12">
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
                        <label for="phone">{{ $t("Teléfono")}}*</label>
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
                        <label for="email">{{ $t("Correo")}}*</label>
                        <input type="text" id="email" v-model="form.email" />
                        <span
                          class="error error-red"
                          v-if="errors && errors.email"
                          for="email"
                          >{{ $t(errors.email[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12 grid-m-6 grid-l-6">
                      <div class="form-control">
                        <label for="job">{{ $t("Puesto")}}*</label>
                        <input type="text" id="job" v-model="form.job" />
                        <span
                          class="error error-red"
                          v-if="errors && errors.job"
                          for="job"
                          >{{ $t(errors.job[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12 grid-m-6 grid-l-6">
                      <div class="form-control">
                        <label for="url">URL {{ $t("Portafolio")}}*</label>
                        <input type="text" id="url" v-model="form.url" />
                        <span
                          class="error error-red"
                          v-if="errors && errors.url"
                          for="url"
                          >{{ $t(errors.url[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12">
                      <dropzone
                            ref="ref_pdf"
                            id="pdf"
                            :duplicateCheck="true"
                            :useCustomSlot="true"
                            :options="options"
                            :destroyDropzone="true"
                            @vdropzone-file-added="validateFile($event,$refs.ref_pdf.dropzone,1,5242880,'5mb')"
                          >
                            <div class="dropzone-custom-content">
                              <h5 class="dropzone-custom-title">{{ $t("Sube tu CV en formato PDF")}}*</h5>
                            </div>
                          </dropzone>
                          <span
                            class="error error-red"
                            v-if="!error && errors && errors.pdf"
                            for="pdf"
                          >{{ $t(errors.pdf[0] )}}</span>

                          <span class="error error-red" v-if="error" for="pdf">{{ $t(errors.pdf[0] )}}</span>
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
      <div class="banner-contact wow fadeInRight" data-wow-delay="1.5s">
        <img src="public/img/contacto/fondo-contacto.png" alt="" />
      </div>
    </section>
    <section class="section si-movil-contacto bg1" style="display: none">
      <div class="container">
        <div class="grid-col-2">
          <nuxt-link :to="localePath('contact')" class="btn"
            >{{ $t('Contact')}}</nuxt-link
          >
          <nuxt-link :to="localePath('sell-your-land')" class="btn"
            >{{ $t('Vende tu terreno')}}</nuxt-link
          >
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import Dropzone from "nuxt-dropzone";
import "nuxt-dropzone/dropzone.css";
import Banner from "../components/Banner";
export default {
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/work-with-us", {
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
    Dropzone,
  },
  nuxtI18n: {
    paths: {
      en: "/work-with-us",
      es: "/trabaja-con-nosotros",
    },
  },
  data() {
    return {
      request: false,
      form: {},
      success: false,
      errors: {},
      error: false,
      options: {
        url: "/",
        maxFiles: 1,
        acceptedFiles: "application/pdf",
        autoProcessQueue: false,
        thumbnailWidth: 100,
        addRemoveLinks: true,
        dictRemoveFile: "Remover",
      },
    };
  },
  methods: {
    validateFile(file, ref, maxFile, maxFileSize, maxFileSizeText) {
      if (!/\.(pdf)$/i.test(file.name)) {
        this.error = true;
        this.errors.pdf = ["Solo se permite PDF."];
        ref.files.pop();
        if (
          file.previewElement.parentNode.classList.contains("dz-started") &&
          ref.files < 1
        ) {
          file.previewElement.parentNode.classList.remove("dz-started");
        }
        if (file.previewElement)
          file.previewElement.parentNode.removeChild(file.previewElement);
      }
      if (file.size > maxFileSize) {
        this.error = true;
        this.errors.pdf = [
          "Solo se permite PDF máximo de " + maxFileSizeText + ".",
        ];
        if (ref.files.length) {
          ref.files.pop();
        }
        if (
          file.previewElement.parentNode.classList.contains("dz-started") &&
          ref.dropzone.files < 1
        ) {
          file.previewElement.parentNode.classList.remove("dz-started");
        }
        file.previewElement.parentNode.removeChild(file.previewElement);
      }
      if (ref.files.length > maxFile) {
        this.error = true;
        this.errors.pdf = ["Solo puede subir " + maxFile + " PDF."];
        ref.files.pop();
        if (ref.files.length)
          file.previewElement.parentNode.removeChild(file.previewElement);
      }
    },
    restore(){
      this.form = {};
      this.errors = {};
      this.$refs.ref_pdf.dropzone.removeAllFiles();
    },
    submit() {
      this.error = false
      this.request = true;
       const fd = new FormData();
       this.form.name
        ? fd.append("name", this.form.name)
        : fd.append("name", "");
      this.form.mobile
        ? fd.append("mobile", this.form.mobile)
        : fd.append("mobile", "");
      this.form.email
        ? fd.append("email", this.form.email)
        : fd.append("email", "");
      this.form.job
        ? fd.append("job", this.form.job)
        : fd.append("job", "");
      if (this.form.url) {
        fd.append("url", this.form.url);
      }
      if (this.$refs.ref_pdf.dropzone.files[0]) {
        fd.append("pdf", this.$refs.ref_pdf.dropzone.files[0]);
      }
      this.$axios
        .$post("/api/post/applicant", fd)
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
          this.restore();
        });
    },
  },
};
</script>