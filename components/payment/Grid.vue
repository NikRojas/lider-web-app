<template>
  <div>
    <div class="grid-col">
      <template v-if="loading">
            <div
              class="grid-s-12 grid-m-6 grid-l-3"
              v-for="(el, i) in 8"
              :key="'lo1' + i"
            >
              <PuSkeleton height="300px"></PuSkeleton>
            </div>
          </template>
          <template v-else>
            <template v-if="data.length">
              <div
                class="grid-s-12 grid-m-6 grid-l-3"
                style="margin-bottom: 1rem"
                v-for="(el, i) in data"
                :key="'card' + el.sap_code + i"
              >
                <div class="card">
                  <h1>{{ el.id }}</h1>
                  <img
                    v-if="el.image"
                    :data-src="storageUrl + '/img/projects/estates/' + el.image"
                    :alt="$t('Plano') + ' ' + el.description"
                    height="100"
                    class="lazyload img--width-auto"
                  />
                    <div>
                  <img
                    height="30"
                    :data-src="
                      storageUrl + '/img/projects/' + el.project_rel.logo_colour
                    "
                    :alt="
                      $t('Proyecto') +
                      ' ' +
                      el.project_rel['name_' + $i18n.locale] +
                      ' ' +
                      i
                    "
                    class="logo-p2 lazyload img--width-auto"
                  />

            {{ el.project_rel.status_rel["name_" + $i18n.locale] }}
                  </div>

                  {{ el.project_rel.ubigeo_rel.district }} -
                  {{ el.project_rel.ubigeo_rel.department }} <br />

                  {{ el.tipology_rel.area }}m2


                  ROOMS:
                  {{ el.tipology_rel.room }}

                  <br /><br />

                  {{ $t("Estatus") }}:
                  {{ el.project_rel.status_rel["name_" + $i18n.locale] }}<br />
                  <template v-if="el.type_department_id && el.tipology_rel && el.tipology_rel.parent_type_department_id"
                    >{{ $t("Tipo") }}: {{ el.tipology_rel.parent_type_department_rel.name }} <br
                  /></template>
                  {{ $t("Piso") }}: {{ el.floor }}° {{ $t("piso") }} <br />
                  {{ $t("Vista") }}: {{ el.view_rel.name }} <br />

                  {{ $t("Precio inmueble") }}:

                  <template v-if="el.price_foreign">
                    {{ el.price_foreign_format }}
                  </template>
                  <template v-if="!el.price_foreign && el.price">
                    {{ el.price_format }}
                  </template>

                  <br />
                  <br />
                  <br />
                  <br />
                  <br />

                  <nuxt-link :to="localePath({ name: 'reserve-slug', params: { slug: el.slug } })" v-if="el.project_rel.price_separation">
                    {{ $t("Precio separación") }}
                    {{ el.project_rel.price_separation_format }}
                  </nuxt-link>
                </div>
              </div>
            </template>
            <div class="grid-s-12" v-else>
              No hay datos
            </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    loading: Boolean,
    data: Array,
  },
  data() {
    return {
      storageUrl: process.env.STORAGE_URL,
    };
  },
};
</script>