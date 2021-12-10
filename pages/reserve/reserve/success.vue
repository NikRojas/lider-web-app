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
              <h2>{{customer.name.trim()}}, {{ $t("tu separación está confirmada") }}!</h2>
            </div>
            <div class="grid-col">
              <div class="grid-s-12">
                <div class="text-center">
                  <!--<h5>
                    <b>{{ $t("Orden") }} N°: {{ customer.oi }}</b>
                  </h5>-->
                  <p>
                    {{ $t("En breve recibirás un correo electrónico con el detalle de tu separación, tu orden es la") }} N° {{ customer.oi }}
                  </p>
                  <p>
                    {{ $t("Si tienes alguna duda,") }}
                    <nuxt-link :to="localePath('contact')">{{
                      $t("contáctanos")
                    }}</nuxt-link
                    >.
                  </p>
                  <p>
                    <strong>¡{{ $t("Bienvienido a la familia Líder") }}!</strong>
                  </p>
                </div>
                <br><br>
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
                            $t('Plano')
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
                          :alt="
                            $t('Plano')
                          "
                        />
                        <img
                          v-else
                          class="lazyload"
                          :data-src="require('~/assets/img/p-no-data.png')"
                          :alt="
                            $t('Plano')
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
                              <div class="grid-s-4 text-right" v-if="park.floorView">
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
                              <div class="grid-s-4 text-right"  v-if="ware.floorView">
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
                              }}</strong
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br /><br />
                  <h5>
                    <b>{{ $t("Datos del cliente") }}</b>
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
if (process.client) {
  require("/static/js/jq.fancybox.min.js");
}
import "/static/css/jq.fancybox.min.css";
import Banner from "../../../components/Banner";
import Steps from "../../../components/payment/Steps";
import ModalParkingWarehouse from "../../../components/modals/ParkingWarehouse";
export default {
  name: "ReserveReserveSuccess",
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
    ModalParkingWarehouse
  },
  nuxtI18n: {
    paths: {
      es: "/separa-tu-depa/reserva/:slug/exitoso",
      en: "/reserve-your-department/reserve/:slug/success",
    },
  },
  data() {
    return {
      customer: {
        name: '',
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
        }
        }
      },
      storageUrl: process.env.STORAGE_URL,
      page: {},
    };
  },
  mounted() {
    $(document).ready(function () {
      $(".fancybox").fancybox();
      });
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