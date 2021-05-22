<template>
    <div>
        ERROR
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
}
</script>