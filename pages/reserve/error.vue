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

        <section class="section " style="padding-bottom: 120px;">
            <div class="container">
                <div class="text-center text-error">
                    <img height="100" :data-src="require('~/assets/img/izipay.jpg')" class="lazyload" alt="">
                    <p><strong>Pasarela de Pagos Izipay</strong></p>
                    <br>
                    <h3><b>{{ $t('La transacción no fue realizada') }}</b></h3>
                    <p>{{ $t('Ingresa otro método de pago e intenta hacer tu pedido nuevamente') }}</p>
                    <br>
                    <nuxt-link :to="localePath({ name: 'reserve' })" class="btn">{{ $t('Regresar') }}</nuxt-link>
                </div>
            </div>
        </section>
    </main>
</template>
<script>
import Banner from "../../components/Banner";
export default {
    name: 'ReserveError',
    head () {
        return {
            meta: [
                { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
            ]
        }
    },
    components:{
        Banner
    },
    data(){
        return{
            page:{}
        }
    },
    async asyncData({ params, $axios, app }) {
        let { data } = await $axios.get("/api/page/reserve", {
        params: { locale: app.i18n.locale },
        });
        return { page: data };
    },    
    nuxtI18n: {
        paths: {
            es: "/separa-tu-inmueble/error",
            en: "/reserve-your-property/error",
        },
    },
    mounted() {
        if (
        Object.entries(this.customerGlobal).length === 0 &&
        this.customerGlobal.constructor === Object
        ) {
            this.$router.push(this.localePath({ name: "index" }));
        } 
        else{
            setTimeout(() => {
                console.log("Clear")
                this.$store.dispatch("setCustomer", {});
                this.$store.dispatch("setExpireLS", null);
            }, 10);
        }
    },
    computed: {
        errorMessage() {
            return this.$store.getters.getErrorMessage;
        },
        customerGlobal() {
            return this.$store.getters.getCustomer;
        },
    },
}
</script>