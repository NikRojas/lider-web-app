<template>
  <nuxt-link :to="localePath({ name: 'projects-slug', params: { slug: el['slug_'+$i18n.locale] } })">
    <div class="card card-proyecto wow fadeInUp">
      <div class="proyecto-body">
        <div class="head-proyect">
          <div class="proyect-logo">
            <img
              :data-src="storageUrl + '/img/projects/' + el.logo"
              alt=""
              class="logo-p1 lazyload"
            />
            <img
              :data-src="storageUrl + '/img/projects/' + el.logo_colour"
              alt=""
              class="logo-p2 lazyload"
              style="display: none"
            />
          </div>
          <div class="estado">
            <span>{{ el.status_rel["name_" + $i18n.locale] }}</span>
          </div>
        </div>
        <div class="img-proyecto">
          <img
            :data-src="storageUrl + '/img/projects/' + el.images_format[0]"
            alt=""
            class="fachada lazyload"
          />
          <div class="interna" style="opacity: 0">
            <img src="public/img/proyectos/interna-unno.jpg" alt="" />
          </div>
        </div>
        <div class="ubicacion">
          <i class="flaticon-ubicacion"> </i> {{ el.ubigeo_rel.department }} -
          {{ el.ubigeo_rel.district }}
        </div>
      </div>
      <div class="contect-proyect">
        <div class="caract">
          <div>
            <i class="flaticon-cama-matrimonial"> </i>
            {{ el["rooms_" + $i18n.locale] }}
          </div>
          <div>
            <i class="flaticon-blueprint"> </i>
            {{ el["footage_" + $i18n.locale] }}
          </div>
        </div>
        <div class="line"></div>
        <div class="price">
          <strong>{{ $t("desde") }}</strong>
          <template v-if="el.price_total_foreign">
            <h4>{{ el.price_total_foreign_format }}</h4>
          </template>
          <template v-if="!el.price_total_foreign && el.price_total">
            <h4>{{ el.price_total_format }}</h4>
          </template>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    el: Object,
  },
  data() {
    return {
      storageUrl: process.env.STORAGE_URL,
    };
  },
};
</script>