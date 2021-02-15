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
                  >{{$t("Descripción")}}</a
                >
              </li>
              <li>
                <a
                  v-scroll-to="{
                    el: '#galeria',
                    duration: 1000,
                    easing: 'ease',
                    offset: -50,
                  }"
                  href="#"
                  class="page-scroll no-tablet"
                  >{{$t("Galería")}}</a
                >
              </li>
              <li>
                <a
                  v-scroll-to="{
                    el: '#recorridovirtual',
                    duration: 1000,
                    easing: 'ease',
                    offset: -50,
                  }"
                  href="#"
                  class="page-scroll no-tablet"
                  >{{$t("Recorrido Virtual")}}</a
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
                  >{{$t("Ubicación")}}</a
                >
              </li>
              <li>
                <a
                  v-scroll-to="{
                    el: '#documentos',
                    duration: 1000,
                    easing: 'ease',
                    offset: -50,
                  }"
                  href="#"
                  class="page-scroll no-tablet"
                  >{{$t("Documentos")}}</a
                >
              </li>
              <li v-if="page.data.project.form_videocall">
                <nuxt-link :to="localePath({ name: 'online-appointment', query: { project: page.data.project['slug_'+$i18n.locale] } })">
                  {{$t("Cita Online")}}
                </nuxt-link>
              </li>
              <li>
                <a
                  v-scroll-to="{
                    el: '#cotizar',
                    duration: 1000,
                    easing: 'ease',
                    offset: -50,
                  }"
                  href="#"
                  class="page-scroll btn btn2"
                  >{{$t("Cotizar")}}</a
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
            <carousel
              loop
              nav
              :items="1"
              autoplay
              :autoplayTimeout="5000"
              :autoplayHoverPause="false"
            >
              <div
                class="item"
                v-for="(el, i) in page.data.project.images_format"
                :key="'sl' + el"
              >
                <img
                  class="lazyload"
                  :data-src="storageUrl + '/img/projects/' + el"
                  :alt="'Slide ' + i"
                />
              </div>
            </carousel>
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
              <b>{{$t("Precios desde")}}:</b>
              <span>$ 126,925.00</span>
            </div>
            <div class="financiamiento">
              <b>{{$t("Financiamiento")}}:</b>
              <div class="img">
                <img
                  v-for="el in page.data.project.banks_rel"
                  :key="'ban' + el.id"
                  :src="storageUrl + '/img/banks/' + el.logo"
                  :alt="el.name"
                />
              </div>
            </div>
            <div
              class="financiamiento"
              v-if="page.data.project.bonds_rel.length"
            >
              <b>{{$t("Bonos")}}:</b>
              <div class="img">
                <img
                  :key="el.name"
                  v-for="el in page.data.project.bonds_rel"
                  :src="storageUrl + '/img/bonds/' + el.logo"
                  :alt="el.name"
                />
              </div>
            </div>
            <div>
              <a
                v-scroll-to="{
                  el: '#cotizar',
                  duration: 1000,
                  easing: 'ease',
                  offset: -50,
                }"
                href="#"
                class="page-scroll btn btn2"
                >{{$t("Cotizar")}}</a
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
            <h2>
              <b
                >FALTA VER ESTO EN BASE Un condominio seguro sin perder el sabor
                del barrio</b
              >
            </h2>
            <!--<p>
              Diseñado pensando en los más pequeños del hogar: áreas comunes y
              parques que rodean el condominio pueden ser vistos desde la
              comodidad de tu departamento, estacionamientos en sótanos para
              mayor seguridad y plaza interna con bancas y jardines crean el
              lugar ideal para una vida plena y tranquila.
            </p>-->
            <div
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
              <h2>{{$t("Atributos del proyecto")}}</h2>
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
      <div class="img-proyec-fachada">
        <img
          class="lazyload"
          :data-src="storageUrl + '/img/projects/' + page.data.project.banner"
          :alt="'Fachada ' + page.data.project['name_' + $i18n.locale]"
        />
      </div>
    </section>

    <section id="galeria" class="section">
      <div class="container">
        <div class="title center">
          <h2>{{ page.data.project["text_place_" + $i18n.locale] }}</h2>
        </div>
        <template v-if="page.data.project.gallery_rel.length">
          <div class="tabs2 margin-botton">
            <a
              class="tablinks btn"
              :class="{ 'active':  Object.keys(page.data.project.typeGallery)[0] == i }"
              :data-country="'s'+i"
              v-for="(el, i) in page.data.project.typeGallery"
              :key="'tab' + el"
            >
              {{ $t(el) }}
            </a>
          </div>
          <div class="wrapper_tabcontent">
            <div
              :id="'s'+i"
              class="tabcontent"
              :class="{ 'active':  Object.keys(page.data.project.typeGallery)[0] == i }"
              v-for="(el, i) in page.data.project.typeGallery"
              :key="'wr' + i"
            >
              <div class="grid-galeria">
                <div
                  class="item"
                  v-for="item in page.data.project.galleryFilter[i]"
                  :key="'gallery' + item.id"
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
                    <div class="titulo">
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
          <h2>{{$t("Recorrido Virtual")}}</h2>
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
              <h2>{{$t("Ubicación")}}</h2>
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
              <p><b>{{$t("Salas de ventas")}}:</b></p>
              <div
                v-if="page.data.project['sales_room_' + $i18n.locale]"
                v-html="page.data.project['sales_room_' + $i18n.locale]"
              ></div>
              <p><b>{{$t("Horario de atención")}}:</b></p>
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
                  >{{$t("Ir con")}} Maps <i class="flaticon-google-maps"></i
                ></a>
              </div>
              <div class="grid-s-12 grid-m-6 grid-l-6">
                <a
                  :href="page.data.project.url_waze"
                  class="btn"
                  target="_blank"
                  v-if="page.data.project.url_waze"
                  >{{$t("Ir con")}} Waze <i class="flaticon-waze-1"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
        <div class="grid-s-12 grid-m-12 grid-l-7">
          <div class="mapa">
            <img src="public/img/proyectos/mapa1.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>

    <section
      id="cotizar"
      class="section-cotiza blanco section"
      v-if="page.data.project.tipologies_rel.length"
    >
      <transition name="slide-fade">
        <div v-if="quotationSuccess" key="true" class="form__text-success">
          <h3>
            <strong>¡{{$t('Listo')}}!</strong>
          </h3>
          <p>{{ $t('Te contactaremos muy pronto')}}.</p>
        </div>
        <form
          v-else
          key="false"
          @submit.prevent="submitQuotation"
          id="quotationForm"
        >
          <div class="container">
            <div class="title color-white">
              <h2>{{$t('Cotiza aquí')}}</h2>
            </div>
            <div class="grid-cotizador color-white">
              <div class="item-select-proyect">
                <div class="form-control">
                  <label for="topology">{{$t('Selecciona el plano de interés')}}*</label>
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
                <label for="">{{$t('Planos')}}</label>
                <div class="planos-proyecto owl-carousel owl-theme">
                   <div
                      class="item"
                      v-for="(el, i) in page.data.project.tipologies_rel"
                      :key="'ti' + el"
                    >
                      <div class="img-plano">
                        <a
                          class="fancybox"
                          data-fancybox="Planos"
                          :href="
                            storageUrl + '/img/projects/tipologies/' + el.image
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
                          {{$t('Proyecto')}}
                          {{ page.data.project["name_" + $i18n.locale] }}
                        </h5>
                        <strong>{{ el.name }}</strong>
                      </div>
                    </div>
                </div>
              </div>
              <div class="item-from">
                <div class="grid-col">
                  <div class="grid-s-12 grid-m-6 grid-l-6">
                    <div class="form-control">
                      <label for="name">{{ $t("Nombre")}}*</label>
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
                      <label for="phone">{{ $t("Teléfono")}}*</label>
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
                      <label for="email">{{ $t("Correo")}}*</label>
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
                      <label for="message">{{ $t("Mensaje")}}*</label>
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
                        >{{ $t('He leído y acepto los')}} <a>{{ $t('Términos y Condiciones')}}</a> {{ $t('y')}}
                        <a>{{ $t('Políticas de privacidad')}}</a>.</label
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
                    <button type="submit" :class="requestQuotation ? 'btn--opacity' : ''" :disabled="requestQuotation" form="quotationForm" class="btn btn2">
                      {{ requestQuotation ? $t("Cargando")+"..." : $t("Enviar") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
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
              <h2>{{ $t('Documentos legales del proyecto')}}</h2>
            </div>
          </div>
          <div class="grid-s-12 grid-m-12 grid-l-9">
            <div class="documentos-proyecto owl-carousel owl-theme margin-carousel">
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
                <h2>{{ $t('Otros proyectos')}}</h2>
              </div>
              <nuxt-link :to="localePath('projects')" class="btn"
                >{{ $t('Ver más proyectos')}}</nuxt-link
              >
            </div>
          </div>
          <div class="grid-s-12 grid-m-12 grid-l-9">
            <div class="otros-proyecto owl-carousel owl-theme margin-carousel">
              <div
                  class="item"
                  v-for="(pr,k) in page.data.projects"
                  :key="k"
                >
                  <CardProject :el="pr.length ? pr[0] : pr"></CardProject>
                </div>
            </div>
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
  head: {
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
        $('.documentos-proyecto').owlCarousel({
            loop:true,
            nav:true,
            autoplay:true,
            dots: false,
            autoplayTimeout:5000,
            autoplayHoverPause:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2,
                    margin:20
                },
                900:{
                    items:3,
                    margin:20
                },
                1150:{
                    items:3,
                    margin:0
                }
            }
          });
        $('.otros-proyecto').owlCarousel({
            nav:true,
            loop:false,
            dots: false,
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1025:{
                    items:2
                }
            }
          });
          $('.planos-proyecto').owlCarousel({
            loop:true,
            nav:true,
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true,
            items:1
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