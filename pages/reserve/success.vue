<template>
    <div>
        EXITO

         {{ customer.name }} {{ customer.lastname }}
              {{ customer.lastname_2 }}

              {{ customer.type_document_id }}
              {{ customer.document_number }}

              {{ $t("Teléfono") }}
              {{ customer.mobile }}
              {{ $t("Correo") }}
              {{ customer.email }}


              Orden Registrada

              {{ customer.oi }}


              <div class="container">
                 <Steps active="success" text="Confirmación de Pago" />
             </div>
    </div>
</template>
<script>
import Steps from "../../components/payment/Steps";
export default {
    name: 'ReserveSuccess',
    head () {
        return {
            meta: [
                { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
            ]
        }
    },
    components:{
        Steps
    },
    nuxtI18n: {
        paths: {
        es: "/separa-tu-inmueble/exitoso",
        en: "/reserve-your-property/success",
        },
    },
    data() {
        return {
            customer: {},
            storageUrl: process.env.STORAGE_URL,
        }
    },
    mounted() {
        if (
        Object.entries(this.customerGlobal).length === 0 &&
        this.customerGlobal.constructor === Object
        ) {
        this.$router.push(this.localePath({ name: "index" }));
        }
        else{
            this.customer = Object.assign({},this.customerGlobal);
            console.log("Mounted before clear")
            setTimeout(() => {
                console.log("Clear")
                this.$store.dispatch("setCustomer", {});
                this.$store.dispatch("setExpireLS", null);
            }, 10);
        }
    },
    computed: {
        customerGlobal() {
            return this.$store.getters.getCustomer;
        },
    },
}
</script>