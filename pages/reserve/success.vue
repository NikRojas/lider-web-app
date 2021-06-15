<template>
  <main class="reserve-your-property">
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
        <Steps active="success" />
        <div class="viewport full-width-container">
          <div class="sized-container">
            <div class="title center">
              <h2>{{ $t("Tu separación está confirmada") }}</h2>
            </div>
            <div class="grid-col">
              <div class="grid-s-12">
                <div class="text-center">
                  <h5>
                    <b>{{ $t("Orden") }} N°: {{ customer.oi }}</b>
                  </h5>
                  <p>{{ $t("Hola") }} {{ customer.name }},</p>
                  <p>
                    {{
                      $t(
                        "Usted recibira un correo con los detalles de la orden"
                      )
                    }}.
                  </p>
                  <p>
                    {{ $t("Si tienes alguna duda,") }}
                    <nuxt-link :to="localePath('contact')">{{
                      $t("contáctanos")
                    }}</nuxt-link
                    >.
                  </p>
                  <p>{{ $t("Gracias") }},</p>
                  <p>
                    <strong>{{ $t("El equipo Lider") }}</strong>
                  </p>
                </div>
                <br><br>
                <div class="content-bg">
                  <h5>
                    <b>{{ $t("Datos del inmueble") }}</b>
                  </h5>
                  <div class="grid-col">
                    <div class="grid-s-12 grid-m-4 grid-l-3">
                      <img
                        v-if="customer.department.image"
                        class="plano lazyload"
                        :data-src="
                          storageUrl +
                          '/img/projects/estates/' +
                          customer.department.image
                        "
                        :alt="
                          $t('Plano') + ' ' + customer.department.description
                        "
                      />
                      <img
                        v-else
                        class="lazyload"
                        :data-src="require('~/assets/img/p-no-data.png')"
                        :alt="
                          $t('Plano') + ' ' + customer.department.description
                        "
                      />
                    </div>
                    <div class="grid-s-12 grid-m-8 grid-l-9">
                      <img
                        :data-src="
                          storageUrl +
                          '/img/projects/' +
                          customer.department.project_rel.logo_colour
                        "
                        :alt="
                          $t('Proyecto') +
                          ' ' +
                          customer.department.project_rel[
                            'name_' + $i18n.locale
                          ]
                        "
                        class="logo lazyload"
                      />
                      <div class="caract-grid">
                        <div class="">
                          <b>{{ $t("Ubicación") }}:</b>
                          <p>
                            {{
                              customer.department.project_rel.ubigeo_rel
                                .district
                            }}
                          </p>
                        </div>
                        <div class="">
                          <b>{{ $t("Estatus") }}:</b>
                          <p>
                            {{
                              customer.department.project_rel.status_rel[
                                "name_" + $i18n.locale
                              ]
                            }}
                          </p>
                        </div>
                        <div
                          class=""
                          v-if="
                            customer.department.type_department_id &&
                            customer.department.tipology_rel &&
                            customer.department.tipology_rel
                              .parent_type_department_id
                          "
                        >
                          <b>{{ $t("Tipo") }}:</b>
                          <p>
                            {{
                              customer.department.tipology_rel
                                .parent_type_department_rel.name
                            }}
                          </p>
                        </div>
                        <div class="">
                          <b>{{ $t("Metraje") }}:</b>
                          <p>{{ customer.department.area_format }}m2</p>
                        </div>
                        <div
                          class=""
                          v-if="
                            customer.department.type_department_id &&
                            customer.department.tipology_rel &&
                            customer.department.tipology_rel.room
                          "
                        >
                          <b>{{ $t("Dormitorios") }}:</b>
                          <p>{{ customer.department.tipology_rel.room }}</p>
                        </div>
                        <div class="">
                          <b> {{ $t("Vista") }}:</b>
                          <p>{{ customer.department.view_rel.name }}</p>
                        </div>
                        <div class="">
                          <b>{{ $t("Piso") }}:</b>
                          <p>
                            {{ customer.department.floor }}° {{ $t("piso") }}
                          </p>
                        </div>
                        <div class="">
                          <b>{{ $t("Precio del inmueble") }}:</b>
                          <p>
                            <strong
                              ><template
                                v-if="customer.department.price_foreign"
                              >
                                {{ customer.department.price_foreign_format }}
                              </template>
                              <template
                                v-if="
                                  !customer.department.price_foreign &&
                                  customer.department.price
                                "
                              >
                                {{ customer.department.price_format }}
                              </template></strong
                            >
                          </p>
                        </div>
                        <div class="">
                          <b>{{ $t("Precio separación") }}:</b>
                          <p>
                            <strong>
                              {{
                                customer.department.project_rel
                                  .price_separation_format
                              }}</strong
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br /><br />
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
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import Banner from "../../components/Banner";
import Steps from "../../components/payment/Steps";
export default {
  name: "ReserveSuccess",
  head() {
    return {
      meta: [{ hid: "robots", name: "robots", content: "noindex, nofollow" }],
    };
  },
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/reserve", {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },
  components: {
    Steps,
    Banner,
  },
  nuxtI18n: {
    paths: {
      es: "/separa-tu-depa/exitoso",
      en: "/reserve-your-department/success",
    },
  },
  data() {
    return {
      customer: {
          department: {
              tipology_rel: {
                  parent_type_department_rel: {},
                  name: '',
              },
              view_rel: {},
              project_rel: {
                  ubigeo_rel: {
                      district: ''
                  },
                  status_rel: {
                      name_es: '',
                      name_en: ''
                  }
              }
          }
      },
      storageUrl: process.env.STORAGE_URL,
      page: {},
    };
  },
  mounted() {
    if (
      Object.entries(this.customerGlobal).length === 0 &&
      this.customerGlobal.constructor === Object
    ) {
      this.$router.push(this.localePath({ name: "index" }));
    } else {
      this.customer = Object.assign({}, this.customerGlobal);
      setTimeout(() => {
                console.log("Clear")
                this.$store.dispatch("setCustomer", {});
                this.$store.dispatch("setExpireLS", null);
            }, 10);
    }
  },
  computed: {
    customerGlobal() {
      return this.$store.getters.getCustomer;
    },
  },
};
</script>