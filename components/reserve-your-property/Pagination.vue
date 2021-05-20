<template>
    <div class="text-center">
        <ul>

            <li class="page-item" v-if="data.current_page > 1">
              <a
                href="#"
                class="page-link rounded-circle"
                @click.prevent="clickPrevPage()"
                
              >
                Anterior
              </a>
            </li>


            <li class="page-item" v-for="page in pages" :key="page" v-bind:class="[ page == data.current_page ? 'active' : '']">
                <a class="page-link" href="#" @click.prevent="clickPage(page)">{{ page }}</a>
           </li>

            <li class="page-item"  v-if="data.current_page < data.last_page">
              <a
                href="#"
                class="page-link"
                @click.prevent="clickNextPage()"
               
              >
                Siguiente
              </a>
            </li>
        </ul>

        {{ data.total }} {{ $t('inmuebles') }}
    </div>
</template>
<style lang="scss" scoped>
ul{
    margin-top: 20px;
    margin-bottom: 20px;
    li{
            display: inline-flex;

    }
}
.page-link{
    padding: 5px;

}
.active{
    a{
        color: white !important;
        background: black;
    }
}
</style>
<script>
export default {
    props:{
        data: Object
    },
    data(){
        return{
            //active: 0,
            offset: 2
        }
    },
    computed: { 
    	pages(){
                if (!this.data.to) {
                    return [];
                }
                var from = this.data.current_page - this.offset;
                if (from < 1) {
                    from = 1;
                }
                var to = this.data.from + (this.offset * 2);
                if (to >= this.data.last_page) {
                    to = this.data.last_page;
                }
                var pages = [];
                while (from <= to) {
                    pages.push(from);
                    from++;
                }
                return pages;
            }
    },
    methods:{
        clickPage(page){
            this.$emit("get", page);
        },
        clickNextPage(){
            this.$emit('get', this.data.current_page + 1);
        },
         clickPrevPage(){
this.$emit('get', this.data.current_page - 1);
        },
    }
}
</script>