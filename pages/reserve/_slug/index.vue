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
      <div class="container">
        <Steps active="reserve" text="Datos de reserva" />

        {{ $t("Datos de reserva") }}
        <div class="grid-col">
          <div class="grid-s-12 grid-m-6">
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
              <br
            /></template>
            {{ $t("Piso") }}: {{ page.data.department.floor }}°
            {{ $t("piso") }} <br />
            {{ $t("Vista") }}: {{ page.data.department.view_rel.name }} <br />

            {{ $t("Metraje") }}: {{ page.data.department.tipology_rel.area }}m2
            {{ $t("Dormitorios") }} :
            {{ page.data.department.tipology_rel.room }}

            {{ $t("Precio inmueble") }}:

            <div v-if="!departmentUpdated">
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
            <div v-else>
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
            </div>

            <div v-if="departmentUpdated">Monto actualizado</div>
            <br /><br /><br />
            {{ $t("Precio separación") }}
            <template v-if="page.data.department.project_rel">
              {{ page.data.department.project_rel.price_separation_format }}
            </template>
          </div>
          <div class="grid-s-12 grid-m-6">
            <template v-if="!noAvailable">
              {{ $t("Ingresa tus datos") }}
              <form @submit.prevent="submit" id="">
                <div class="grid-col">
                  <div class="grid-s-12">
                    <div class="form-control">
                      <label for="name">{{ $t("Nombre") }}*</label>
                      <input type="text" id="name" v-model="customer.name" />
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
                      <label for="type_document_id"
                        >{{ $t("Tipo de documento") }}*</label
                      >
                      <select name="" id="" v-model="customer.type_document_id">
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
                      <label for="phone">{{ $t("Teléfono") }}*</label>
                      <input type="text" id="phone" v-model="customer.mobile" />
                      <span
                        class="error error-red"
                        v-if="errors && errors.mobile"
                        for="mobile"
                        >{{ $t(errors.mobile[0]) }}</span
                      >
                    </div>
                  </div>
                  <div class="grid-s-12">
                    <div class="form-control">
                      <label for="email">{{ $t("Correo") }}*</label>
                      <input type="text" id="email" v-model="customer.email" />
                      <span
                        class="error error-red"
                        v-if="errors && errors.email"
                        for="email"
                        >{{ $t(errors.email[0]) }}</span
                      >
                    </div>
                  </div>
                  <div class="grid-s-12">
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
                  <div class="grid-s-12">
                    <button
                      v-if="page.data.department.project_rel.price_separation"
                      type="submit"
                      :class="requestSubmit ? 'btn--opacity' : ''"
                      :disabled="requestSubmit"
                      class="btn btn2"
                    >
                      {{
                        requestSubmit
                          ? $t("Cargando") + "..."
                          : $t("Realizar el pago")
                      }}
                    </button>
                  </div>
                </div>
              </form>
            
            </template>
            <template v-else>
              No esta disponible en estos momentos
              <nuxt-link
                class="btn"
                :to="localePath({ name: 'reserve' })"
              >
                {{ $t("Cambiar inmueble") }}
              </nuxt-link>
            </template>
          </div>

          <nuxt-link
            class="btn"
            :to="localePath({ name: 'reserve' })"
            v-if="!noAvailable"
          >
            {{ $t("Cambiar inmueble") }}
          </nuxt-link>
        </div>

        <div v-if="requestAvailable">
          {{ $t("Obteniendo Disponibilidad") }}
        </div>
      </div>
    </section>
  </main>
</template>
      
<script>
import Banner from "../../../components/Banner";
import Steps from "../../../components/payment/Steps";
export default {
  name: 'ReserveSlug',
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
        name: ''
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
      es: "/separa-tu-inmueble/:slug",
      en: "/reserve-your-property/:slug",
    },
  },
  methods: {
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
      this.customer.price = this.page.data.department.price;
      this.$axios
        .$post("/api/reserve/customer", this.customer)
        .then((response) => {
          this.requestSubmit = false;
          this.$store.dispatch("setCustomer", this.customer);
          this.$router.push(
            this.localePath({
              name: "reserve-slug-summary",
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
    //this.getAvailable();
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