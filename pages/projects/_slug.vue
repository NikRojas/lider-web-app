<template>
  <main class="projects">
    <div class="header-proyectos">
      <div class="container">
        <div class="grid-head-proyecto">
          <div class="logo">
            <img
              :data-src="
                storageUrl + '/img/projects/' + page.data.project.logo_colour
              "
              class="lazyload"
              :alt="page.data.project['name_' + $i18n.locale] + 'Logo Color'"
            />
          </div>
          <div class="menu collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li>
                <a
                  v-scroll-to="{
                    el: '#description',
                    duration: 1000,
                    easing: 'ease',
                    offset: -50,
                  }"
                  href="#"
                  class="page-scroll no-tablet"
                  >{{ $t("Descripción") }}</a
                >
              </li>
              <li v-if="page.data.project.gallery_rel.length">
                <a
                  v-scroll-to="{
                    el: '#galeria',
                    duration: 1000,
                    easing: 'ease',
                    offset: -50,
                  }"
                  href="#"
                  class="page-scroll no-tablet"
                  >{{ $t("Galería") }}</a
                >
              </li>
              <li v-if="page.data.project.virtual_tour_rel.length">
                <a
                  v-scroll-to="{
                    el: '#recorridovirtual',
                    duration: 1000,
                    easing: 'ease',
                    offset: -50,
                  }"
                  href="#"
                  class="page-scroll no-tablet"
                  >{{ $t("Recorrido Virtual") }}</a
                >
              </li>
              <li>
                <a
                  v-scroll-to="{
                    el: '#ubicacion',
                    duration: 1000,
                    easing: 'ease',
                    offset: -50,
                  }"
                  href="#"
                  class="page-scroll no-tablet"
                  >{{ $t("Ubicación") }}</a
                >
              </li>
              <li v-if="page.data.project.files_rel.length">
                <a
                  v-scroll-to="{
                    el: '#documentos',
                    duration: 1000,
                    easing: 'ease',
                    offset: -50,
                  }"
                  href="#"
                  class="page-scroll no-tablet"
                  >{{ $t("Documentos") }}</a
                >
              </li>
              <li v-if="page.data.project.form_videocall">
                <nuxt-link
                  :to="
                    localePath({
                      name: 'online-appointment',
                      query: {
                        project: page.data.project['slug_' + $i18n.locale],
                      },
                    })
                  "
                >
                  {{ $t("Cita Online") }}
                </nuxt-link>
              </li>
              <li v-if="page.data.tipologies_count">
                <a
                  v-scroll-to="{
                    el: '#cotizar',
                    duration: 1000,
                    easing: 'ease',
                    offset: -50,
                  }"
                  href="#"
                  class="page-scroll btn btn2"
                  >{{ $t("Cotizar") }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="grid-proyecto-top">
        <div class="content-slider">
          <client-only>
            <div class="slider-proyecto owl-carousel owl-theme nav-absolute">
              <template v-for="(el, i) in page.data.project.images_format">
                <div class="item" :key="'sl' + el" v-if="i != 0 && i != 1">
                  <img
                    class="lazyload"
                    :data-src="storageUrl + '/img/projects/' + el"
                    :alt="'Slide ' + i"
                  />
                </div>
              </template>
            </div>
          </client-only>
        </div>

        <div class="aside-proyecto">
          <div class="head">
            <div class="logo">
              <img
                :alt="page.data.project['name_' + $i18n.locale] + ' Logo'"
                :data-src="
                  storageUrl + '/img/projects/' + page.data.project.logo
                "
                class="lazyload"
              />
            </div>
            <div class="status">
              {{ page.data.project.status_rel["name_" + $i18n.locale] }}
            </div>
          </div>
          <div class="content">
            <div class="caract">
              <div>
                <i class="flaticon-cama-matrimonial"> </i>
                {{ page.data.project["rooms_" + $i18n.locale] }}
              </div>
              <div>
                <i class="flaticon-blueprint"> </i>
                {{ page.data.project["footage_" + $i18n.locale] }}
              </div>
              <div>
                <i class="flaticon-ubicacion"> </i
                >{{ page.data.project.location }},
                {{ page.data.project.ubigeo_rel.district }} -
                {{ page.data.project.ubigeo_rel.department }}
              </div>
            </div>
            <div class="price">
              <b>{{ $t("Precios desde") }}:</b>
              <template v-if="page.data.project.price_total_foreign">
                <span>{{ page.data.project.price_total_foreign_format }}</span>
              </template>
              <template
                v-if="
                  !page.data.project.price_total_foreign &&
                  page.data.project.price_total
                "
              >
                <span>{{ page.data.project.price_total_format }}</span>
              </template>
            </div>
            <div class="financiamiento">
              <b>{{ $t("Financiamiento") }}:</b>
              <div class="img">
                <img
                  v-for="el in page.data.project.banks_rel"
                  :key="'ban' + el.id"
                  class="img--width-auto"
                  height="25"
                  :src="storageUrl + '/img/banks/' + el.logo"
                  :alt="el.name"
                />
              </div>
            </div>
            <div
              class="financiamiento"
              v-if="page.data.project.bonds_rel.length"
            >
              <b>{{ $t("Bonos") }}:</b>
              <div class="img">
                <img
                  :key="el.name"
                  v-for="el in page.data.project.bonds_rel"
                  :src="storageUrl + '/img/bonds/' + el.logo"
                  :alt="el.name"
                />
              </div>
            </div>
            <div v-if="page.data.tipologies_count">
              <a
                v-scroll-to="{
                  el: '#cotizar',
                  duration: 1000,
                  easing: 'ease',
                  offset: -50,
                }"
                href="#"
                class="page-scroll btn btn2"
                >{{ $t("Cotizar") }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="description" class="section description-proyect">
      <div class="container">
        <div class="content-text text-justify-p">
          <div>
            <div
              class="description--project"
              v-html="page.data.project['description_' + $i18n.locale]"
            ></div>
            <a
              :href="
                storageUrl + '/files/projects/' + page.data.project.brochure
              "
              target="_blank"
              class="btn"
              >Brochure</a
            >
          </div>
          <br /><br />
          <div>
            <div class="title">
              <h2>{{ $t("Atributos del proyecto") }}</h2>
            </div>
            <ul class="atributos">
              <li
                v-for="el in page.data.project.features_rel"
                :key="'feat' + el.id"
              >
                <div>
                  <img
                    class="lazyload"
                    :data-src="storageUrl + '/img/features/' + el.image"
                    :alt="el['name_' + $i18n.locale]"
                  />{{ el["name_" + $i18n.locale] }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="img-proyec-fachada card-video">
        <img
          class="lazyload"
          :data-src="storageUrl + '/img/projects/' + page.data.project.banner"
          :alt="'Fachada ' + page.data.project['name_' + $i18n.locale]"
        />
        <a
          v-if="page.data.project.url_video"
          class="fancybox"
          data-fancybox="Video"
          :href="page.data.project.url_video"
          ><i class="flaticon-boton-de-play"></i
        ></a>
      </div>
    </section>

    <section id="galeria" class="section" v-if="page.data.project.gallery_rel.length">
      <div class="container">
        <div class="title center">
          <h2>{{ page.data.project["text_place_" + $i18n.locale] }}</h2>
        </div>
        <template v-if="page.data.project.gallery_rel.length">
          <div class="tabs2 margin-botton">
            <a
              class="tablinks btn"
              :class="{
                active: Object.keys(page.data.project.typeGallery)[0] == i,
              }"
              :data-country="'s' + i"
              v-for="(el, i) in page.data.project.typeGallery"
              :key="'tab' + el"
            >
              {{ $t(el) }}
            </a>
          </div>
          <div class="wrapper_tabcontent">
            <div
              :id="'s' + i"
              class="tabcontent"
              :class="{
                active: Object.keys(page.data.project.typeGallery)[0] == i,
              }"
              v-for="(el, i) in page.data.project.typeGallery"
              :key="'wr' + i"
            >
              <div class="grid-galeria">
                <div
                  class="item"
                  v-for="(item, j) in page.data.project.galleryFilter[i]"
                  :key="'gallery' + item.id"
                  :class="{
                    'd-none': j > 4,
                    'gal-mas':
                      page.data.project.galleryFilter[i] &&
                      page.data.project.galleryFilter[i].length > 5 &&
                      j == 4,
                  }"
                >
                  <a
                    class="fancybox"
                    :data-fancybox="el"
                    :href="storageUrl + '/img/projects/gallery/' + item.image"
                  >
                    <img
                      class="lazyload"
                      :data-src="
                        storageUrl + '/img/projects/gallery/' + item.image
                      "
                      :alt="item['name_' + $i18n.locale]"
                    />
                    <div
                      class="titulo"
                      v-if="
                        page.data.project.galleryFilter[i] &&
                        page.data.project.galleryFilter[i].length > 5 &&
                        j == 4
                      "
                    >
                      <span
                        >+{{
                          page.data.project.galleryFilter[i].length - 4
                        }}</span
                      >
                      {{ $t("Ver galería") }}
                    </div>
                    <div class="titulo" v-else>
                      {{ item["title_" + $i18n.locale] }}
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>

    <section
      id="recorridovirtual"
      class="section section-recorrido"
      v-if="page.data.project.virtual_tour_rel.length"
    >
      <div class="container">
        <div class="title center color-white">
          <h2>{{ $t("Recorrido Virtual") }}</h2>
        </div>
        <div class="grid-recorrido">
          <div
            class="box-recorrido"
            v-for="el in page.data.project.virtual_tour_rel"
            :key="'vt' + el.id"
          >
            <div class="img card-video">
              <img
                class="lazyload"
                :data-src="
                  storageUrl + '/img/projects/virtual-tour/' + el.image
                "
                :alt="el.name"
              />
              <a
                class="fancybox"
                v-if="el.url_360 == false"
                data-fancybox="Recorrido Virtual"
                :href="el.url"
                ><i class="flaticon-boton-de-play"></i
              ></a>
              <a
                v-else
                class="fancybox"
                data-fancybox="Recorrido Virtual"
                data-type="iframe"
                :href="el.url"
                ><i class="flaticon-360-grados"></i
              ></a>
            </div>
            <h5>{{ el.name }}</h5>
          </div>
        </div>
      </div>
    </section>

    <section id="ubicacion" class="section-mapa">
      <div class="grid-col">
        <div class="grid-s-12 grid-m-12 grid-l-5">
          <div class="content-ubicacion text">
            <div class="title">
              <h2>{{ $t("Ubicación") }}</h2>
            </div>
            <div class="item-ubicacion line-bottom">
              <i class="flaticon-ubicacion"></i>
              <div>
                <p>
                  {{ page.data.project.location }} -
                  {{ page.data.project.ubigeo_rel.district }}
                </p>
                <div
                  v-if="page.data.project['map_indications_' + $i18n.locale]"
                  v-html="page.data.project['map_indications_' + $i18n.locale]"
                ></div>
              </div>
            </div>
            <div class="item-referencias line-bottom">
              <p>
                <b>{{ $t("Salas de ventas") }}:</b>
              </p>
              <div
                v-if="page.data.project['sales_room_' + $i18n.locale]"
                v-html="page.data.project['sales_room_' + $i18n.locale]"
              ></div>
              <p>
                <b>{{ $t("Horario de atención") }}:</b>
              </p>
              <div
                v-if="page.data.project['schedule_attention_' + $i18n.locale]"
                v-html="page.data.project['schedule_attention_' + $i18n.locale]"
              ></div>
            </div>
            <div class="grid-col">
              <div class="grid-s-12 grid-m-6 grid-l-6">
                <a
                  :href="page.data.project.url_google_maps"
                  target="_blank"
                  class="btn"
                  v-if="page.data.project.url_google_maps"
                  >{{ $t("Ir con") }} Maps <i class="flaticon-google-maps"></i
                ></a>
              </div>
              <div class="grid-s-12 grid-m-6 grid-l-6">
                <a
                  :href="page.data.project.url_waze"
                  class="btn"
                  target="_blank"
                  v-if="page.data.project.url_waze"
                  >{{ $t("Ir con") }} Waze <i class="flaticon-waze-1"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-s-12 grid-m-12 grid-l-7">
          <div class="mapa">
            <img
              v-if="page.data.project.iframe_map"
              class="lazyload"
              :data-src="
                storageUrl + '/img/projects/' + page.data.project.iframe_map
              "
              :alt="'Mapa ' + page.data.project['name_' + $i18n.locale]"
            />
          </div>
        </div>
      </div>
    </section>

    <section
      id="cotizar"
      class="section-cotiza blanco section"
      v-if="page.data.tipologies_count"
    >
      <transition name="slide-fade">
        <div v-if="quotationSuccess" key="true" class="form__text-success">
          <h3>
            <strong>¡{{ $t("Listo") }}!</strong>
          </h3>
          <p>{{ $t("Te contactaremos muy pronto") }}.</p>
        </div>
        <div v-else key="false">
          <form @submit.prevent="submitQuotation" id="quotationForm">
            <div class="container">
              <div class="title color-white">
                <h2>{{ $t("Cotiza aquí") }}</h2>
              </div>
              <div class="grid-cotizador color-white">
                <div class="item-select-proyect">
                  <div class="form-control">
                    <label for="topology"
                      >{{ $t("Selecciona el plano de interés") }}*</label
                    >
                    <select
                      name="topology"
                      id="topology"
                      class="form-control"
                      v-model="quotation.project_type_department_id"
                    >
                      <option
                        :value="el.id"
                        v-for="el in page.data.project.tipologies_rel"
                        :key="el.id"
                      >
                        {{ el.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="item-carousel-plano">
                  <label for="">{{ $t("Planos") }}</label>
                  <client-only>
                    <div class="planos-proyecto owl-carousel owl-theme">
                      <!--<template
                        v-for="(el, i) in page.data.project.tipologies_rel"
                      >-->
                        <!--<div class="item" v-if="el.available" :key="'ti' + i">-->
                          <div class="item"  v-for="(el, i) in page.data.project.tipologies_rel" :key="'ti' + i">
                          <div class="img-plano">
                            <a
                              class="fancybox"
                              data-fancybox="Planos"
                              :href="
                                storageUrl +
                                '/img/projects/tipologies/' +
                                el.image
                              "
                            >
                              <img
                                class="lazyload"
                                :data-src="
                                  storageUrl +
                                  '/img/projects/tipologies/' +
                                  el.image
                                "
                                :alt="el.name"
                              />
                            </a>
                          </div>
                          <div>
                            <h5>
                              {{ $t("Proyecto") }}
                              {{ page.data.project["name_" + $i18n.locale] }}
                            </h5>
                            <strong>{{ el.name }}</strong>
                          </div>
                        </div>
                      <!--</template>-->
                    </div>
                  </client-only>
                </div>
                <div class="item-from">
                  <div class="grid-col">
                    <div class="grid-s-12 grid-m-6 grid-l-6">
                      <div class="form-control">
                        <label for="name">{{ $t("Nombre") }}*</label>
                        <input type="text" id="name" v-model="quotation.name" />
                        <span
                          class="error"
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
                          v-model="quotation.document_number"
                        />
                        <span
                          class="error"
                          v-if="errors && errors.document_number"
                          for="document_number"
                          >{{ $t(errors.document_number[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12 grid-m-6 grid-l-6">
                      <div class="form-control">
                        <label for="phone">{{ $t("Teléfono") }}*</label>
                        <input
                          type="text"
                          id="phone"
                          v-model="quotation.mobile"
                        />
                        <span
                          class="error"
                          v-if="errors && errors.mobile"
                          for="mobile"
                          >{{ $t(errors.mobile[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12 grid-m-6 grid-l-6">
                      <div class="form-control">
                        <label for="email">{{ $t("Correo") }}*</label>
                        <input
                          type="text"
                          id="email"
                          v-model="quotation.email"
                        />
                        <span
                          class="error"
                          v-if="errors && errors.email"
                          for="email"
                          >{{ $t(errors.email[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12">
                      <div class="form-control">
                        <label for="message">{{ $t("Mensaje") }}*</label>
                        <textarea
                          name="message"
                          id="message"
                          v-model="quotation.message"
                          cols="30"
                          rows="5"
                        ></textarea>
                        <span
                          class="error"
                          v-if="errors && errors.message"
                          for="message"
                          >{{ $t(errors.message[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12">
                      <div class="form-control">
                        <input
                          v-model="quotation.accepted"
                          class="checkbox"
                          id="accepted"
                          type="checkbox"
                        />
                        <label for="accepted"
                          >{{ $t("He leído y acepto los") }}
                          <nuxt-link :to="localePath('terms-conditions')">{{
                            $t("Términos y Condiciones")
                          }}</nuxt-link>
                          {{ $t("y") }}
                          <nuxt-link :to="localePath('privacy-policies')">{{
                            $t("Políticas de privacidad")
                          }}</nuxt-link
                          >.</label
                        >
                        <span
                          class="error"
                          v-if="errors && errors.accepted"
                          for="accepted"
                          >{{ $t(errors.accepted[0]) }}</span
                        >
                      </div>
                    </div>
                    <div class="grid-s-12">
                      <button
                        type="submit"
                        :class="requestQuotation ? 'btn--opacity' : ''"
                        :disabled="requestQuotation"
                        class="btn btn2"
                      >
                        {{
                          requestQuotation
                            ? $t("Cargando") + "..."
                            : $t("Enviar")
                        }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </transition>
    </section>

    <section
      id="documentos"
      class="section section-documentos"
      v-if="page.data.project.files_rel.length"
    >
      <div class="container">
        <div class="grid-col">
          <div class="grid-s-12 grid-m-12 grid-l-3">
            <div class="title left">
              <h2>{{ $t("Documentos legales del proyecto") }}</h2>
            </div>
          </div>
          <div class="grid-s-12 grid-m-12 grid-l-9">
            <client-only>
              <div
                class="documentos-proyecto owl-carousel owl-theme margin-carousel"
              >
                <div
                  class="item"
                  v-for="el in page.data.project.files_rel"
                  :key="'fil' + el.id"
                >
                  <a :href="storageUrl + '/files/' + el.file" class="btn">{{
                    el["name_" + $i18n.locale]
                  }}</a>
                </div>
              </div>
            </client-only>
          </div>
        </div>
      </div>
    </section>

    <section
      class="bottom-section section-otros"
      v-if="page.data.projects.length"
    >
      <div class="container">
        <div class="grid-col">
          <div class="grid-s-12 grid-m-12 grid-l-3">
            <div class="aling-center">
              <div class="title left">
                <h2>{{ $t("Otros proyectos") }}</h2>
              </div>
              <nuxt-link :to="localePath('projects')" class="btn">{{
                $t("Ver más proyectos")
              }}</nuxt-link>
            </div>
          </div>
          <div class="grid-s-12 grid-m-12 grid-l-9">
            <client-only>
            <div class="otros-proyecto owl-carousel owl-theme margin-carousel">
              <div class="item" v-for="(pr, k) in page.data.projects" :key="k">
                <CardProject :el="pr.length ? pr[0] : pr"></CardProject>
              </div>
            </div>
            </client-only>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import CardProject from "../../components/projects/Card";
if (process.client) {
  require("owl.carousel");
  require("/static/js/jq.fancybox.min.js");
}
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.green.css";
import "/static/css/jq.fancybox.min.css";
export default {
  head() {
    return {
      htmlAttrs: {
        lang:
          this.$i18n.locale == "en"
            ? this.$i18n.locale + "_US"
            : this.$i18n.locale + "_PE",
      },
      title: this.page.data.project["seo_title_" + this.$i18n.locale]
        ? this.page.data.project["seo_title_" + this.$i18n.locale]
        : (this.$i18n.locale == "en" ? "Project" : "Proyecto") +
          " - " +
          this.page.data.project["name_" + this.$i18n.locale],
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page.data.project["seo_description_" + this.$i18n.locale]
            ? this.page.data.project["seo_description_" + this.$i18n.locale]
            : "",
        },
        {
          itemprop: "name",
          content: this.page.data.project["seo_title_" + this.$i18n.locale]
            ? this.page.data.project["seo_title_" + this.$i18n.locale]
            : (this.$i18n.locale == "en" ? "Project" : "Proyecto") +
              " - " +
              this.page.data.project["name_" + this.$i18n.locale],
        },
        {
          itemprop: "description",
          content: this.page.data.project["seo_description_" + this.$i18n.locale]
            ? this.page.data.project["seo_description_" + this.$i18n.locale]
            : "",
        },
        {
          itemprop: "image",
          content: this.page.data.project["seo_image"]
            ? process.env.STORAGE_URL +
              "/img/projects/" +
              this.page.data.project["seo_image"]
            : "",
        },
        {
          name: "keywords",
          content: this.page.data.project["seo_keywords_" + this.$i18n.locale]
            ? this.page.data.project["seo_keywords_" + this.$i18n.locale]
            : "",
        },
        { name: "og:url", content: process.env.BASE_URL + this.$route.path },
        { name: "og:type", content: "website" },
        {
          name: "og:title",
          content: this.page.data.project["seo_title_" + this.$i18n.locale]
            ? this.page.data.project["seo_title_" + this.$i18n.locale] 
            : (this.$i18n.locale == "en" ? "Project" : "Proyecto") +
              " - " +
              this.page.data.project["name_" + this.$i18n.locale],
        },
        {
          name: "og:description",
          content: this.page.data.project["seo_description_" + this.$i18n.locale]
            ? this.page.data.project["seo_description_" + this.$i18n.locale]
            : "",
        },
        {
          name: "og:image",
          content: this.page.data.project["seo_image"]
            ? process.env.STORAGE_URL +
              "/img/projects/" +
              this.page.data.project["seo_image"]
            : "",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: this.page.data.project["seo_title_" + this.$i18n.locale]
            ? this.page.data.project["seo_title_" + this.$i18n.locale]
            : (this.$i18n.locale == "en" ? "Project" : "Proyecto") +
              " - " +
              this.page.data.project["name_" + this.$i18n.locale],
        },
        {
          name: "twitter:description",
          content: this.page.data.project["seo_description_" + this.$i18n.locale]
            ? this.page.data.project["seo_description_" + this.$i18n.locale]
            : "",
        },
        {
          name: "twitter:image",
          content: this.page.data.project["seo_image"]
            ? process.env.STORAGE_URL +
              "/img/projects/" +
              this.page.data.project["seo_image"]
            : "",
        },
      ],
    };
  },
  components: {
    CardProject,
  },
  async validate({ params, $axios, app }) {
    const data = await $axios.$get("/api/page/projects/" + params.slug, {
      params: { locale: app.i18n.locale },
    });
    if (data.success) {
      return true;
    }
    return false;
  },
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/projects/" + params.slug, {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },
  data() {
    return {
      page: {},
      errors: {},
      requestQuotation: false,
      quotationSuccess: false,
      quotation: {},
      storageUrl: process.env.STORAGE_URL,
    };
  },
  methods: {
    restoreForm() {
      this.errors = {};
      this.quotation = {};
    },
    submitQuotation() {
      this.requestQuotation = true;
      this.quotation["project_id"] = this.page.data.project["id"];
      this.quotation["locale"] = this.$i18n.locale;
      this.$axios
        .$post("/api/post/quotation", this.quotation)
        .then((response) => {
          this.requestQuotation = false;
          this.quotationSuccess = true;
        })
        .catch((error) => {
          this.requestQuotation = false;
          if (error.response.status === 422) {
            this.errors = error.response.data.errors || {};
            return;
          }
        });
    },
  },
  created() {},
  mounted() {
    var tabLinks = document.querySelectorAll(".tablinks");
    var tabContent = document.querySelectorAll(".tabcontent");

    tabLinks.forEach(function (el) {
      el.addEventListener("click", openTabs);
    });

    function openTabs(el) {
      var btnTarget = el.currentTarget;
      var country = btnTarget.dataset.country;

      tabContent.forEach(function (el) {
        el.classList.remove("active");
      });

      tabLinks.forEach(function (el) {
        el.classList.remove("active");
      });

      document.querySelector("#" + country).classList.add("active");
      btnTarget.classList.add("active");
    }
    $(document).on("scroll", function () {
      if ($(document).scrollTop() > 550) {
        $(".header-proyectos").addClass("active");
      } else {
        $(".header-proyectos").removeClass("active");
      }
    });
    this.page.data.project.tipologies_rel.length
      ? (this.quotation.project_type_department_id = this.page.data.project.tipologies_rel[0].id)
      : "";
    $(document).ready(function () {
      $(".fancybox").fancybox();
      $(".documentos-proyecto").owlCarousel({
        loop: true,
        nav: true,
        autoplay: true,
        dots: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 2,
            margin: 20,
          },
          900: {
            items: 3,
            margin: 20,
          },
          1150: {
            items: 3,
            margin: 0,
          },
        },
      });
      $(".planos-proyecto.owl-carousel").owlCarousel({
        loop: true,
        nav: true,
        autoplay: true,
        dots: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        items: 1,
      });
      $(".slider-proyecto.owl-carousel").owlCarousel({
        loop: true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        items: 1,
      });
      $(".otros-proyecto").owlCarousel({
        nav: false,
        loop: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 2,
          },
          1025: {
            items: 2,
          },
        },
      });
    });
  },
  nuxtI18n: {
    paths: {
      en: "/projects/:slug",
      es: "/proyectos/:slug",
    },
  },
};
</script>