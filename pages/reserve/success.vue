<template>
    <div>
        EXITO

         {{ customerGlobal.name }} {{ customerGlobal.lastname }}
              {{ customerGlobal.lastname_2 }}

              {{ customerGlobal.type_document_id }}
              {{ customerGlobal.document_number }}

              {{ $t("Teléfono") }}
              {{ customerGlobal.mobile }}
              {{ $t("Correo") }}
              {{ customerGlobal.email }}


              Orden Registrada

              {{ customerGlobal.oi }}
    </div>
</template>
<script>
export default {
    name: 'ReserveSuccess',
    head () {
        return {
            meta: [
                { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
            ]
        }
    },
    nuxtI18n: {
        paths: {
        es: "/separa-tu-inmueble/exitoso",
        en: "/reserve-your-property/success",
        },
    },
    mounted() {
        if (
        Object.entries(this.customerGlobal).length === 0 &&
        this.customerGlobal.constructor === Object
        ) {
        this.$router.push(this.localePath({ name: "index" }));
        }
    },
    /*beforeDestroy() {
        //Clear
        this.$store.dispatch("setCustomer", {});
    },*/
    destroyed() {
        //Clear
        this.$store.dispatch("setCustomer", {});
    },
    computed: {
        customerGlobal() {
            return this.$store.getters.getCustomer;
        },
    },
}
</script>