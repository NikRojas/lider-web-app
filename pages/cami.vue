<template>
  <main class="cami">
    <section
      class="banner"
      style="background-image: url(public/img/banners/banner-nosotros.jpg)"
    >
      <div class="container">
        <div class="text-center wow fadeIn" data-wow-delay="0.5s">
          <h1>Comunidad CAMI</h1>
        </div>
      </div>
    </section>

    <section class="section section-cami">
      <div class="container">
        <div class="grid-col">
          <div class="grid-s-12 grid-m-12 grid-l-6">
            <div class="content text-justify wow fadeInUp" data-wow-delay="1s">
              <img
                class="lazyload"
                v-if="page.data.cami && page.data.cami.logo"
                :data-src="storageUrl + '/img/cami/' + page.data.cami.logo"
                alt="Logo Cami"
              />
              <div class="max-lectura-movil">
                <h2
                  v-if="
                    page.data.cami && page.data.cami['title_' + $i18n.locale]
                  "
                >
                  <b>{{ page.data.cami["title_" + $i18n.locale] }}</b>
                </h2>
                <div
                  v-if="
                    page.data.cami &&
                    page.data.cami['description_' + $i18n.locale]
                  "
                  v-html="page.data.cami['description_' + $i18n.locale]"
                ></div>
              </div>
            </div>
          </div>
          <div
            class="grid-s-12 grid-m-12 grid-l-6"
            v-if="
              page.data.cami &&
              page.data.cami.images_format &&
              page.data.cami.images_format.length
            "
          >
            <div class="grid-col-2">
              <div class="gal1 card-video wow fadeInUp" data-wow-delay="1.4s">
                <img
                  :data-src="
                    storageUrl + '/img/cami/' + page.data.cami.images_format[0]
                  "
                  class="lazyload"
                />
                <a
                  v-if="page.data.cami && page.data.cami.url_video"
                  class="fancybox"
                  data-fancybox="Cami"
                  :href="page.data.cami.url_video"
                  ><i class="flaticon-boton-de-play"></i
                ></a>
              </div>
              <div class="gal2">
                <div
                  class="wow fadeInUp"
                  :data-wow-delay="1.2 + i * 0.2 + 's'"
                  v-for="(el, i) in page.data.cami.images_format"
                  :key="i"
                >
                  <img
                    v-if="i != 0"
                    :data-src="storageUrl + '/img/cami/' + el"
                    class="lazyload"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-tab">
      <div class="">
        <div class="container">
          <div class="title center wow fadeInUp">
            <h2
              v-if="
                page.data.cami &&
                page.data.cami['title_projects_' + $i18n.locale]
              "
            >
              {{ page.data.cami["title_projects_" + $i18n.locale] }}
            </h2>
          </div>
          <!-- Tab links -->
          <div
            class="tabs2 margin-botton wow fadeInUp"
            v-if="page.data.cami_elements.length"
          >
            <a
              class="tablinks btn"
              :class="{ 'active':  page.data.cami_elements[0].id == el.id }"
              :data-country="'s' + el.id"
              v-for="el in page.data.cami_elements"
              :key="'ca' + el.id"
            >
              {{ el["name_" + $i18n.locale] }}
            </a>
            <!--<a class="tablinks btn" data-country="s5"> Gestión Comunitaria </a>-->
          </div>
        </div>
        <div class="wrapper_tabcontent" v-if="page.data.cami_elements.length">
          <div :class="{ 'active':  page.data.cami_elements[0].id == el.id }" :id="'s'+el.id" class="tabcontent" v-for="el in page.data.cami_elements" :key="'wa'+el.id">
            <div class="section-cami-tab">
              <div class="grid-col">
                <div class="grid-s-12 grid-m-12 grid-l-5">
                  <div class="content wow fadeInLeft">
                    <h3><b>{{ el["name_" + $i18n.locale] }}</b></h3>
                    <div v-html="el['description_' + $i18n.locale]"></div>
                  </div>
                </div>
                <div class="grid-s-12 grid-m-12 grid-l-7 wow fadeInRight">
                  <h4 class="titulo-cami-carousel">
                    <b>{{ el["title_elements_" + $i18n.locale] }}</b>
                  </h4>
                  <div class="carousel-sociocultural" v-if="el['elements_' + $i18n.locale+'_format']">
                    <div class="item" v-for="item in el['elements_' + $i18n.locale+'_format']" :key="item.icon">
                      <div class="card-cultura">
                        <div class="content-cultura">
                          <img  class="lazyload" :data-src="storageUrl+'/img/cami-elements/'+item.file"  />
                          <div class="text" v-html="item['description_'+$i18n.locale]">
                          </div>
                        </div>
                        <div class="titulo">
                          <img class="lazyload" :data-src="storageUrl+'/img/cami-elements/'+item.icon"  />
                          <h5><b>{{ item['title_'+$i18n.locale]}}</b></h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="grid-s-12 grid-m-12 grid-l-5">
                  <div class="img2 card-video wow fadeInLeft">
                    <img class="lazyload" :data-src="storageUrl+'/img/cami-elements/'+el.image" :alt="el['name_' + $i18n.locale]" />
                    <a class="fancybox" v-if="el.url_video" data-fancybox="Cami" :href="el.url_video"
                      ><i class="flaticon-boton-de-play"></i
                    ></a>
                  </div>
                </div>
                <div class="grid-s-12 grid-m-12 grid-l-7" v-if="el['description_video_' + $i18n.locale]">
                  <div class="content wow fadeInRight" v-html="el['description_video_' + $i18n.locale]">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--
          <div id="s20" class="tabcontent active">
            <div class="section-cami-tab">
              <div class="grid-col">
                <div class="grid-s-12 grid-m-12 grid-l-5">
                  <div class="content wow fadeInLeft">
                    <h3><b>Desarrollo Sociocultural</b></h3>
                    <p>
                      Fomenta y promueve entre los niños, adolescentes y adultos
                      la práctica de valores para una sana convivencia, el uso
                      adecuado del tiempo libre, la revaloración del juego y el
                      fortalecimiento de las relaciones humanas a través del
                      <b
                        >desarrollo de actividades lúdicas, recreativas y
                        artísticas.</b
                      >
                    </p>
                  </div>
                </div>
                <div class="grid-s-12 grid-m-12 grid-l-7 wow fadeInRight">
                  <h4 class="titulo-cami-carousel">
                    <b>Metodología de animación sociocultural:</b>
                  </h4>
                  <div class="carousel-sociocultural owl-carousel owl-theme">
                    <div class="item">
                      <div class="card-cultura">
                        <div class="content-cultura">
                          <img src="public/img/cami/desarrollo1.png" alt="" />
                          <div class="text">
                            <p>
                              Promovemos la participación activa de los
                              residentes en las actividades desarrolladas por
                              CAMI para hacer del condominio un lugar acogedor
                              para todos.
                            </p>
                          </div>
                        </div>
                        <div class="titulo">
                          <img src="public/img/cami/icon/3.png" alt="" />
                          <h5><b>Espacios Acogedores</b></h5>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="card-cultura">
                        <div class="content-cultura">
                          <img src="public/img/cami/desarrollo1.png" alt="" />
                          <div class="text">
                            <p>
                              Fomentamos la revaloración del juego y la
                              recreación como un derecho importante para el
                              desarrollo integral de las personas.
                            </p>
                          </div>
                        </div>
                        <div class="titulo">
                          <img src="public/img/cami/icon/1.png" alt="" />
                          <h5><b>Sensibilización</b></h5>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="card-cultura">
                        <div class="content-cultura">
                          <img src="public/img/cami/desarrollo1.png" alt="" />
                          <div class="text">
                            <p>
                              Facilitamos espacios de reflexión y orientación a
                              los padres sobre temas relacionados con el
                              desarrollo de sus hijos.
                            </p>
                          </div>
                        </div>
                        <div class="titulo">
                          <img src="public/img/cami/icon/2.png" alt="" />
                          <h5><b>Encuentros</b></h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="grid-s-12 grid-m-12 grid-l-5">
                  <div class="img2 card-video wow fadeInLeft">
                    <img src="public/img/cami/video2.png" alt="" />
                    <a data-fancybox="cami" href="https://youtu.be/NxhkIBOUJgg"
                      ><i class="flaticon-boton-de-play"></i
                    ></a>
                  </div>
                </div>
                <div class="grid-s-12 grid-m-12 grid-l-7">
                  <div class="content wow fadeInRight">
                    <p>
                      Cuenta con un espacio físico acogedor en
                      <b
                        >cada condominio a cargo de una monitora de desarrollo
                        socio cultural,</b
                      >
                      quien en coordinación con los especialistas de los
                      diversos talleres, desarrollan las distintas actividades
                      artísticas, deportivas y recreativas.
                    </p>
                    <p>
                      Por su carácter formativo y de sensibilización, apunta a
                      la construcción de ciudadanía en base a la práctica de
                      valores y el reconocimiento del otro, al respeto mutuo y
                      de las normas. Así se generan espacios acogedores de
                      comunicación e integración entre las personas, lo cual se
                      refleja en las buenas relaciones entre vecinos,
                      <b
                        >la comunicación y organización; como también en el
                        cuidado del condominio y sus áreas comunes.</b
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          -->
        </div>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  head: {
    link: [{ rel: "stylesheet", href: "/css/jq.fancybox.min.css" }],
    script: [{ src: "/js/jq.min.js" }, { src: "/js/jq.fancybox.min.js" }],
  },
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/cami", {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },
  data() {
    return {
      page: {
        cami: {},
      },
      storageUrl: process.env.STORAGE_URL,
    };
  },
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
    $(".fancybox").fancybox();
  },
};
</script>