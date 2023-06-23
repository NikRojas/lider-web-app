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
                <!--<b>{{ $t('Ubicación oficinas')}}:</b>-->
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
                <svg style="vertical-align:middle;" height="25px" fill="#fff" v-if="social.master_social_networks.name == 'Tiktok'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.0004 2V8.41396C10.5947 8.33909 10.1768 8.3 9.75039 8.3C5.96724 8.3 2.90039 11.3668 2.90039 15.15C2.90039 18.9332 5.96724 22 9.75039 22C13.5335 22 16.6004 18.9332 16.6004 15.15V11.4136C17.6366 11.8539 18.7662 12.1 20.0005 12.1H21.0005V6.5H20.0005C18.0966 6.5 16.6004 4.96259 16.6004 3V2H11.0004ZM13.0004 4H14.688C15.0818 6.22009 16.7673 7.99607 19.0005 8.4091V10.0282C17.9624 9.87602 17.0253 9.48645 16.1567 8.905L14.6004 7.86327V15.15C14.6004 17.8286 12.429 20 9.75039 20C7.07181 20 4.90039 17.8286 4.90039 15.15C4.90039 12.4714 7.07181 10.3 9.75039 10.3C9.83431 10.3 9.91769 10.3021 10.0005 10.3063V11.9095C9.91795 11.9032 9.83454 11.9 9.75039 11.9C7.95547 11.9 6.50039 13.3551 6.50039 15.15C6.50039 16.9449 7.95547 18.4 9.75039 18.4C11.5453 18.4 13.0004 16.9449 13.0004 15.15C13.0004 11.4334 12.9992 7.71665 13.0004 4ZM8.50039 15.15C8.50039 14.4596 9.06003 13.9 9.75039 13.9C10.4407 13.9 11.0004 14.4596 11.0004 15.15C11.0004 15.8404 10.4407 16.4 9.75039 16.4C9.06003 16.4 8.50039 15.8404 8.50039 15.15Z"></path></svg>
                <i
                  :class="'flaticon-' + social.master_social_networks.icon"
                  v-else
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
            <!--<li>
              <nuxt-link  :to="localePath('terms-conditions')">{{ $t('Términos y Condiciones')}}</nuxt-link>
            </li>-->
            <li>
              <nuxt-link :to="localePath('privacy-policies')">{{ $t('Políticas de privacidad de datos')}}</nuxt-link>
            </li>
            <li>
              <nuxt-link :to="localePath('personal-data-form')">{{ $t('Formulario sobre datos personales')}}</nuxt-link>
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
          © Copyright Lider Grupo Constructor {{ new Date().getFullYear() }} - 
         
          <a href="https://playgroup.pe" target="_blank"
            >  
            {{$t('Desarrollado por')}}
            <div class="img-dev">
            <img :data-src="require('~/assets/img/logo-play.svg')" class="lazyload">
            <img class="lazyload litt" :data-src="require('~/assets/img/lid.png')">
          </div>
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