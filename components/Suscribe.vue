<template>
  <div
    class="suscribete lazyload"
    :data-bg="
        banner
          ? storageUrl + '/img/content/' + banner
          : ''
      "
  >
    <div class="grid-col">
      <div class="grid-s-12 grid-m-5 grid-l-5 no-movil">
        
        <div class="img" v-if="image">
          <img class="lazyload" :data-src="storageUrl + '/img/content/' + image" alt="" />
        </div>
      </div>
      <div class="grid-s-12 grid-m-7 grid-l-7">
        <div class="content">
          <h3>
            <b>{{ $t("Suscríbete") }}</b>
          </h3>
          <p>{{ $t("Ingresa tu correo y mantente informado")}}</p>
          <transition name="slide-fade">
                <div v-if="success" key="true" class="form__text-success-2">
                    <h3>
                        <strong>¡{{$t('Listo')}}!</strong>
                    </h3>
                    <p>{{ $t('Te mantendremos informado')}}.</p>
                </div>
                <form v-else key="false" @submit.prevent="submit">
                    <div class="grid-col">
                    <div class="grid-s-12 grid-m-6 grid-l-6">
                        <div class="form-control">
                        <label for="name">{{ $t("Nombre y apellido")}}*</label>
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
                        <label for="email">{{ $t("Correo") }}*</label>
                        <input type="text" id="email" v-model="form.email" />
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
                            v-model="form.accepted"
                            class="checkbox"
                            id="accepted"
                            type="checkbox"
                        />
                        <label 
                            >{{ $t("He leído y acepto las") }}
                            <a target="_blank" :href="localePath('privacy-policies')">{{ $t("Políticas de privacidad") }}</a
                            >.</label
                        >
                        <span
                            class="error error-red"
                            v-if="errors && errors.accepted"
                            for="accepted"
                            >{{ $t(errors.accepted[0]) }}</span
                        >
                        </div>
                    </div>
                    <div class="grid-12">
                        <button type="submit" :class="request ? 'btn--opacity' : ''" :disabled="request" class="btn btn2 w-100">{{ request ? $t("Cargando")+"..." : $t("Enviar") }}</button>
                    </div>
                    </div>
                </form>
          </transition>
        </div>
      </div>
      <div class="grid-s-12 si-movil" style="display: none">
        <div class="img" v-if="image">
          <img class="lazyload" :data-src="storageUrl + '/img/content/' + image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
   props:{
        image: String,
        banner: String
    }   ,
    data(){
        return{
            form:{},
            request: false,
            errors:{},
            success: false,
            storageUrl: process.env.STORAGE_URL,
        }
    },
    methods:{
        submit() {
        this.request = true;
        this.$axios
            .$post("/api/post/suscribe", this.form)
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
}
</script>