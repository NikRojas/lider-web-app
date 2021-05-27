<template>
  <main class="reserve-your-property">
    <Loading :loading="requestPayment"/>
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
      <div class="container">
        <Steps active="summary" text="Resumen de reserva" />

        <div class="grid-col">
          <div class="grid-s-12">
            {{ $t("Datos del inmueble") }}

            <img
              v-if="page.data.department.image"
              :data-src="
                storageUrl +
                '/img/projects/estates/' +
                page.data.department.image
              "
              :alt="$t('Plano') + ' ' + page.data.department.description"
              height="5000"
              class="lazyload img--width-auto"
            />

            <img
              height="30"
              :data-src="
                storageUrl +
                '/img/projects/' +
                page.data.department.project_rel.logo_colour
              "
              :alt="
                $t('Proyecto') +
                ' ' +
                page.data.department.project_rel['name_' + $i18n.locale]
              "
              class="logo-p2 lazyload img--width-auto"
            />

            {{ $t("Ubicación") }}:
            {{ page.data.department.project_rel.ubigeo_rel.district }}<br />
            {{ $t("Estatus") }}:
            {{
              page.data.department.project_rel.status_rel[
                "name_" + $i18n.locale
              ]
            }}<br />
            <template
              v-if="
                page.data.department.type_department_id &&
                page.data.department.tipology_rel &&
                page.data.department.tipology_rel.parent_type_department_id
              "
            >
              {{ $t("Tipo") }}:
              {{
                page.data.department.tipology_rel.parent_type_department_rel
                  .name
              }}
              <br />
            </template>
            {{ $t("Piso") }}: {{ page.data.department.floor }}°
            {{ $t("piso") }} <br />
            {{ $t("Vista") }}: {{ page.data.department.view_rel.name }} <br />
            {{ $t("Metraje") }}: {{ page.data.department.tipology_rel.area }}m2
            {{ $t("Dormitorios") }} :
            {{ page.data.department.tipology_rel.room }}
            {{ $t("Precio inmueble") }}:
            <div>
              <template v-if="page.data.department.price_foreign">
                {{ page.data.department.price_foreign_format }}
              </template>
              <template
                v-if="
                  !page.data.department.price_foreign &&
                  page.data.department.price
                "
              >
                {{ page.data.department.price_format }}
              </template>
            </div>
            <br /><br /><br />
            {{ $t("Precio separación") }}
            <template v-if="page.data.department.project_rel">
              {{ page.data.department.project_rel.price_separation_format }}
            </template>

            <div v-if="Object.entries(customerGlobal).length === 0"></div>
            <div v-else>
              {{ $t("Datos de la persona a reservar") }}

              {{ $t("Nombre") }}

              {{ customerGlobal.name }} {{ customerGlobal.lastname }}
              {{ customerGlobal.lastname_2 }}

              {{ customerGlobal.type_document_id }}
              {{ customerGlobal.document_number }}

              {{ $t("Teléfono") }}
              {{ customerGlobal.mobile }}
              {{ $t("Correo") }}
              {{ customerGlobal.email }}
            </div>
          </div>

          <div class="grid-s-12">
            {{ $t("Monto a pagar") }}
            {{ page.data.department.project_rel.price_separation_format }}

            <nuxt-link
              class="btn"
              :to="
                localePath({
                  name: 'reserve-slug',
                  params: { slug: $route.params.slug },
                  query: { ...$route.query, adv: $route.query.adv },
                })
              "
            >
              Editar Datos
            </nuxt-link>
            <!--<div v-if="Object.entries(customerGlobal).length === 0"></div>
            <div v-else>
              <button
                @click="pay"
                v-if="page.data.department.project_rel.price_separation"
              >
                Pagar
              </button>
            </div>

            <button class="btn" @click="checkout">PAGAR</button>-->

            <div class="kr-embedded" kr-popin id="payfo"></div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style lang="scss">
.kr-embedded {
  background-color: #eeeeee !important;
  .kr-payment-button {
    background-color: #f15f23 !important;
    color: #fff !important;
  }
  .kr-popin-modal-header {
    border-bottom: 0 !important;
  }
}
</style>
<script>
import Banner from "../../../components/Banner";
import Steps from "../../../components/payment/Steps";
import Loading from "../../../components/payment/Loading";
import KRGlue from "@lyracom/embedded-form-glue";
import Logo from "~/assets/img/logo-payment.svg";
export default {
  name: "ReserveSlugSummary",
  head() {
    return {
      meta: [{ hid: "robots", name: "robots", content: "noindex, nofollow" }],
      script: [
        {
          src:
            "https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/classic.js",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href:
            "https://static.micuentaweb.pe/static/js/krypton-client/V4.0/ext/classic-reset.css",
        },
      ],
    };
  },
  components: {
    Banner,
    Steps,
    Loading
  },
  nuxtI18n: {
    paths: {
      es: "/separa-tu-inmueble/:slug/resumen",
      en: "/reserve-your-property/:slug/summary",
    },
  },
  async validate({ params, $axios, app, store, redirect }) {
    //Si no existe los datos del usuario en VUEX retornar a la pagina anterior
    //Cuando se hace refresh esto esta vacio
    //console.log(store.state['customer'])
    //if(Object.entries(store.state.customer).length === 0 && store.state.customer.constructor === Object) {
    // console.log(store.state.customer)
    //redirect(app.localePath({name: "reserve"}))
    //}
    const data = await $axios.$get("/api/page/reserve/summary/" + params.slug, {
      params: { locale: app.i18n.locale },
    });
    if (data.success) {
      return true;
    }
    return false;
  },
  async asyncData({ params, $axios, app, store, redirect }) {
    //console.log(store.state['customer'])
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
    };
  },
  methods: {
    handleError(event){
      var code = event.errorCode;
            var message = event.errorMessage;
            var myMessage = code + ": " + message;
            console.log(event.errorCode);
            //El formulario ha caducado
            //event.errorCode = PSP_108
            //ACQ_001: Pago rechazado
            alert(myMessage);
    },
    pay(event) {
      console.log("pay");
      console.log(event);
      if (event.clientAnswer.orderStatus === "PAID") {
        // Remove the payment form
        KR.removeForms();

        // Show success message
        //document.getElementById("paymentSuccessful").style.display = "block";
        alert("success");
      } else {
        // Show error message to the user
        alert("Payment failed !");
      }
      /*this.requestSubmit = true;
      this.customer = this.customerGlobal;
      this.$axios
        .$post("/api/reserve/pay", this.customer)
        .then((response) => {
          this.requestSubmit = false;
          //Limpiar Cliente
          this.$store.dispatch("setCustomer", {});
          this.$router.push(
            this.localePath({
              name: "reserve-success",
            })
          );
        })
        .catch((error) => {
          this.requestSubmit = false;
          console.log(error.response.data);
          this.$store.dispatch("setCustomer", {});
          this.$router.push(
            this.localePath({
              name: "reserve-error",
            })
          );
         if (error.response.status === 422) {
            this.errors = error.response.data.errors || {};
            return;
          }
        });*/
    },
    checkout() {
      this.loadingCheckout = true;
      this.$axios
        .$post("/api/reserve/payment/init", this.customerGlobal)
        .then((response) => {
          this.loadingCheckout = false;
          if (response.data.t) {
            this.generateForm(response.data.t, response.data.j);
          }
        })
        .catch((error) => {
          //Errors Admin Payment
          console.log(error.response);
          this.loadingCheckout = false;
        });
    },
    generateForm(token, tokenjs) {
      //El formToken es válido por 15 minutos. Revisar como manejarlo
      const formToken = token;
      KRGlue.loadLibrary(this.endpoint, tokenjs) /* Load the remote library */
        .then(({ KR }) =>
          KR.setFormConfig({
            /* set the minimal configuration */ formToken: formToken,
            form: {
              layout: 'default'
            },
            merchant: {
              header: {
                shopName: {
                  color: "black",
                },
                backgroundColor: "#EEEEEE",
                image: {
                  type: "logo",
                  visibility: true,
                  src: Logo,
                },
              },
            },
            //'kr-language': 'en-US',                       /* to update initialization parameter */
          })
        )
        .then(({ KR }) =>
          KR.addForm("#payfo")
        ) /* create a payment form */
        .then(({ KR, result }) => KR.showForm(result.formId))
        .then(({ KR }) => KR.onSubmit(this.pay))
        .then(({ KR }) => KR.onError(this.handleError))
        .then(({ KR }) => this.requestPayment = false)
        .catch(
          (error) =>
            { this.requestPayment = false;
            (this.promiseError = error + " (see console for more details)") }
        );
    }
  },
  mounted() {
    this.requestPayment = true;
    if (
      Object.entries(this.customerGlobal).length === 0 &&
      this.customerGlobal.constructor === Object
    ) {
      this.$router.push(this.localePath({ name: "reserve" }));
    }
    else{
      this.checkout();
    }
  },
  computed: {
    customerGlobal() {
      return this.$store.getters.getCustomer;
    },
  },
};
</script>