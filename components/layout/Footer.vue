<template>
  <footer>
    <div class="container">
      <div class="grid-footer padding-footer">
        <div class="color-white wow fadeInUp">
          <div class="title2">
            <h5>{{ $t('Contacto')}}</h5>
            <ul>
              <li v-if="footer.information && footer.information.central_phone">
                <b>{{ $t('Central de ventas')}}:</b>
                <a class="text-underline" :href="'tel:01'+footer.information.central_phone">{{ footer.information.central_phone_formatted }}</a>
              </li>
              <li v-if="footer.information && footer.information.main_office">
                <b>{{ $t('Oficina principal')}}:</b>
                <a class="text-underline" :href="'tel:01'+footer.information.main_office">{{ footer.information.main_office_formatted }}</a>
              </li>
            </ul>
            <ul v-if="footer.information && footer.information.email">
              <li><b>{{ $t('Informes')}}:</b> {{ footer.information.email }}</li>
            </ul>
            <ul v-if="footer.information && footer.information.location">
              <li>
                <b>{{ $t('Ubicación oficinas')}}:</b>
                <div
                  style="display: inline"
                  v-html="footer.information.location"
                ></div>
              </li>
            </ul>
          </div>
        </div>
        <div class="fotter-redes wow fadeInUp">
          <div class="title2 center">
            <h5>{{ $t('Redes Sociales')}}</h5>
          </div>

          <ul>
            <li
              v-for="(social, index) in footer.social_networks"
              :key="'sm' + index"
            >
              <a
                class="btn-circle blanco"
                :href="social.url"
                target="_blank"
                rel="noopener"
              >
                <i
                  :class="'flaticon-' + social.master_social_networks.icon"
                  v-if="social.master_social_networks.icon"
                ></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="wow fadeInUp">
          <div class="title2">
            <h5>{{ $t('Documentos')}}</h5>
          </div>
          <ul>
            <li>
              <a
                :href="footer.information.billing_url"
                target="_blank"
                v-if="footer.information && footer.information.billing_url"
                >{{ $t('Comprobantes electrónicos')}}</a
              >
            </li>
            <li>
              <nuxt-link  :to="localePath('terms-conditions')">{{ $t('Términos y Condiciones')}}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('privacy-policies')">{{ $t('Políticas de privacidad de datos')}}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="pie">
        <div class="certificados wow fadeInLeft" data-wow-delay="0.5s">
          <div
            class="grid-certificado"
            v-if="footer.members && footer.members.length"
          >
            <h6>{{$t('Miembros de')}}:</h6>
            <img
              class="lazyload"
              v-for="(el, index) in footer.members"
              :key="'p' + index"
              :data-src="storageUrl + '/img/members/' + el.image"
              :alt="el.name"
            />
          </div>
          <div
            class="grid-certificado"
            v-if="footer.certificates && footer.certificates.length"
          >
            <h6>{{$t('Certificados por')}}:</h6>
            <img
              class="lazyload"
              v-for="(el, index) in footer.certificates"
              :key="'p' + index"
              :data-src="storageUrl + '/img/certifications/' + el.image"
              :alt="el.name"
            />
          </div>
        </div>
        <div class="developer wow fadeInRight" data-wow-delay="0.5s">
          © Copyright Lider Grupo Constructor {{ new Date().getFullYear() }} - {{$t('Desarrollado por')}}
          <a href="https://playgroup.pe" target="_blank"
            >
            PLAY Group</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  computed: {
    footer() {
      return this.$store.getters.getFooter;
    },
  },
  methods: {},
  data() {
    return {
      storageUrl: process.env.STORAGE_URL,
    };
  },
};
</script>