<template>
    <div>
        EXITO
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
}
</script>