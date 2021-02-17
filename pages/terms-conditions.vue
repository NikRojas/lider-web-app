<template>
    <main class="main_page">
        <Banner :banner="page.data.content[
                  page.data.content.findIndex((x) => x.name === 'Banner')
                ].content_formatted.includes('image') ? 
                page.data.content[
                  page.data.content.findIndex((x) => x.name === 'Banner')
                ].content.find((x) => x.field === 'image').value : ''" :title="page.data.content[page.data.content.findIndex(x => x.name === 'Banner')].content_formatted.includes('title')
            && page.data.content[page.data.content.findIndex(el => el.name === 'Banner')].content.find(x => x.field === 'title')['value_'+$i18n.locale] ?
            page.data.content[page.data.content.findIndex(el => el.name === 'Banner')].content.find(x => x.field === 'title')['value_'+$i18n.locale]
            : ''">
    </Banner>
    </main>
</template>
<script>
import Banner from "../components/Banner";
export default {
    components:{
        Banner
    },
    async asyncData({ params, $axios, app }) {
        let { data } = await $axios.get("/api/page/terms-conditions", {
        params: { locale: app.i18n.locale },
        });
        return { page: data };
    },
    data(){
        return{
            page:{}
        }
    },
    nuxtI18n: {
        paths: {
        en: "/terms-conditions",
        es: "/terminos-condiciones",
        },
    },
}
</script>