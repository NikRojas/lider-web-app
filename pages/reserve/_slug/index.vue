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
              <div class="grid-s-12 grid-m-12 grid-l-6">
                <div
                  class="
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

                <div class="content-bg">
                  <h5>
                    <b>{{ $t("Datos del inmueble") }}</b>
                  </h5>
                  <a
                    data-fancybox
                    class="fancybox"
                    v-if="
                        page.data.isPackage &&
                        page.data.department.data_package.image
                      "
                    :href="storageUrl +
                        '/img/projects/combos/' +
                        page.data.department.data_package.image"
                  >
                    <img
                      class="plano lazyload"
                      :data-src="
                        storageUrl +
                        '/img/projects/combos/' +
                        page.data.department.data_package.image
                      "
                      :alt="$t('Plano') + ' ' + page.data.department.description"
                    />
                  </a>
                  <a
                    data-fancybox
                    class="fancybox"
                    v-else-if="page.data.department.image"
                    :href="storageUrl +
                        '/img/projects/estates/' +
                        page.data.department.image"
                  >
                    <img
                      
                      class="plano lazyload"
                      :data-src="
                        storageUrl +
                        '/img/projects/estates/' +
                        page.data.department.image
                      "
                      :alt="$t('Plano') + ' ' + page.data.department.description"
                    />
                  </a>
                  <a
                    data-fancybox
                    class="fancybox"
                    v-else-if="page.data.department.tipology_rel.image"
                    :href="storageUrl +
                        '/img/projects/tipologies/' +
                        page.data.department.tipology_rel.image"
                  >
                    <img
                      class="plano lazyload"
                      :data-src="
                        storageUrl +
                        '/img/projects/tipologies/' +
                        page.data.department.tipology_rel.image
                      "
                      :alt="$t('Plano') + ' ' + page.data.department.description"
                    />
                  </a>
                  <a
                    data-fancybox
                    class="fancybox"
                    v-else
                    :href="require('~/assets/img/p-no-data.png')"
                  >
                    <img
                      class="lazyload"
                      :data-src="require('~/assets/img/p-no-data.png')"
                      :alt="$t('Plano') + ' ' + page.data.department.description"
                    />
                  </a>
                  <!--<img
                    v-if="
                      page.data.isPackage &&
                      page.data.department.data_package.image
                    "
                    class="plano lazyload"
                    :data-src="
                      storageUrl +
                      '/img/projects/combos/' +
                      page.data.department.data_package.image
                    "
                    :alt="$t('Plano') + ' ' + page.data.department.description"
                  />
                  <img
                    v-else-if="page.data.department.image"
                    class="plano lazyload"
                    :data-src="
                      storageUrl +
                      '/img/projects/estates/' +
                      page.data.department.image
                    "
                    :alt="$t('Plano') + ' ' + page.data.department.description"
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
                    :alt="$t('Plano') + ' ' + page.data.department.description"
                  />-->
                  <div class="grid-col">
                    <div class="grid-s-6 grid-m-3 grid-l-3">
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
                    </div>
                    <div class="grid-s-6 grid-m-9 grid-l-9">
                      <nuxt-link
                        v-if="!noAvailable"
                        style="display: inline-block"
                        class="btn previous"
                        @click.native="clearData"
                        :to="localePath({ name: 'reserve' })"
                      >
                        {{ $t("Cambiar Inmueble") }}</nuxt-link
                      >
                    </div>
                  </div>

                  <div class="caracteristicas-pago">
                    <div class="grid-col">
                      <div
                        class="grid-s-12"
                        v-if="page.data.department.description"
                      >
                        <b>{{ $t("Descripción") }}:</b>
                        <p class="mb-0">
                          <strong class="d-block">{{
                            page.data.department.description
                          }}</strong>
                          <template v-if="page.data.isPackage">

                            <div class="grid-col">
                              <div
                                  class="grid-s-12"
                                  v-if="
                                    page.data.department.parkings && page.data.department.parkings.length
                                  "
                                >
                                  <div
                                    v-for="park in page.data.department.parkings"
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
                                    page.data.department.warehouses &&
                                    page.data.department.warehouses.length
                                  "
                                >
                                  <div
                                    v-for="ware in page.data.department.warehouses"
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
                            <!--<template
                              v-if="
                                page.data.department.parkings &&
                                page.data.department.parkings.length > 0
                              "
                            >
                              <span class="d-block"
                                >ESTACIONAMIENTO(S)
                                <span
                                  v-for="(pack, key) in page.data.department
                                    .parkings"
                                  :key="'packdes' + pack.id"
                                  >{{ pack.parking_text_format
                                  }}<template
                                    v-if="
                                      key + 1 !=
                                      page.data.department.parkings.length && page.data.department.parkings.length > 0
                                    "
                                    >,
                                  </template>
                                </span>
                              </span>
                            </template>
                            <template
                              v-if="
                                page.data.department.warehouses &&
                                page.data.department.warehouses.length > 0
                              "
                            >
                              <span class="d-block"
                                >DEPÓSITO(S)
                                <span
                                  v-for="(pack, key) in page.data.department
                                    .warehouses"
                                  :key="'packware' + pack.id"
                                  >{{ pack.warehouse_text_format }}<template
                                    v-if="
                                      key + 1 !=
                                      page.data.department.warehouses.length && page.data.department.warehouses.length > 0
                                    "
                                    >,
                                  </template>
                                </span>
                              </span>
                            </template>-->
                          </template>
                        </p>
                      </div>
                      <div class="grid-s-12 grid-m-6 grid-l-4">
                        <b>{{ $t("Ubicación") }}:</b>
                        <p>
                          {{
                            page.data.department.project_rel.ubigeo_rel.district
                          }}
                        </p>
                      </div>
                      <div class="grid-s-12 grid-m-6 grid-l-4">
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
                        class="grid-s-12 grid-m-6 grid-l-4"
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
                      <div class="grid-s-12 grid-m-6 grid-l-4">
                        <b>{{ $t("Metraje") }}:</b>
                        <p>
                          {{
                            page.data.isPackage
                              ? page.data.department.area_format_package
                              : page.data.department.area_format
                          }}m2
                        </p>
                      </div>
                      <div
                        class="grid-s-12 grid-m-6 grid-l-4"
                        v-if="
                          page.data.department.type_department_id &&
                          page.data.department.tipology_rel &&
                          page.data.department.tipology_rel.room
                        "
                      >
                        <b>{{ $t("Dormitorios") }}:</b>
                        <p>{{ page.data.department.tipology_rel.room }}</p>
                      </div>
                      <div class="grid-s-12 grid-m-6 grid-l-4">
                        <b>{{ $t("Vista") }}:</b>
                        <p>{{ page.data.department.view_rel.name }}</p>
                      </div>
                      <div class="grid-s-12 grid-m-6 grid-l-4">
                        <b>{{ $t("Piso") }}:</b>
                        <p>
                          {{ page.data.department.floor }}° {{ $t("piso") }}
                        </p>
                      </div>
                      <div class="grid-s-12 grid-m-6 grid-l-4">
                        <b>{{ $t("Precio total") }}:</b>
                        <p>
                          <template v-if="page.data.isPackage">
                            <template
                              v-if="
                                page.data.department.project_rel
                                  .master_currency_id == 1
                              "
                            >
                              {{
                                page.data.isPackage
                                  ? page.data.department.price_package_format
                                  : page.data.department.price_format
                              }}
                            </template>
                            <template
                              v-else-if="
                                page.data.department.project_rel
                                  .master_currency_id == 2
                              "
                            >
                              {{
                                page.data.isPackage
                                  ? page.data.department
                                      .price_foreign_package_format
                                  : page.data.department.price_foreign_format
                              }}
                            </template>
                          </template>
                          <template v-else>
                            <strong v-if="!departmentUpdated">
                              <template
                                v-if="
                                  page.data.department.project_rel
                                    .master_currency_id == 1
                                "
                              >
                                {{ page.data.department.price_format }}
                              </template>
                              <template
                                v-else-if="
                                  page.data.department.project_rel
                                    .master_currency_id == 2
                                "
                              >
                                {{ page.data.department.price_foreign_format }}
                              </template>
                            </strong>
                            <strong v-else>
                              <template
                                v-if="
                                  departmentAvailable.project_rel
                                    .master_currency_id == 1
                                "
                              >
                                {{ departmentAvailable.price_format }}
                              </template>
                              <template
                                v-else-if="
                                  departmentAvailable.project_rel
                                    .master_currency_id == 2
                                "
                              >
                                {{ departmentAvailable.price_foreign_format }}
                              </template>
                            </strong>
                            <span
                              v-if="departmentUpdated"
                              style="color: #3ddc97; display: block"
                              >{{ $t("Monto actualizado") }}!</span
                            >
                          </template>
                        </p>
                      </div>
                      <div
                        class="grid-s-12 grid-m-6 grid-l-4"
                        v-if="page.data.department.project_rel"
                      >
                        <b>{{ $t("Monto de Separación") }}:</b>
                        <p>
                          <strong>{{
                            page.data.department.project_rel
                              .price_separation_format
                          }}</strong>
                        </p>
                      </div>
                      <!--<div class="grid-s-12" >
                        <div v-if="page.data.department.project_rel.reservation_in_package" v-html="page.data.department.project_rel.package_description">
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
                        </div>
                      </div>-->
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid-s-12 grid-m-12 grid-l-6">
                <div
                  class="movil-padding"
                  :class="noAvailable ? 'dep-no-available' : ''"
                >
                  <template v-if="!noAvailable">
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
                      v-if="page.data.department.project_rel.price_separation"
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
                  </template>
                  <template v-else>
                    <div>
                      <h4>{{ $t("El inmueble ya no está disponible") }}.</h4>
                      <nuxt-link
                        class="btn"
                        @click.native="clearData"
                        :to="localePath({ name: 'reserve' })"
                      >
                        {{ $t("Cambiar inmueble") }}
                      </nuxt-link>
                    </div>
                  </template>
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
  name: "ReserveSlug",
  components: {
    Banner,
    Steps,
    ModalParkingWarehouse
  },
  async validate({ params, $axios, app }) {
    const data = await $axios.$get("/api/page/reserve/" + params.slug, {
      params: { locale: app.i18n.locale },
    });
    if (data.success) {
      return true;
    }
    return false;
  },
  async asyncData({ params, $axios, app }) {
    let { data } = await $axios.get("/api/page/reserve/" + params.slug, {
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
      requestSubmit: false,
      storageUrl: process.env.STORAGE_URL,
      requestAvailable: false,
      noAvailable: false,
      departmentUpdated: false,
      departmentAvailable: {},
    };
  },
  nuxtI18n: {
    paths: {
      es: "/separa-tu-depa/:slug",
      en: "/reserve-your-department/:slug",
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
    submit() {
      this.requestSubmit = true;
      this.customer.slug = this.$route.params.slug;
      //Si se cambia de inmueble
      if (this.customerGlobal.slug != this.customer.slug) {
        this.customer.oi = "";
      }
      this.customer.price = this.page.data.department.price;
      if (this.$route.query.adv) {
        this.customer.adv = this.$route.query.adv;
      }
      this.customer.is_package = this.page.data.isPackage;
      if (this.customer.is_package) {
        this.customer.real_state_package_id =
          this.page.data.department.data_package.id;
      }
      this.$axios
        .$post("/api/reserve/customer", this.customer)
        .then((response) => {
          this.requestSubmit = false;
          this.customer.oi = response.data.order_id;
          this.customer.department = Object.assign(
            {},
            this.page.data.department
          );
          this.$store.dispatch("setCustomer", this.customer);
          if (!this.$route.query.adv) {
            this.$router.push(
              this.localePath({
                name: "reserve-slug-summary",
                params: { slug: this.$route.params.slug },
              })
            );
          } else {
            this.$router.push(
              this.localePath({
                name: "reserve-slug-summary",
                params: { slug: this.$route.params.slug },
                query: { adv: this.$route.query.adv },
              })
            );
          }
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
    $(document).ready(function () {
      $(".fancybox").fancybox();
      });
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