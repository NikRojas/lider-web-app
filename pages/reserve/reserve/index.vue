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
        <Steps active="reserve" />
        <div class="viewport full-width-container">
          <div class="sized-container">
            <div class="title center">
              <h2>{{ $t("Datos de separación") }}</h2>
            </div>
            <div class="grid-col">
              <div
                class="
                  grid-s-12
                  content-bg
                  text-center
                  margin-bottom
                  content-disponible
                "
                v-if="requestAvailable"
              >
                <div class="load-3">
                  <div class="line"></div>
                  <div class="line"></div>
                  <div class="line"></div>
                </div>
                <h4>
                  <b>{{ $t("Obteniendo Disponibilidad") }}</b>
                </h4>
              </div>
              <div class="grid-s-12 text-center" v-if="!department.available">
                No disponible
              </div>
              <template v-else>
                <div class="grid-s-12 grid-m-12 grid-l-6">
                  <div class="content-bg">
                    <h5>
                      <b>{{ $t("Datos del inmueble") }}</b>
                    </h5>

                    <template v-if="requestAvailable">
                      <PuSkeleton height="300px"></PuSkeleton>
                      <div class="grid-col">
                        <div class="grid-s-4" style="margin-top: 4px">
                          <PuSkeleton height="40px"></PuSkeleton>
                        </div>
                        <div class="grid-s-8"></div>
                        <div class="grid-s-12">
                          <PuSkeleton height="50px"></PuSkeleton>
                        </div>
                        <div
                          class="grid-s-12 grid-m-6 grid-l-4"
                          v-for="i in 9"
                          :key="i + 'ps'"
                        >
                          <PuSkeleton height="50px"></PuSkeleton>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <img
                        v-if="department.deps.image"
                        class="plano lazyload"
                        :data-src="
                          storageUrl +
                          '/img/projects/estates/' +
                          department.deps.image
                        "
                        :alt="$t('Plano') + ' ' + department.deps.description"
                      />
                      <img
                        v-else-if="department.deps.tipology_rel.image"
                        class="plano lazyload"
                        :data-src="
                          storageUrl +
                          '/img/projects/tipologies/' +
                          department.deps.tipology_rel.image
                        "
                        :alt="$t('Plano') + ' ' + department.deps.description"
                      />
                      <img
                        v-else
                        class="lazyload"
                        :data-src="require('~/assets/img/p-no-data.png')"
                        :alt="$t('Plano') + ' ' + department.deps.description"
                      />
                      <div class="grid-col">
                        <div
                          class="grid-s-6 grid-m-3 grid-l-3"
                          v-show="department.deps.project_rel"
                        >
                          <img
                            :src="
                              storageUrl +
                              '/img/projects/' +
                              department.deps.project_rel.logo_colour
                            "
                            :alt="$t('Proyecto')"
                            class="logo lazyload"
                          />
                        </div>
                        <div class="grid-s-6 grid-m-9 grid-l-9">
                          <nuxt-link
                            style="display: inline-block"
                            class="btn previous"
                            @click.native="clearData"
                            :to="localePath({ name: 'reserve' })"
                          >
                            {{ $t("Cambiar inmueble") }}</nuxt-link
                          >
                        </div>
                      </div>

                      <div class="caracteristicas-pago" v-if="department.deps">
                        <div class="grid-col">
                          <div
                            class="grid-s-12"
                            v-if="department.deps.description"
                          >
                            <b>{{ $t("Descripción") }}:</b>
                            <p class="mb-0">
                              <strong class="d-block">{{
                                department.deps.description
                              }}</strong>
                              <template
                                v-if="
                                  department.deps.parkings &&
                                  department.deps.parkings.length > 0
                                "
                              >
                                <span class="d-block"
                                  >ESTACIONAMIENTO(S)
                                  <span
                                    v-for="(pack, key) in department.parkings"
                                    :key="'packdes' + pack.id"
                                    >{{ pack.parking_text_format
                                    }}<template
                                      v-if="
                                        key + 1 !=
                                          department.deps.parkings.length &&
                                        department.deps.parkings.length > 0
                                      "
                                      >,
                                    </template>
                                  </span>
                                </span>
                              </template>
                              <template
                                v-if="
                                  department.deps.warehouses &&
                                  department.deps.warehouses.length > 0
                                "
                              >
                                <span class="d-block"
                                  >DEPÓSITO(S)
                                  <span
                                    v-for="(pack, key) in department.warehouses"
                                    :key="'packware' + pack.id"
                                    >{{ pack.warehouse_text_format
                                    }}<template
                                      v-if="
                                        key + 1 !=
                                          department.deps.warehouses.length &&
                                        department.deps.warehouses.length > 0
                                      "
                                      >,
                                    </template>
                                  </span>
                                </span>
                              </template>
                            </p>
                          </div>
                          <div
                            class="grid-s-12"
                            v-if="
                              department.parkings && department.parkings.length
                            "
                          >
                            <div
                              v-for="park in department.parkings"
                              :key="park.id + 'park'"
                            >
                              {{ park.description }} <br />
                              {{ park.area_format }}m2
                              <ModalParkingWarehouse
                                v-show="park.floorView"
                                :floorData="park.floorView"
                                :estate="park"
                              />
                            </div>
                          </div>
                          <div
                            class="grid-s-12"
                            v-if="
                              department.warehouses &&
                              department.warehouses.length
                            "
                          >
                            <div
                              v-for="ware in department.warehouses"
                              :key="ware.id + 'ware'"
                            >
                              {{ ware.description }} <br />
                              {{ ware.area_format }}m2
                              <ModalParkingWarehouse
                                v-show="ware.floorView"
                                :floorData="ware.floorView"
                                :estate="ware"
                              />
                            </div>
                          </div>
                          <div class="grid-s-12 grid-m-6 grid-l-4">
                            <b>{{ $t("Ubicación") }}:</b>
                            <p
                              v-if="
                                department.deps.project_rel &&
                                department.deps.project_rel.ubigeo_rel
                              "
                            >
                              {{
                                department.deps.project_rel.ubigeo_rel.district
                              }}
                            </p>
                          </div>
                          <div class="grid-s-12 grid-m-6 grid-l-4">
                            <b>{{ $t("Estatus") }}:</b>
                            <p>
                              {{
                                department.deps.project_rel.status_rel[
                                  "name_" + $i18n.locale
                                ]
                              }}
                            </p>
                          </div>
                          <div
                            class="grid-s-12 grid-m-6 grid-l-4"
                            v-if="
                              department.deps.type_department_id &&
                              department.deps.tipology_rel &&
                              department.deps.tipology_rel
                                .parent_type_department_id
                            "
                          >
                            <b>{{ $t("Tipo") }}:</b>
                            <p>
                              {{
                                department.deps.tipology_rel
                                  .parent_type_department_rel.name
                              }}
                            </p>
                          </div>
                          <div class="grid-s-12 grid-m-6 grid-l-4">
                            <b>{{ $t("Metraje") }}:</b>
                            <p>{{ department.deps.area_format }}m2</p>
                          </div>
                          <div
                            class="grid-s-12 grid-m-6 grid-l-4"
                            v-if="
                              department.deps.type_department_id &&
                              department.deps.tipology_rel &&
                              department.deps.tipology_rel.room
                            "
                          >
                            <b>{{ $t("Dormitorios") }}:</b>
                            <p>{{ department.deps.tipology_rel.room }}</p>
                          </div>
                          <div class="grid-s-12 grid-m-6 grid-l-4">
                            <b>{{ $t("Vista") }}:</b>
                            <p
                              v-if="department.deps && department.deps.view_rel"
                            >
                              {{ department.deps.view_rel.name }}
                            </p>
                          </div>
                          <div class="grid-s-12 grid-m-6 grid-l-4">
                            <b>{{ $t("Piso") }}:</b>
                            <p>{{ department.deps.floor }}° {{ $t("piso") }}</p>
                          </div>
                          <div class="grid-s-12 grid-m-6 grid-l-4">
                            <b>{{ $t("Precio total") }}:</b>
                            <p>
                              <template v-if="department.deps.isPackage">
                                <template
                                  v-if="
                                    department.deps.project_rel
                                      .master_currency_id == 1
                                  "
                                >
                                  {{
                                    department.deps.isPackage
                                      ? department.deps.price_package_format
                                      : department.deps.price_format
                                  }}
                                </template>
                                <template
                                  v-else-if="
                                    department.deps.project_rel
                                      .master_currency_id == 2
                                  "
                                >
                                  {{
                                    department.deps.isPackage
                                      ? department.deps
                                          .price_foreign_package_format
                                      : department.deps.price_foreign_format
                                  }}
                                </template>
                              </template>
                              <template v-else>
                                <strong>
                                  <template
                                    v-if="
                                      department.deps.project_rel
                                        .master_currency_id == 1
                                    "
                                  >
                                    {{ department.deps.price_format }}
                                  </template>
                                  <template
                                    v-else-if="
                                      department.deps.project_rel
                                        .master_currency_id == 2
                                    "
                                  >
                                    {{ department.deps.price_foreign_format }}
                                  </template>
                                </strong>
                              </template>
                            </p>
                          </div>
                          <div
                            class="grid-s-12 grid-m-6 grid-l-4"
                            v-if="department.deps.project_rel"
                          >
                            <b>{{ $t("Monto de Separación") }}:</b>
                            <p>
                              <strong>{{
                                department.deps.project_rel
                                  .price_separation_format
                              }}</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="grid-s-12 grid-m-12 grid-l-6">
                  <div class="movil-padding">
                    <h5>{{ $t("Ingresa tus datos") }}</h5>
                    <form
                      @submit.prevent="submit"
                      id="formp"
                      autocomplete="off"
                    >
                      <div class="grid-col">
                        <div class="grid-s-12">
                          <div class="form-control">
                            <label for="name">{{ $t("Nombre") }}*</label>
                            <input
                              type="text"
                              id="name"
                              v-model="customer.name"
                            />
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
                            <label for="lastname"
                              >{{ $t("Apellido Paterno") }}*</label
                            >
                            <input
                              type="text"
                              id="lastname"
                              v-model="customer.lastname"
                            />
                            <span
                              class="error error-red"
                              v-if="errors && errors.lastname"
                              for="lastname"
                              >{{ $t(errors.lastname[0]) }}</span
                            >
                          </div>
                        </div>

                        <div class="grid-s-12 grid-m-6 grid-l-6">
                          <div class="form-control">
                            <label for="lastname_2"
                              >{{ $t("Apellido Materno") }}*</label
                            >
                            <input
                              type="text"
                              id="lastname_2"
                              v-model="customer.lastname_2"
                            />
                            <span
                              class="error error-red"
                              v-if="errors && errors.lastname_2"
                              for="lastname_2"
                              >{{ $t(errors.lastname_2[0]) }}</span
                            >
                          </div>
                        </div>

                        <div class="grid-s-12 grid-m-6 grid-l-6">
                          <div class="form-control">
                            <label for="type_document_id"
                              >{{ $t("Tipo de documento") }}*</label
                            >
                            <select
                              name=""
                              id=""
                              v-model="customer.type_document_id"
                            >
                              <option
                                v-for="el in page.data.typeDocuments"
                                :value="el.description"
                                :key="'tp' + el.id"
                              >
                                {{ el.description }}
                              </option>
                            </select>
                            <span
                              class="error error-red"
                              v-if="errors && errors.type_document_id"
                              for="type_document_id"
                              >{{ $t(errors.type_document_id[0]) }}</span
                            >
                          </div>
                        </div>

                        <div class="grid-s-12 grid-m-6 grid-l-6">
                          <div class="form-control">
                            <label for="document_number"
                              >{{ $t("N° de documento") }}*</label
                            >
                            <input
                              type="number"
                              id="document_number"
                              v-model="customer.document_number"
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
                            <label for="phone">{{ $t("Teléfono") }}*</label>
                            <input
                              type="text"
                              id="phone"
                              v-model="customer.mobile"
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
                            <label for="email">{{ $t("Correo") }}*</label>
                            <input
                              type="text"
                              id="email"
                              v-model="customer.email"
                            />
                            <span
                              class="error error-red"
                              v-if="errors && errors.email"
                              for="email"
                              >{{ $t(errors.email[0]) }}</span
                            >
                          </div>
                        </div>
                        <div class="grid-s-12 mb-lg">
                          <div class="form-control">
                            <input
                              v-model="customer.accepted"
                              class="checkbox"
                              id="accepted"
                              type="checkbox"
                            />
                            <label for="accepted"
                              >{{ $t("He leído y acepto los") }}
                              <Terms :content="page.data.terms"></Terms>
                              {{ $t("y") }}
                              <Policies :content="page.data.privacy"></Policies>
                            </label>
                            <span
                              class="error error-red"
                              v-if="errors && errors.accepted"
                              for="accepted"
                              >{{ $t(errors.accepted[0]) }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </form>
                    <button
                      form="formp"
                      type="submit"
                      :class="requestSubmit ? 'btn--opacity' : ''"
                      :disabled="requestSubmit"
                      class="next btn btn2 text-transform-inherit"
                    >
                      {{
                        requestSubmit
                          ? $t("Cargando") + "..."
                          : $t("Realizar el Pago")
                      }}

                      <i class="flaticon-next"></i>
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
      
<script>
import Banner from "../../../components/Banner";
import Steps from "../../../components/payment/Steps";
import ModalParkingWarehouse from "../../../components/modals/ParkingWarehouse";
export default {
  name: "ReserveReserveSlug",
  components: {
    Banner,
    Steps,
    ModalParkingWarehouse,
  },
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/reserve/advisor", {
      params: { locale: app.i18n.locale },
    });
    return { page: data };
  },
  data() {
    return {
      page: {},
      errors: {},
      customer: {
        name: "",
      },
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
      requestSubmit: false,
      storageUrl: process.env.STORAGE_URL,
      requestAvailable: true,
    };
  },
  nuxtI18n: {
    paths: {
      es: "/separa-tu-depa/reserva/:slug",
      en: "/reserve-your-department/reserve/:slug",
    },
  },
  methods: {
    clearData() {
      this.$store.dispatch("setExpireLS", null);
      this.$store.dispatch("setCustomer", {});
    },
    getAvailable() {
      this.requestAvailable = true;
      this.$axios
        .$get("/api/reserve/reserve-departments/" + this.$route.params.slug)
        .then((response) => {
          //setTimeout(() => {
          this.department = Object.assign({}, response.data);
          this.requestAvailable = false;
          //}, 5000);
        })
        .catch((error) => {
          this.requestAvailable = false;
        });
    },
    submit() {
      this.requestSubmit = true;
      this.customer.code_reserve = this.$route.params.slug;
      //Si se cambia de inmueble
      if (this.customerGlobal.slug != this.customer.slug) {
        this.customer.oi = "";
      }
      this.customer.price = this.page.data.department.price;
      this.customer.project_id = this.department.deps.project_id;
      this.customer.allEstates = this.department.allEstates;
      this.$axios
        .$post("/api/reserve/platform-commercial/customer", this.customer)
        .then((response) => {
          this.requestSubmit = false;
          this.customer.oi = response.data.order_id;
          this.customer.department = Object.assign(
            {},
            this.page.data.department
          );
          this.$store.dispatch("setCustomer", this.customer);
          this.$router.push(
              this.localePath({
                name: "reserve-reserve-summary",
                params: { slug: this.$route.params.slug },
              })
            );
        })
        .catch((error) => {
          this.requestSubmit = false;
          if (error.response.status === 422) {
            this.errors = error.response.data.errors || {};
            return;
          }
        });
    },
  },
  mounted() {
    this.getAvailable();
  },
  computed: {
    customerGlobal() {
      return this.$store.getters.getCustomer;
    },
  },
  watch: {
    customerGlobal: {
      immediate: true,
      handler(newVal, oldVal) {
        this.customer = Object.assign({}, newVal);
      },
    },
  },
};
</script>