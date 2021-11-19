<template>
  <div class="listado-departamentos">
    <div class="grid-listado cabecera">
      <b>{{ $t("Plano") }}</b>
      <b>{{ $t("Proyecto") }}</b>
      <b>{{ $t("Características") }}</b>
      <b>{{ $t("Metraje") }}</b>
      <b>{{ $t("Dorm.") }}</b>
      <b>{{ $t("Precio total") }}</b>
      <b>{{ $t("Separación") }}</b>
    </div>

    <template v-if="!loading">
        <template v-if="data.length">
      <div
        class="grid-listado card-depa-lista"
        v-for="(el, i) in data"
        :key="el.sap_code + i"
      >
        <div class="img">

             <a
            data-fancybox
            v-if="el.package_rel && el.package_rel.image"
            class="fancybox"
            :href="storageUrl + '/img/projects/combos/' + el.package_rel.image"
          >
            <img
              class="lazyload"
              :data-src="storageUrl + '/img/projects/combos/' + el.package_rel.image"
              :alt="el.description"
            />
          </a>


          <a
            data-fancybox
            class="fancybox"
            v-else-if="el.image"
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

              <!--  <template v-if="el.description">
              <strong>{{
                el.description
              }}</strong>
            </template>
              -->

              <template v-if="el.package_rel && el.package_rel.id">
                     <strong v-for="pack in el.package_rel.departmentsRel" :key="'packdes'+pack.id">{{ pack.description }}</strong>
                      <!-- <strong v-if="el.description">PQ {{ el.description }}</strong>-->
                    </template>
                    <template v-else-if="el.description">
                      <strong>{{ el.description }}</strong>
                    </template>
        </div>
        <div>
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
        </div>
        <div>
          <ul>
            <li>
              <b>{{ $t("Ubicación") }}:</b
              ><span>{{ el.project_rel.ubigeo_rel.district }}</span>
            </li>
            <li>
              <b>{{ $t("Estatus") }}:</b
              ><span>{{
                el.project_rel.status_rel["name_" + $i18n.locale]
              }}</span>
            </li>
            <li
              v-if="
                el.type_department_id &&
                el.tipology_rel &&
                el.tipology_rel.parent_type_department_id
              "
            >
              <b> {{ $t("Tipo") }}:</b
              ><span>{{
                el.tipology_rel.parent_type_department_rel.name
              }}</span>
            </li>
            <li>
              <b>{{ $t("Piso") }}:</b
              ><span>{{ el.floor }}° {{ $t("piso") }}</span>
            </li>
            <li>
              <b>{{ $t("Vista") }}:</b
              ><span>{{
                el.view_rel.name
              }}</span>
            </li>
            
          </ul>
        </div>
        <div>
          <strong>{{ el.area_format }}m2</strong>
        </div>
        <div>
          <strong>{{ el.tipology_rel.room }}</strong>
        </div>
        <div>
          <strong
            ><template v-if="el.project_rel.master_currency_id == 1">
              {{ el.price_format  }}
            </template>
            <template v-else-if="el.project_rel.master_currency_id == 2">
              {{ el.price_foreign_format }}
            </template>
            <!--<template v-if="!el.price && !el.price_foreign">
              {{ $t("No disponible") }}
            </template>--></strong
          >
          <!--<span v-if="el.project_rel.reservation_in_package">
             <span v-html="el.project_rel.package_description"></span>
          </span>-->
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
    <template v-else>
      <div v-for="i in 12" :key="i + 'sk'" style="margin-bottom: 1rem">
        <PuSkeleton height="200px"></PuSkeleton>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    data: Array,
    loading: Boolean,
  },
  data() {
    return {
      storageUrl: process.env.STORAGE_URL,
    };
  },
};
</script>