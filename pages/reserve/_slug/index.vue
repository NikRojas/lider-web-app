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
              <h2>{{ $t("Datos de reserva") }}</h2>
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
                  <h4><b>{{ $t("Obteniendo Disponibilidad") }}</b></h4>
                </div>

                <div class="content-bg">
                  <h5>
                    <b>{{ $t("Datos del inmueble") }}</b>
                  </h5>
                  <img
                    v-if="page.data.department.image"
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
                  />
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
                        <p>{{ page.data.department.area_format }}m2</p>
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
                        <b>{{ $t("Precio del inmueble") }}:</b>
                        <p>
                          <strong v-if="!departmentUpdated">
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
                          </strong>
                          <strong v-else>
                            <template v-if="departmentAvailable.price_foreign">
                              {{ departmentAvailable.price_foreign_format }}
                            </template>
                            <template
                              v-if="
                                !departmentAvailable.price_foreign &&
                                departmentAvailable.price
                              "
                            >
                              {{ departmentAvailable.price_format }}
                            </template>
                          </strong>
                          <span v-if="departmentUpdated" style="color: #3ddc97; display:block;"
                            >{{ $t("Monto actualizado") }}!</span
                          >
                        </p>
                      </div>
                      <div
                        class="grid-s-12 grid-m-6 grid-l-4"
                        v-if="page.data.department.project_rel"
                      >
                        <b>{{ $t("Precio separación") }}:</b>
                        <p>
                          <strong>{{
                            page.data.department.project_rel
                              .price_separation_format
                          }}</strong>
                        </p>
                      </div>
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
                    <form @submit.prevent="submit" id="formp">
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
                              type="text"
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
                      class="next btn btn2"
                    >
                      {{
                        requestSubmit
                          ? $t("Cargando") + "..."
                          : $t("Realizar el pago")
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
import Banner from "../../../components/Banner";
import Steps from "../../../components/payment/Steps";
export default {
  name: "ReserveSlug",
  components: {
    Banner,
    Steps,
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
      if(this.customerGlobal.slug != this.customer.slug){
        this.customer.oi = "";
      }
      this.customer.price = this.page.data.department.price;
      if (this.$route.query.adv) {
        this.customer.adv = this.$route.query.adv;
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