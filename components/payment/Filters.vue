<template>
  <div>
    <div class="grid-col">
      <div class="grid-s-12 grid-m-6 grid-l-2">
        <h2>{{ $t("Ciudad - Distrito") }}:</h2>
        <div
          class="form-control first"
          v-for="(el,i) in data.departments"
          :key="'dep' + el.code_ubigeo+i"
        >
          <template v-if="el.department">
            <input
              class="checkbox"
              :id="'dep' + el.code_department"
              v-model="departments"
              type="checkbox"
              :value="el.code_department"
            />
            <label :for="'dep' + el.code_department">{{ el.department }} {{ el.code_department }}</label>
          </template>
          <template v-else>
            <input
              class="checkbox"
              :id="'ubi' + el.code_ubigeo"
              type="checkbox"
              v-model="departments"
              :value="el.code_ubigeo"
            />
            <label :for="'ubi' + el.code_ubigeo">{{ el.district }}</label>
          </template>
        </div>
      </div>
      <div class="grid-s-12 grid-m-6 grid-l-2">
        <h2>{{ $t("Estatus") }}:</h2>
        <div
          class="form-control first"
          v-for="el in data.status"
          :key="'stat' + el.id"
        >
        <input
              class="checkbox"
              :id="'stat' + el.id"
              type="checkbox"
              :value="el.id"
              v-model="statuses"
            />
            <label :for="'stat' + el.id">{{ el["name_" + $i18n.locale] }}</label>
        </div>
      </div>
      <div class="grid-s-12 grid-m-6 grid-l-2">
        <h2>{{ $t("Proyecto") }}:</h2>
        <div
          class="form-control first"
          v-for="el in data.projects"
          :key="'proj' + el.id"
        >
        <input
              class="checkbox"
              :id="'proj' + el.id"
              type="checkbox"
              :value="el.id"
              v-model="projects"
            />
            <label :for="'proj' + el.id">{{ el["name_" + $i18n.locale] }}</label>
        </div>
      </div>
      <div class="grid-s-12 grid-m-6 grid-l-2">
        <h2>{{ $t("Tipo de departamento") }}:</h2>
        <div
          class="form-control first"
          v-for="el in data.typeDepartments"
          :key="'type' + el.id"
        >
        <input
              class="checkbox"
              :id="'type' + el.id"
              type="checkbox"
              :value="el.id"
              v-model="typeDepartments"
            />
            <label :for="'type' + el.id">{{ el["name"] }}</label>
        </div>
      </div>
      <div class="grid-s-12 grid-m-6 grid-l-2">
        <h2>{{ $t("Piso") }}:</h2>
        <div
          class="form-control first"
          v-for="el in data.floors"
          :key="'floor' + el"
        >
        <input
              class="checkbox"
              :id="'floor' + el"
              type="checkbox"
              :value="el"
               v-model="floors"
            />
            <label :for="'floor' + el">{{ el }} {{ $t('piso') }}</label>
        </div>
      </div>
      <div class="grid-s-12 grid-m-6 grid-l-2">
        <h2>{{ $t("Vista") }}:</h2>
        <div
          class="form-control first"
          v-for="el in data.views"
          :key="'view' + el.id"
        >
        <input
              class="checkbox"
              :id="'view' + el.id"
              type="checkbox"
              :value="el.id"
              v-model="views"
            />
            <label :for="'view' + el.id">{{ el["name"] }}</label>
        </div>
      </div>

      <div class="grid-s-12 grid-m-6 grid-l-2">
        <h2>{{ $t("Dormitorios") }}:</h2>
        <div
          class="form-control first"
          v-for="el in data.rooms"
          :key="'room' + el"
        >
        <input
              class="checkbox"
              :id="'room' + el"
              type="checkbox"
              :value="el"
               v-model="rooms"
            />
            <label :for="'room' + el">{{ el }} {{ $t('dormitorio(s)') }}</label>
        </div>
      </div>
      <div class="grid-s-12 grid-m-6 grid-l-4">
        <h2>{{ $t("Precios") }}:</h2>
        <div class="range-prices">
          {{ $t('Selecciona el rango')}}
        <client-only>
         <vue-range-slider :process-style="{
          backgroundColor: '#0E5983'
        }" :enableCross="false" :tooltip="false" v-model="rangePrices" :min="data.prices.min" :max="data.prices.max"></vue-range-slider>
        </client-only>
        </div>
        <div>
           {{ $t('Desde')}} {{ minFormat }} - {{ $t('Hasta')}} {{ maxFormat }}
        </div>
      </div>
      <div class="grid-s-12 grid-m-6 grid-l-4">
        <button class="btn" @click="sendFilters">Filtrar</button>
        <button @click="reset">Borrar Filtrado</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
/*.vue-range-slider.slider-component .slider .slider-dot.slider-always .slider-tooltip-wrap{
  display: none !important;
}*/
</style>
<script>
export default {
  props: {
    data: Object,
  },
  data(){
      return{
          rangePrices: [this.data.prices.min, this.data.prices.max],
          views: [],
          floors: [],
          departments: [],
          rooms: [],
          statuses: [],
          projects: [],
          typeDepartments: []
      }
  },
  created(){
      //this.formatter = value => `S/ ${value}`
  },
  methods:{
    sendFilters(){
      this.$emit("set", this.rangePrices, this.views, this.floors, this.departments, this.rooms, this.statuses, this.projects, this.typeDepartments );
    },
    reset(){
      this.rangePrices = [this.data.prices.min, this.data.prices.max];
      this.views = [];
      this.floors = [];
      this.departments = [];
      this.rooms = [];
      this.statuses = [];
      this.projects = [];
      this.typeDepartments = [];
      setTimeout(() => {
        this.$emit("clear");    
      }, 50);
    }
  },
  computed:{
    minFormat: function () {
      return 'S/ '+this.rangePrices[0].toLocaleString('en');
    },
    maxFormat: function () {
      return 'S/ '+this.rangePrices[1].toLocaleString('en');
    }
  },
  watch: {
    "rangePrices": function (newValue, oldValue) {
      this.$emit("update:range", newValue);
    }, 
    views: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler(newValue, oldValue){
        this.$emit("update:views", newValue);
      }
    },
    floors: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler(newValue, oldValue){
        console.log("test");
        this.$emit("update:floors", newValue);
      }
    },
    departments: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler(newValue, oldValue){
        this.$emit("update:departments", newValue);
      }
    },
    rooms: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler(newValue, oldValue){
        this.$emit("update:rooms", newValue);
      }
    },
    statuses: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler(newValue, oldValue){
        this.$emit("update:statuses", newValue);
      }
    },
    projects: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler(newValue, oldValue){
        this.$emit("update:projects", newValue);
      }
    },
    typeDepartments: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler(newValue, oldValue){
        this.$emit("update:typeDepartments", newValue);
      }
    }
    /*"views": function (newValue, oldValue) {
      this.$emit("update:views", newValue);
    }, 
    "floors": function (newValue, oldValue) {
      console.log(test);
      this.$emit("update:floors", newValue);
    }, 
    "departments": function (newValue, oldValue) {
      this.$emit("update:departments", newValue);
    }, 
    "rooms": function (newValue, oldValue) {
      this.$emit("update:rooms", newValue);
    }, 
    "statuses": function (newValue, oldValue) {
      this.$emit("update:statuses", newValue);
    }, 
    "projects": function (newValue, oldValue) {
      this.$emit("update:projects", newValue);
    }, 
    "typeDepartments": function (newValue, oldValue) {
      this.$emit("update:typeDepartments", newValue);
    }, */
  }
};
</script>