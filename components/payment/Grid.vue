<template>
  <div class="grid-departamentos movil-padding">
    <div class="grid-col">
      <template v-if="loading">
        <div
          class="grid-s-12 grid-m-4 grid-l-3"
          v-for="(el, i) in 12"
          :key="'lo1' + i"
        >
          <PuSkeleton height="350px" ></PuSkeleton>
        </div>
      </template>
      <template v-else>
        <template v-if="data.length">
          <div
            class="grid-s-12 grid-m-4 grid-l-3"
            v-for="(el, i) in data"
            :key="'card' + el.sap_code + i"
          >
            <div class="card-depa-grid">
              <div class="img">
                <a
                  data-fancybox
                  class="fancybox"
                  v-if="el.image"
                  :href="storageUrl + '/img/projects/estates/' + el.image"
                >
                  <img
                    class="lazyload"
                    :data-src="storageUrl + '/img/projects/estates/' + el.image"
                    :alt="el.description"
                  />
                </a>
                <a
                  v-else-if="el.tipology_rel.image"
                  data-fancybox
                  class="fancybox"
                  :href="storageUrl + '/img/projects/tipologies/' + el.tipology_rel.image"
                >
                  <img
                    class="lazyload"
                    :data-src="storageUrl + '/img/projects/tipologies/' + el.tipology_rel.image"
                    :alt="el.description"
                  />
                </a>
                <a
                  v-else
                  data-fancybox
                  class="fancybox"
                  :href="require('~/assets/img/p-no-data.png')"
                >
                  <img
                    class="lazyload"
                    :data-src="require('~/assets/img/p-no-data.png')"
                    :alt="el.description"
                  />
                </a>
              </div>
              <div class="body">
                <div class="card-head">
                  <div class="logo">
                    <img
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
                      class="lazyload"
                    />

                    <strong>{{
                      el.project_rel.status_rel["name_" + $i18n.locale]
                    }}</strong>
                  </div>
                  <div class="card-caract">
                    <div>
                      <i class="flaticon-ubicacion"> </i>
                      {{ el.project_rel.ubigeo_rel.district }} -
                      {{ el.project_rel.ubigeo_rel.department }}
                    </div>
                    <div>
                      <i class="flaticon-blueprint"> </i>
                      {{ el.area_format }}m2
                    </div>
                    <div>
                      <i class="flaticon-cama-matrimonial"> </i>
                      {{ el.tipology_rel.room }}
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <ul>
                    <li v-if="el.description">
                      <strong>{{ el.description }}</strong>
                    </li>
                    <template
                      v-if="
                        el.type_department_id &&
                        el.tipology_rel &&
                        el.tipology_rel.parent_type_department_id
                      "
                    >
                      <li>
                        <b>{{ $t("Tipo") }}:</b>
                        <span>{{
                          el.tipology_rel.parent_type_department_rel.name
                        }}</span>
                      </li>
                    </template>
                    <li>
                      <b>{{ $t("Piso") }}:</b
                      ><span>{{ el.floor }}° {{ $t("piso") }}</span>
                    </li>
                    <li>
                      <b>{{ $t("Vista") }}:</b><span>{{ el.view_rel.name }}</span>
                    </li>
                    
                    <li>
                      <b>{{ $t("Precio inmueble") }}:</b>

                      <span>
                        <template v-if="el.price_foreign">
                          {{ el.price_foreign_format }}
                        </template>
                        <template v-if="!el.price_foreign && el.price">
                          {{ el.price_format }}
                        </template>
                      </span>
                    </li>
                    <li v-if="el.project_rel.reservation_in_package">
                      <span v-html="el.project_rel.package_description"></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="">
                <nuxt-link
                  class="btn-separa btn btn2 next"
                  :to="
                    localePath({
                      name: 'reserve-slug',
                      params: { slug: el.slug },
                    })
                  "
                  v-if="el.project_rel.price_separation"
                >
                  <span
                    >{{ $t("Separar") }}
                    <h4>
                      {{ el.project_rel.price_separation_format }}
                    </h4></span
                  >
                  <i class="flaticon-next"></i>
                </nuxt-link>
              </div>
            </div>
          </div>
        </template>
        <div class="grid-s-12" v-else>
          <div class="text-center mb-2xl">
            <img
              :data-src="require('~/assets/img/p-no-results.png')"
              class="lazyload"
              alt=""
            />
            <h4>
              <strong>{{ $t("No se han encontrado resultados") }}</strong>
            </h4>
            <p>
              {{
                $t(
                  "No podemos encontrar ningún inmueble que coincida con su búsqueda"
                )
              }}
            </p>
          </div>
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