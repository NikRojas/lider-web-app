<template>
    <div>
        <table width="100%">
            <thead>
                <tr>
                    <th>{{ $t('Plano') }}</th>
                    <th>{{ $t('Proyecto') }}</th>
                    <th>{{ $t('Características') }}</th>
                    <th>{{ $t('Metraje') }}</th>
                    <th>{{ $t('Dormitorios') }}</th>
                    <th>{{ $t('Precio inmueble') }}</th>
                    <th>{{ $t('Separación') }}</th>
                </tr>
            </thead>
            <tbody v-if="!loading">
                <tr v-for="(el,i) in data" :key="el.sap_code+i">
                    <td class="text-center">
                        <img v-if="el.image" :data-src="storageUrl + '/img/projects/estates/' + el.image"
                            :alt="$t('Plano')+' '+el.description"
                            height="100"
                            class="lazyload img--width-auto">
                    </td>
                    <td class="text-center">
                        <img
                            height="30"
                            :data-src="storageUrl + '/img/projects/' + el.project_rel.logo_colour"
                            :alt="$t('Proyecto')+' '+el.project_rel['name_'+ $i18n.locale]+' '+i"
                            class="logo-p2 lazyload img--width-auto"
                            />
                    </td>
                    <td class="text-center">
                        {{ $t('Ubicación')}}: {{ el.project_rel.ubigeo_rel.district }}<br>
                        {{ $t('Estatus')}}: {{ el.project_rel.status_rel['name_' + $i18n.locale] }}<br>
                        <template v-if="el.type_department_id">{{ $t('Tipo')}}: {{ el.tipology_rel.name}} <br></template>
                        {{ $t('Piso')}}: {{ el.floor}} {{$t('Piso')}} <br>
                        {{ $t('Vista')}}: {{ el.view_rel.name }} <br>
                    </td>
                    <td class="text-center">
                        {{ el.tipology_rel.area}}m2
                    </td>
                     <td class="text-center">
                        {{ el.tipology_rel.parent_type_department_rel.room}}
                    </td>
                    <td class="text-center">
                        <template v-if="el.price_foreign">
                        {{ el.price_foreign_format }}
                        </template>
                        <template v-if="!el.price_foreign && el.price">
                            {{ el.price_format }}
                        </template>
                        <template v-if="!el.price && !el.price_foreign">
                        No disponible
                        </template>
                    </td>
                    <td class="text-center">
                        <nuxt-link to="index" v-if="el.project_rel.price_separation">
                            {{ $t('Separar')}}
                            {{ el.project_rel.price_separation_format}}
                        </nuxt-link>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr v-for="j in 6" :key="j+'row'">
                    <td>
                        <PuSkeleton height="100px"></PuSkeleton>
                    </td>
                    <td>
                        <PuSkeleton height="100px"></PuSkeleton>
                    </td>
                    <td>
                        <PuSkeleton height="100px"></PuSkeleton>
                    </td>
                    <td>
                        <PuSkeleton height="100px"></PuSkeleton>
                    </td>
                    <td>
                        <PuSkeleton height="100px"></PuSkeleton>
                    </td>
                    <td>
                        <PuSkeleton height="100px"></PuSkeleton>
                    </td>
                    <td>
                        <PuSkeleton height="100px"></PuSkeleton>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
table td{
    border: 1px solid red;
    padding: 1.5rem;
}
</style>
<script>
export default {
    props:{
        data: Array,
        loading: Boolean,
    },
    data() {
        return {
        storageUrl: process.env.STORAGE_URL,
        };
    },
}
</script>