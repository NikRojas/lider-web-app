<template>
    <div style="">
        ERROR
        <div class="text-center">
            {{ errorMessage }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'ReserveError',
    head () {
        return {
            meta: [
                { hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
            ]
        }
    },
    nuxtI18n: {
        paths: {
            es: "/separa-tu-inmueble/error",
            en: "/reserve-your-property/error",
        },
    },
    mounted() {
        if (
        this.errorMessage
        ) {
        this.$router.push(this.localePath({ name: "index" }));
        }
    },
    computed: {
        errorMessage() {
            return this.$store.getters.getErrorMessage;
        },
    },
}
</script>