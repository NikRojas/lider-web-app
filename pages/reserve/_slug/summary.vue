<template>
  <main class="reserve-your-property">
    <Loading :loading="requestPayment" />
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
    <section class="section">
      <div>
        <Steps active="summary" />

        <div class="viewport full-width-container">
          <div class="sized-container">
            <div class="title center">
              <h2>{{ $t("Resumen de separación") }}</h2>
            </div>
            <div class="grid-col">
              <div class="grid-s-12" v-if="requestAvailable">
                <div
                  class="
                    content-bg
                    text-center
                    margin-bottom
                    content-disponible
                  "
                >
                  <div class="load-3">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                  </div>
                  <h4><b>{{ $t("Obteniendo Disponibilidad") }}</b></h4>
                </div>
              </div>
              <div class="grid-s-12">
                <div class="content-bg">
                  <h5>
                    <b>{{ $t("Datos del inmueble") }}</b>
                  </h5>
                  <div class="grid-col">
                    <div class="grid-s-12 grid-m-4 grid-l-3">
                      <a
                        data-fancybox
                        class="fancybox"
                        :href="
                          page.data.isPackage && page.data.department.data_package.image ?
                          storageUrl + '/img/projects/combos/' + page.data.department.data_package.image  :
                            page.data.department.image ? 
                              storageUrl + '/img/projects/estates/' + page.data.department.image : 
                            page.data.department.tipology_rel.image ? 
                            storageUrl + '/img/projects/tipologies/' + page.data.department.tipology_rel.image : 
                            require('~/assets/img/p-no-data.png')
                        "
                      > 
                        <img
                          v-if="page.data.isPackage && page.data.department.data_package.image"
                          class="plano lazyload"
                          :data-src="
                            storageUrl +
                            '/img/projects/combos/' +
                            page.data.department.data_package.image
                          "
                          :alt="
                            $t('Plano') + ' ' + page.data.department.description
                          "
                        />
                        <img
                          v-else-if="page.data.department.image"
                          class="plano lazyload"
                          :data-src="
                            storageUrl +
                            '/img/projects/estates/' +
                            page.data.department.image
                          "
                          :alt="
                            $t('Plano') + ' ' + page.data.department.description
                          "
                        />
                        <img
                          v-else-if="page.data.department.tipology_rel.image"
                          class="plano lazyload"
                          :data-src="
                            storageUrl +
                            '/img/projects/tipologies/' +
                            page.data.department.tipology_rel.image
                          "
                          :alt="$t('Plano') + ' ' + page.data.department.description"
                        />
                        <img
                          v-else
                          class="lazyload"
                          :data-src="require('~/assets/img/p-no-data.png')"
                          :alt="
                            $t('Plano') + ' ' + page.data.department.description
                          "
                        />
                      </a>
                    </div>
                    <div class="grid-s-12 grid-m-8 grid-l-9">
                      <img
                        :data-src="
                          storageUrl +
                          '/img/projects/' +
                          page.data.department.project_rel.logo_colour
                        "
                        :alt="
                          $t('Proyecto') +
                          ' ' +
                          page.data.department.project_rel[
                            'name_' + $i18n.locale
                          ]
                        "
                        class="logo lazyload"
                      />
                      <div class="caract-grid">
                        <div class="" v-if="page.data.department.description" :class="page.data.department.data_package && page.data.department.data_package.departments_rel && page.data.department.data_package.departments_rel.length ? 'col-width-100' : ''">
                          <b>{{ $t("Descripción") }}:</b>
                          <p class="mb-0">
                            <strong class="d-block">{{ page.data.department.description}}</strong>
                            <template v-if="page.data.isPackage && page.data.department.data_package && page.data.department.data_package.departments_rel && page.data.department.data_package.departments_rel.length">
                              <template v-if="page.data.department.parkings && page.data.department.parkings.length">
                                <span class="d-block">ESTACIONAMIENTO(S) <span v-for="(pack, key) in page.data.department.parkings" :key="'packdes'+pack.id">{{ pack.parking_text_format }}<template v-if="key+1 != page.data.department.parkings.length && page.data.department.parkings.length > 0">, </template>
                                  </span> </span>
                              </template>
                              <template v-if="page.data.department.warehouses && page.data.department.warehouses.length">
                                <span class="d-block">DEPÓSITO(S) <span v-for="(pack, key) in page.data.department.warehouses" :key="'packware'+pack.id">{{ pack.warehouse_text_format }}<template v-if="key+1 != page.data.department.warehouses.length && page.data.department.warehouses.length > 0">, </template></span> </span>
                              </template>
                            </template> 
                          </p>
                        </div>
                        <div class="">
                          <b>{{ $t("Ubicación") }}:</b>
                          <p>
                            {{
                              page.data.department.project_rel.ubigeo_rel
                                .district
                            }}
                          </p>
                        </div>
                        <div class="">
                          <b>{{ $t("Estatus") }}:</b>
                          <p>
                            {{
                              page.data.department.project_rel.status_rel[
                                "name_" + $i18n.locale
                              ]
                            }}
                          </p>
                        </div>
                        <div
                          class=""
                          v-if="
                            page.data.department.type_department_id &&
                            page.data.department.tipology_rel &&
                            page.data.department.tipology_rel
                              .parent_type_department_id
                          "
                        >
                          <b>{{ $t("Tipo") }}:</b>
                          <p>
                            {{
                              page.data.department.tipology_rel
                                .parent_type_department_rel.name
                            }}
                          </p>
                        </div>
                        <div class="">
                          <b>{{ $t("Metraje") }}:</b>
                          <p>{{ page.data.isPackage ? page.data.department.area_format_package : page.data.department.area_format }}m2</p>
                        </div>
                        <div
                          class=""
                          v-if="
                            page.data.department.type_department_id &&
                            page.data.department.tipology_rel &&
                            page.data.department.tipology_rel.room
                          "
                        >
                          <b>{{ $t("Dormitorios") }}:</b>
                          <p>{{ page.data.department.tipology_rel.room }}</p>
                        </div>
                        <div class="">
                          <b> {{ $t("Vista") }}:</b>
                          <p>{{ page.data.department.view_rel.name }}</p>
                        </div>
                        <div class="">
                          <b>{{ $t("Piso") }}:</b>
                          <p>
                            {{ page.data.department.floor }}° {{ $t("piso") }}
                          </p>
                        </div>
                        <div class="">
                          <b>{{ $t("Precio total") }}:</b>
                          <p>
                            <strong
                              ><template
                                v-if="page.data.department.project_rel.master_currency_id == 1"
                              >
                                {{ page.data.isPackage ? page.data.department.price_package_format : page.data.department.price_format }}
                              </template>
                              <template
                                v-else-if="page.data.department.project_rel.master_currency_id == 2"
                              >
                                {{ page.data.isPackage ? page.data.department.price_foreign_package_format : page.data.department.price_foreign_format }}
                              </template></strong
                            >
                          </p>
                        </div>
                        <div class="" v-if="page.data.department.project_rel">
                          <b>{{ $t("Monto de Separación") }}:</b>
                          <p>
                            <strong>
                              {{
                                page.data.department.project_rel
                                  .price_separation_format
                              }}
                            </strong>
                          </p>
                        </div>
                      </div>
                      <!--<div v-if="page.data.department.project_rel.reservation_in_package" v-html="page.data.department.project_rel.package_description"  class="mt-2">
                      </div>
                      <div v-else>
                        <div v-if="page.data.department.project_rel.has_parking || page.data.department.project_rel.has_warehouse">
                            <i>
                            <template v-if="page.data.department.project_rel.has_parking && page.data.department.project_rel.stock_parking == 0 &&
                            page.data.department.project_rel.has_warehouse && page.data.department.project_rel.stock_warehouse == 0">
                                * El proyecto no cuenta con estacionamientos ni depósitos disponibles
                            </template>
                            <template v-else>
                              {{ page.data.department.project_rel.has_parking || page.data.department.project_rel.has_warehouse ? '* El proyecto cuenta con' : '' }} 
                              {{ page.data.department.project_rel.has_parking ? page.data.department.project_rel.stock_parking+' estacionamientos' : ''}} 
                              {{ page.data.department.project_rel.has_parking && page.data.department.project_rel.has_warehouse ? 'y' : ''}} 
                              {{ page.data.department.project_rel.has_warehouse ? page.data.department.project_rel.stock_warehouse+' depósitos' : ''}} disponibles
                            </template>
                            </i>
                        </div>
                      </div>-->
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="Object.entries(customerGlobal).length === 0" class="grid-s-12"></div>
              <div class="grid-s-12" v-else>
                <div class="content-bg">
                  <h5>
                    <b>{{ $t("Datos de la persona a reservar") }}</b>
                  </h5>

                  <div class="grid-col">
                    <div class="grid-s-12 grid-m-4 grid-l-2">
                      <b>{{ $t("Nombre") }}:</b>
                      <p>
                        {{ customerGlobal.name }} {{ customerGlobal.lastname }}
                        {{ customerGlobal.lastname_2 }}
                      </p>
                    </div>
                    <div class="grid-s-12 grid-m-4 grid-l-2">
                      <b>{{ customerGlobal.type_document_id }}:</b>
                      <p>{{ customerGlobal.document_number }}</p>
                    </div>
                    <div class="grid-s-12 grid-m-4 grid-l-2">
                      <b>{{ $t("Teléfono") }}:</b>
                      <p>{{ customerGlobal.mobile }}</p>
                    </div>
                    <div class="grid-s-12 grid-m-4 grid-l-2">
                      <b>{{ $t("Correo") }}:</b>
                      <p>{{ customerGlobal.email }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid-s-12"  v-if="!noAvailable">
                <div class="text-center movil-padding">
                  <p>
                    {{
                      $t(
                        "Para garantizar su seguridad todas nuestras transacciones son encriptadas."
                      )
                    }}
                  </p>
                  <!--<div class="monto">
                    {{ $t("Número de orden") }}: <b>{{ customerGlobal.oi }} </b>
                  </div>-->
                  <div class="grid-center">
                    <nuxt-link
                      class="btn btn1 previous"
                      :to="
                        localePath({
                          name: 'reserve-slug',
                          params: { slug: $route.params.slug },
                          query: { ...$route.query, adv: $route.query.adv },
                        })
                      "
                      >{{ $t("Editar datos") }}</nuxt-link
                    >
                    <div id="payfo"></div>
                  </div>
                </div>
              </div>
              <div class="grid-s-12 text-center"  v-if="!noAvailable">
                <p>
                  <strong>{{ $t("Nota") }}:</strong>
                </p>
                <p>
                  {{
                    $t(
                      'Haga click en el botón "Pagar" y se mostrará un formulario para que introduzca los datos de su tarjeta.'
                    )
                  }}
                </p>
                <p>
                  {{
                    $t(
                      "Esta ventana se cerrará automáticamente luego de 5 minutos."
                    )
                  }}
                </p>
              </div>
              <div class="grid-s-12" v-else>
                <div class="content-bg text-center pady-3">
                  <h4>{{ $t("El inmueble ya no está disponible") }}.</h4>
                      <nuxt-link
                        style="display:inline-block"
                        class="btn"
                        @click.native="clearData"
                        :to="localePath({ name: 'reserve' })"
                      >
                        {{ $t("Cambiar inmueble") }}
                      </nuxt-link>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style lang="scss">
.kr-popin-utils {
  .kr-popin-button {
    background-color: #f15f23 !important;
    border: 2px solid #f15f23 !important;
    color: #fff !important;
    max-width: 320px !important;
    margin: 8px !important;
    width: 185px !important;
    padding: 16px 28px !important;
    span {
      font-weight: bold !important;
    }
    height: inherit !important;
    padding: 16px 28px;
    display: flex;
    grid-gap: 6px;
    gap: 6px;
    font-size: 0.875rem;
    text-align: center;
    transition: 0.3s;
    cursor: pointer;
    justify-content: center;
    background: none;
    align-items: center;
    -webkit-align-items: center;
  }
}
.kr-embedded {
  padding-bottom: 50px !important;
  background-color: #eeeeee !important;
  .kr-payment-button {
    background-color: #f15f23 !important;
    color: #fff !important;
  }
  .kr-popin-modal-header {
    border-bottom: 0 !important;
    .kr-header-logo{
        background-size: cover;
        box-sizing: border-box;
        width: 74px;
        height: 74px;
        padding: 74px 74px 0 0;
        background-position: center;
        background-image:  url("~@/assets/img/izipay.jpg");
    }
  }
  .kr-popin-modal-header-background{
    background: #eeeeee !important;
  }

  .kr-popin-modal-footer,
  .kr-first-installment-delay {
    display: none !important;
  }
}
</style>
<script>
if (process.client) {
  require("/static/js/jq.fancybox.min.js");
}
import "/static/css/jq.fancybox.min.css";
import Banner from "../../../components/Banner";
import Steps from "../../../components/payment/Steps";
import Loading from "../../../components/payment/Loading";
import KRGlue from "@lyracom/embedded-form-glue";
export default {
  name: "ReserveSlugSummary",
  head() {
    return {
      meta: [{ hid: "robots", name: "robots", content: "noindex, nofollow" }],
      script: [
        {
          src: "https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/classic.js",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/classic-reset.css",
        },
      ],
    };
  },
  components: {
    Banner,
    Steps,
    Loading,
  },
  nuxtI18n: {
    paths: {
      es: "/separa-tu-depa/:slug/resumen",
      en: "/reserve-your-department/:slug/summary",
    },
  },
  async validate({ params, $axios, app, store, redirect }) {
    const data = await $axios.$get("/api/page/reserve/summary/" + params.slug, {
      params: { locale: app.i18n.locale },
    });
    if (data.success) {
      return true;
    }
    return false;
  },
  async asyncData({ params, $axios, app, store, redirect }) {
    let { data } = await $axios.get(
      "/api/page/reserve/summary/" + params.slug,
      {
        params: { locale: app.i18n.locale },
      }
    );
    return { page: data };
  },
  data() {
    return {
      requestPayment: false,
      page: {},
      storageUrl: process.env.STORAGE_URL,
      requestSubmit: false,
      endpoint: process.env.KRGLUE_URL,
      timer: "",
      requestAvailable: false,
      noAvailable: false,
      departmentUpdated: false,
      departmentAvailable: {},
    };
  },
  methods: {
    clearData() {
      this.$store.dispatch("setExpireLS", null);
      this.$store.dispatch("setCustomer", {});
    },
    setExpireLS(ttl) {
      if (!this.expireLS) {
        const now = new Date();
        this.$store.dispatch("setExpireLS", now.getTime() + ttl);
      }
    },
    checkExpireLS() {
      const item = this.expireLS;
      if (!item) {
        return null;
      }
      const now = new Date();
      if (now.getTime() > item) {
        this.$store.dispatch("setExpireLS", null);
        this.$store.dispatch("setCustomer", {});
        this.$router.push(
          this.localePath({
            name: "reserve",
            query: { timeout: true },
          })
        );
      }
    },
    handleError(event) {
      var code = event.errorCode;
      var message = event.errorMessage;
      var myMessage = code + ": " + message;
      //console.log(event);
      console.log('pe');
      //console.log(event.detailedErrorMessage);
      //El formulario ha caducado
      //event.errorCode = PSP_108
      //ACQ_001: Pago rechazado
      //detailedErrorCode: "51"
      //detailedErrorMessage: "Fondos insuficientes o límite de crédito excedido"
      this.$store.dispatch("setErrorMessage", event.detailedErrorMessage);
      //alert(myMessage);
    },
    pay(event) {
      console.log("p");
      //console.log(event);
      if (event.clientAnswer.orderStatus === "PAID") {
        // Remove the payment form
        KR.removeForms();
        // Show success message
        this.$router.push(
          this.localePath({
            name: "reserve-success",
          })
        );
      } else {
        //console.log(KR);
        // Show error message to the user
        KR.removeForms();
        this.$router.push(
          this.localePath({
            name: "reserve-error",
          })
        );
      }
    },
    checkout() {
      this.$axios
        .$post("/api/reserve/payment/init", this.customerGlobal)
        .then((response) => {
          this.requestPayment = false;
          if (response.data.t) {
            this.generateForm(response.data.t, response.data.j, response.data.currency);
          }
        })
        .catch((error) => {
          //Errors Admin Payment
          console.log("pnp");
          this.requestPayment = false;
          //this.$store.dispatch("setCustomer", {});
          this.$router.push(
            this.localePath({
              name: "reserve-error",
            })
          );
        });
    },
    onFormCreated(event){
      var valueText = "PAGAR "+this.page.data.department.project_rel
                                  .price_separation_format;
      var botonpopin = document.getElementsByClassName("kr-payment-button");
      var spanBotonPopin = botonpopin[0].getElementsByTagName('span');
      spanBotonPopin[0].textContent = valueText;
      var valueText2 = "<strong>PAGAR "+this.page.data.department.project_rel
                                  .price_separation_format+"</strong>";
      var botonform = document.getElementsByClassName("kr-popin-button");
      botonform[0].innerHTML = valueText2;
    },
    generateForm(token, tokenjs, currency) {
      console.log(currency);
      const formToken = token;
      let config = {
        "merchant": {
          "header": {
            "shopName": {
              "color": "black",
            },
            "backgroundColor": "#eeeeee",
            "image": {
              "type": "logo",
              "visibility": true,
            },
          },
        },
      };
      /*let configCurrency = {};
      if(currency == "USD"){
        configCurrency = {
            "kr-language": "en-US"
        }
      }
      else{
        configCurrency = {
            "kr-language": "es-ES"
        }
      }*/
      /*let configPlaceholders = {
        "kr-placeholder-expiry" : 'MM/AA',
        "kr-placeholder-pan": "Número de tarjeta",
      }*/
      KRGlue.loadLibrary(this.endpoint, tokenjs)
        .then(({ KR }) =>
          KR.setFormConfig({
            formToken: formToken,
            //"kr-language": "en-US"
          })
        )
        .then(({ KR }) =>
          KR.setFormConfig({
            "kr-popin": ""
          })
        )
        //.then(({ KR }) => KR.setFormConfig(configCurrency) )
        .then(({ KR }) => KR.setFormConfig(config))
        .then(({ KR }) => KR.addForm("#payfo")) /* create a payment form */
        .then(({ KR, result }) => KR.showForm(result.formId))
        .then(({ KR }) =>
          KR.setShopName("Pasarela de Pagos Izipay")
        ) /* create a payment form */
        .then(({ KR }) => KR.closePopin()) /* create a payment form */
        .then(({ KR }) => KR.onSubmit(this.pay))
        .then(({ KR }) => KR.onError(this.handleError))
        .then(({ KR }) => KR.onFormCreated(this.onFormCreated))
        //El formToken válido por 5 minutos.
        //Establecer limite de LS 5m
        .then(({ KR }) => this.setExpireLS(60 * 6000))
        .then(({ KR }) => (this.requestPayment = false))
        .catch((error) => {
          this.requestPayment = false;
          this.promiseError = error + " (see console for more details)";
        });
    },
    getAvailable() {
      this.requestAvailable = true;
      this.$axios
        .$get("/api/reserve/available/" + this.page.data.department.slug)
        .then((response) => {
          //Verificar si esta disponible el inmueble
          if (response.data[0]["available"]) {
            //Verificar si se actualizo el precio del inmueble
            if (response.data[0]["price"] != this.page.data.department.price) {
              this.departmentAvailable = response.data[0];
              this.departmentUpdated = true;
            }
          } else {
            //Si no esta disponible el inmueble poner No Disponible
            this.noAvailable = true;
          }
          this.requestAvailable = false;
        })
        .catch((error) => {
          this.requestAvailable = false;
          //Si no esta disponible el inmueble poner No Disponible
          this.noAvailable = true;
        });
    },
  },
  mounted() {
    $(document).ready(function () {
      $(".fancybox").fancybox();
      });
    this.requestPayment = true;
    //Si no hay cliente retornar
    if (
      Object.entries(this.customerGlobal).length === 0 &&
      this.customerGlobal.constructor === Object
    ) {
      this.$router.push(this.localePath({ name: "index" }));
    } else {
      //Generar Token
      this.checkout();
      //Verificar Disponibilidad
      this.getAvailable();
      //Verificar Tiempo ExpireLS
      let self = this;
      this.timer = setInterval(function () {
        self.checkExpireLS();
      }, 1000); // 60 * 1000 milsec
    }
  },
  beforeDestroy() {
    // Clear Timer
    clearInterval(this.timer);
  },
  computed: {
    expireLS() {
      return this.$store.getters.getExpireLS;
    },
    customerGlobal() {
      return this.$store.getters.getCustomer;
    },
  },
};
</script>