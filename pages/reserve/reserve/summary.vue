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
              <!--<div class="grid-s-12" v-if="requestAvailable">
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
              </div>-->
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
                          customer.department.deps.image ? 
                              storageUrl + '/img/projects/estates/' + customer.department.deps.image : 
                            customer.department.deps.tipology_rel.image ? 
                            storageUrl + '/img/projects/tipologies/' + customer.department.deps.tipology_rel.image : 
                            require('~/assets/img/p-no-data.png')
                        "
                      > 
                        <img
                          v-if="customer.department.deps.image"
                          class="plano lazyload"
                          :data-src="
                            storageUrl +
                            '/img/projects/estates/' +
                            customer.department.deps.image
                          "
                          :alt="
                            $t('Plano') + ' ' + customer.department.deps.description
                          "
                        />
                        <img
                          v-else-if="customer.department.deps.tipology_rel.image"
                          class="plano lazyload"
                          :data-src="
                            storageUrl +
                            '/img/projects/tipologies/' +
                            customer.department.deps.tipology_rel.image
                          "
                          :alt="$t('Plano') + ' ' + customer.department.deps.description"
                        />
                        <img
                          v-else
                          class="lazyload"
                          :data-src="require('~/assets/img/p-no-data.png')"
                          :alt="
                            $t('Plano') + ' ' + customer.department.deps.description
                          "
                        />
                      </a>
                    </div>
                    <div class="grid-s-12 grid-m-8 grid-l-9">
                      <img
                        :data-src="
                          storageUrl +
                          '/img/projects/' +
                          customer.department.deps.project_rel.logo_colour
                        "
                        :alt="
                          $t('Proyecto') +
                          ' ' +
                          customer.department.deps.project_rel[
                            'name_' + $i18n.locale
                          ]
                        "
                        class="logo lazyload"
                      />
                      <div class="caract-grid">
                        <div class="col-width-100">
                          <b>{{ $t("Descripción") }}:</b>
                          <p class="mb-0">
                            <strong class="d-block">{{ customer.department.deps.description}}</strong>
                           
                          </p>
                          <div class="mt-2">
                             <div
                            class="grid-s-12"
                            v-if="
                              customer.department.parkings && customer.department.parkings.length
                            "
                          >
                            <div
                              v-for="park in customer.department.parkings"
                              :key="park.id + 'park'"
                              class="grid-col grid-col--parkingwarehouse"
                            >
                              <div class="grid-s-8 grid-col--parkingwarehouse__descriptions">
                                {{ park.description }} <br />
                                {{ park.area_format }}m2
                              </div>
                              <div class="grid-s-4 text-right">
                                <ModalParkingWarehouse
                                  v-show="park.floorView"
                                  :floorData="park.floorView"
                                  :estate="park"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            class="grid-s-12"
                            v-if="
                              customer.department.warehouses &&
                              customer.department.warehouses.length
                            "
                          >
                            <div
                              v-for="ware in customer.department.warehouses"
                              :key="ware.id + 'ware'"
                              class="grid-col grid-col--parkingwarehouse"
                            >
                              <div class="grid-s-8 grid-col--parkingwarehouse__descriptions">
                              {{ ware.description }} <br />
                              {{ ware.area_format }}m2
                              </div>
                              <div class="grid-s-4 text-right">
                                <ModalParkingWarehouse
                                  v-show="ware.floorView"
                                  :floorData="ware.floorView"
                                  :estate="ware"
                                />
                              </div>
                            </div>
                          </div>
                          </div>
                        </div>
                        <div class="">
                          <b>{{ $t("Ubicación") }}:</b>
                          <p>
                            {{
                              customer.department.deps.project_rel.ubigeo_rel
                                .district
                            }}
                          </p>
                        </div>
                        <div class="">
                          <b>{{ $t("Estatus") }}:</b>
                          <p>
                            {{
                              customer.department.deps.project_rel.status_rel[
                                "name_" + $i18n.locale
                              ]
                            }}
                          </p>
                        </div>
                        <div
                          class=""
                          v-if="
                            customer.department.deps.type_department_id &&
                            customer.department.deps.tipology_rel &&
                            customer.department.deps.tipology_rel
                              .parent_type_department_id
                          "
                        >
                          <b>{{ $t("Tipo") }}:</b>
                          <p>
                            {{
                              customer.department.deps.tipology_rel
                                .parent_type_department_rel.name
                            }}
                          </p>
                        </div>
                        <div class="">
                          <b>{{ $t("Metraje") }}:</b>
                          <p>{{ customer.department.deps.area_format }}m2</p>
                        </div>
                        <div
                          class=""
                          v-if="
                            customer.department.deps.type_department_id &&
                            customer.department.deps.tipology_rel &&
                            customer.department.deps.tipology_rel.room
                          "
                        >
                          <b>{{ $t("Dormitorios") }}:</b>
                          <p>{{ customer.department.deps.tipology_rel.room }}</p>
                        </div>
                        <div class="">
                          <b> {{ $t("Vista") }}:</b>
                          <p>{{ customer.department.deps.view_rel.name }}</p>
                        </div>
                        <div class="">
                          <b>{{ $t("Piso") }}:</b>
                          <p>
                            {{ customer.department.deps.floor }}° {{ $t("piso") }}
                          </p>
                        </div>
                        <div class="">
                          <b>{{ $t("Precio total") }}:</b>
                          <p>
                            <strong>
                                  <template
                                    v-if="
                                      customer.department.deps.project_rel
                                        .master_currency_id == 1
                                    "
                                  >
                                    {{ customer.department.deps.price_format }}
                                  </template>
                                  <template
                                    v-else-if="
                                      customer.department.deps.project_rel
                                        .master_currency_id == 2
                                    "
                                  >
                                    {{ customer.department.deps.price_foreign_format }}
                                  </template>
                                </strong>
                          </p>
                        </div>
                        <div class="" v-if="customer.department.deps.project_rel">
                          <b>{{ $t("Monto de Separación") }}:</b>
                          <p>
                            <strong>
                              {{
                                customer.department.deps.project_rel
                                  .price_separation_format
                              }}
                            </strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="Object.entries(customer).length === 0" class="grid-s-12"></div>
              <div class="grid-s-12" v-else>
                <div class="content-bg">
                  <h5>
                    <b>{{ $t("Datos de la persona a reservar") }}</b>
                  </h5>

                  <div class="grid-col">
                    <div class="grid-s-12 grid-m-4 grid-l-2">
                      <b>{{ $t("Nombre") }}:</b>
                      <p>
                        {{ customer.name }} {{ customer.lastname }}
                        {{ customer.lastname_2 }}
                      </p>
                    </div>
                    <div class="grid-s-12 grid-m-4 grid-l-2">
                      <b>{{ customer.type_document_id }}:</b>
                      <p>{{ customer.document_number }}</p>
                    </div>
                    <div class="grid-s-12 grid-m-4 grid-l-2">
                      <b>{{ $t("Teléfono") }}:</b>
                      <p>{{ customer.mobile }}</p>
                    </div>
                    <div class="grid-s-12 grid-m-4 grid-l-2">
                      <b>{{ $t("Correo") }}:</b>
                      <p>{{ customer.email }}</p>
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
import ModalParkingWarehouse from "../../../components/modals/ParkingWarehouse";
export default {
  name: "ReserveReserveSummary",
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
    ModalParkingWarehouse
  },
  nuxtI18n: {
    paths: {
      es: "/separa-tu-depa/reserva/:slug/resumen",
      en: "/reserve-your-department/reserve/:slug/summary",
    },
  },
  async asyncData({ params, $axios, app, store, redirect }) {
    let { data } = await $axios.get("/api/page/reserve/advisor", {
      params: { locale: app.i18n.locale },
    });
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
      customer:{
        department: {
        available: true,
        deps: {
          image: "",
          project_rel: {
            logo_colour: "",
            ubigeo_rel: {
              district: "",
              department: "",
              province: "",
            },
            status_rel: {
              name_es: "",
            },
          },
          tipology_rel: {
            name: "",
            image: "",
            parent_type_department_rel: {},
          },
          view_rel: {
            name_es: "",
          },
          parkings: [],
          warehouses: [],
          allEstates: [],
        },
      },
      }
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
        .$post("/api/reserve/payment/platform-commercial/init", this.customerGlobal)
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
      var valueText = "PAGAR "+this.customer.department.deps.project_rel
                                  .price_separation_format;
      var botonpopin = document.getElementsByClassName("kr-payment-button");
      var spanBotonPopin = botonpopin[0].getElementsByTagName('span');
      spanBotonPopin[0].textContent = valueText;
      var valueText2 = "<strong>PAGAR "+this.customer.department.deps.project_rel
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
      KRGlue.loadLibrary(this.endpoint, tokenjs)
        .then(({ KR }) =>
          KR.setFormConfig({
            formToken: formToken,
          })
        )
        .then(({ KR }) =>
          KR.setFormConfig({
            "kr-popin": ""
          })
        )
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
    /*getAvailable() {
      this.requestAvailable = true;
      this.$axios
        .$get("/api/reserve/reserve-departments/" + this.$route.params.slug)
        .then((response) => {
          //Verificar si esta disponible el inmueble
          if (!response.data[0]["available"]) {
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
    },*/
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
      //this.getAvailable();
      //Verificar Tiempo ExpireLS
      this.customer = Object.assign({}, this.customerGlobal);
      let self = this;
      /*this.timer = setInterval(function () {
        self.checkExpireLS();
      }, 1000); // 60 * 1000 milsec*/
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