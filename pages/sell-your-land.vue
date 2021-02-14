<template>
    <main class="sell-your-land">
<Banner>
      <div class="no-movil grid-col-2">
        <nuxt-link :to="localePath('contact')" class="btn">{{ $t('Contact')}}</nuxt-link>
          <nuxt-link :to="localePath('work-with-us')" class="btn">{{ $t('Trabaja con nosotros')}}</nuxt-link>
      </div>
    </Banner>

    <section class="section section-contacto">
      <div class="container">
        <div class="grid-col">
          <div class="grid-s-12 grid-m-12 grid-l-6">
            <div class="content wow fadeInUp" data-wow-delay="1.5s">
              <h2><b>Déjanos tu consulta</b></h2>
              <p>
                Envianos tus datos y tu {{ $t("Mensaje")}} de consulta para que un asesor
                pueda resolverlo.
              </p>
              <transition name="slide-fade">
                <div v-if="success" key="true" class="form__text-success-2">
                    <h3>
                        <strong>¡Listo!</strong>
                    </h3>
                    <p>Te contactaremos muy pronto.</p>
                </div>
                <form v-else key="false" @submit.prevent="submit">
                <div class="grid-col">
                  <div class="grid-s-12 grid-m-6 grid-l-6">
                    <div class="form-control">
                      <label for="name">{{ $t("Nombre")}}*</label>
                      <input type="text" id="name" v-model="form.name" />
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
                      <label for="mobile">{{ $t("Teléfono")}}*</label>
                      <input
                        type="text"
                        id="mobile"
                        v-model="form.mobile"
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
                      <label for="email">{{ $t("Correo")}}*</label>
                      <input
                        type="text"
                        id="email"
                        v-model="form.email"
                      />
                      <span
                        class="error error-red"
                        v-if="errors && errors.email"
                        for="email"
                        >{{ $t(errors.email[0]) }}</span
                      >
                    </div>
                  </div>
                  <div class="grid-s-12 grid-m-6 grid-l-6">
                    <div class="form-control">
                      <label for="area">Área*</label>
                      <input
                        type="text"
                        id="area"
                        v-model="form.area"
                      />
                      <span
                        class="error error-red"
                        v-if="errors && errors.area"
                        for="area"
                        >{{ $t(errors.area[0]) }}</span
                      >
                    </div>
                  </div>
                  <div class="grid-s-12">
                    <div class="form-control">
                      <label for="message">{{ $t("Mensaje")}}*</label>
                      <textarea
                        name="message"
                        id="message"
                        v-model="form.message"
                        cols="30"
                        rows="5"
                      ></textarea>
                      <span
                        class="error error-red"
                        v-if="errors && errors.message"
                        for="message"
                        >{{ $t(errors.message[0]) }}</span
                      >
                    </div>
                  </div>
                  <div class="grid-s-12">
                    <button type="submit" :class="request ? 'btn--opacity' : ''" :disabled="request" class="w-100 btn btn2">
                      {{ request ? $t("Cargando")+"..." : $t("Enviar") }} </button>
                  </div>
                </div>
              </form>
              </transition>
              
            </div>
          </div>
        </div>
      </div>
      <div class="banner-contact wow fadeInRight" data-wow-delay="1.5s">
        <img src="public/img/contacto/fondo-contacto.png" alt="" />
      </div>
    </section>
    <section class="section si-movil-contacto bg1" style="display: none">
      <div class="container">
        <div class="grid-col-2">
          <nuxt-link :to="localePath('contact')" class="btn">{{ $t('Contact')}}</nuxt-link>
          <nuxt-link :to="localePath('work-with-us')" class="btn">{{ $t('Trabaja con nosotros')}}</nuxt-link>
        </div>
      </div>
    </section>
    </main>
</template>
<script>
import Banner from "../components/Banner";
export default {
  components: {
    Banner,
  },
  nuxtI18n: {
    paths: {
      en: "/sell-your-land",
      es: "/vende-tu-terreno",
    },
  },
  data(){
      return{
          request: false,
          form:{

          },
          success: false,
          errors:{}
      }
  },
  methods:{
      submit() {
        this.request = true;
        this.$axios
            .$post("/api/post/lead/sell-land", this.form)
            .then((response) => {
            this.request = false;
            this.success = true;
            })
            .catch((error) => {
            this.request = false;
            if (error.response.status === 422) {
                this.errors = error.response.data.errors || {};
                return;
            }
            });
        },
  }
};
</script>