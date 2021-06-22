<template>
  <div class="grid-col">
    <div class="grid-s-6 grid-m-4 grid-l-2">
      <div class="card-filter">
        <h5>
          <b>{{ $t("Ciudad - Distrito") }}:</b>
        </h5>
        <template  v-if="!requestServer || lastSelected == 'ubigeo'">
        <client-only>
          <simplebar
            class="scroll-filter"
            data-simplebar-auto-hide="false"
          >
          <div
            class="form-control"
            v-for="(el, i) in data.departments"
            :key="'dep' + el.code_ubigeo + i"
          >
            <template v-if="el.department">
              <input
                @change="updateFilter('ubigeo')"
                class="checkbox"
                :id="'dep' + el.code_department"
                v-model="departments"
                type="checkbox"
                :value="el.code_department"
              />
              <label :for="'dep' + el.code_department"
                >{{ el.department }}</label
              >
            </template>
            <template v-else>
              <input
                @change="updateFilter('ubigeo')"
                class="checkbox"
                :id="'ubi' + el.code_ubigeo"
                type="checkbox"
                v-model="departments"
                :value="el.code_ubigeo"
              />
              <label :for="'ubi' + el.code_ubigeo">{{ el.district }}</label>
            </template>
          </div>
          </simplebar>
        </client-only>
        </template>
        <PuSkeleton height="120px" v-else></PuSkeleton>
      </div>
    </div>
    <div class="grid-s-6 grid-m-4 grid-l-2">
      <div class="card-filter">
        <h5>
          <b>{{ $t("Estatus") }}:</b>
        </h5>
        <template  v-if="!requestServer || lastSelected == 'status'">
        <client-only>
          <simplebar
            class="scroll-filter"
            data-simplebar-auto-hide="false"
          >
            <div
              class="form-control"
              v-for="el in data.status"
              :key="'stat' + el.id"
            >
              <input
                @change="updateFilter('status')"
                class="checkbox"
                :id="'stat' + el.id"
                type="checkbox"
                :value="el.id"
                v-model="statuses"
              />
              <label :for="'stat' + el.id">{{ el["name_" + $i18n.locale] }}</label>
            </div>
          </simplebar>
        </client-only>
        </template>
        <PuSkeleton height="120px" v-else></PuSkeleton>
      </div>
    </div>
    <div class="grid-s-6 grid-m-4 grid-l-2">
      <div class="card-filter">
        <h5>
          <b>{{ $t("Proyecto") }}:</b>
        </h5>
        <template  v-if="!requestServer || lastSelected == 'projects'">
        <client-only>
          <simplebar
            class="scroll-filter"
            data-simplebar-auto-hide="false"
          >
            <div
              class="form-control"
              v-for="el in data.projects"
              :key="'proj' + el.id"
            >
              <input
                @change="updateFilter('projects')"
                class="checkbox"
                :id="'proj' + el.id"
                type="checkbox"
                :value="el.id"
                v-model="projects"
              />
              <label :for="'proj' + el.id">{{ el["name_" + $i18n.locale] }}</label>
            </div>
          </simplebar>
        </client-only>
        </template>
        <PuSkeleton height="120px" v-else></PuSkeleton>
      </div>
    </div>
    <div class="grid-s-6 grid-m-4 grid-l-2">
      <div class="card-filter">
        <h5>
          <b>{{ $t("Tipo de departamento") }}:</b>
        </h5>
        <template  v-if="!requestServer || lastSelected == 'types'">
        <client-only>
          <simplebar
            class="scroll-filter"
            data-simplebar-auto-hide="false"
          >
            <div
              class="form-control"
              v-for="el in data.typeDepartments"
              :key="'type' + el.id"
            >
              <input
                @change="updateFilter('types')"
                class="checkbox"
                :id="'type' + el.id"
                type="checkbox"
                :value="el.id"
                v-model="typeDepartments"
              />
              <label :for="'type' + el.id">{{ el["name"] }}</label>
            </div>
          </simplebar>
        </client-only>
        </template>
        <PuSkeleton height="120px" v-else></PuSkeleton>
      </div>
    </div>
    <div class="grid-s-6 grid-m-4 grid-l-2">
      <div class="card-filter">
        <h5>
          <b>{{ $t("Piso") }}:</b>
        </h5>
        <template  v-if="!requestServer || lastSelected == 'floors'">
        <client-only>
          <simplebar
            class="scroll-filter"
            data-simplebar-auto-hide="false"
          >
            <div class="form-control" v-for="el in data.floors" :key="'floor' + el">
              <input
                @change="updateFilter('floors')"
                class="checkbox"
                :id="'floor' + el"
                type="checkbox"
                :value="el"
                v-model="floors"
              />
              <label :for="'floor' + el">{{ el }} {{ $t("piso") }}</label>
            </div>
          </simplebar>
        </client-only>
        </template>
        <PuSkeleton height="120px" v-else></PuSkeleton>
      </div>
    </div>
    <div class="grid-s-6 grid-m-4 grid-l-2">
      <div class="card-filter">
        <h5>
          <b>{{ $t("Vista") }}:</b>
        </h5>
        <template  v-if="!requestServer || lastSelected == 'views'">
        <client-only>
          <simplebar
            class="scroll-filter"
            data-simplebar-auto-hide="false"
          >
            <div
              class="form-control"
              v-for="el in data.views"
              :key="'view' + el.id"
            >
              <input
                @change="updateFilter('views')"
                class="checkbox"
                :id="'view' + el.id"
                type="checkbox"
                :value="el.id"
                v-model="views"
              />
              <label :for="'view' + el.id">{{ el["name"] }}</label>
            </div>
          </simplebar>
        </client-only>
        </template>
        <PuSkeleton height="120px" v-else></PuSkeleton>
      </div>
    </div>

    <div class="grid-s-6 grid-m-4 grid-l-2">
      <div class="card-filter">
        <h5>
          <b>{{ $t("Dormitorios") }}:</b>
        </h5>
        <template  v-if="!requestServer || lastSelected == 'rooms'">
        <client-only>
          <simplebar
            class="scroll-filter"
            data-simplebar-auto-hide="false"
          >
            <div class="form-control" v-for="el in data.rooms" :key="'room' + el">
              <input
                @change="updateFilter('rooms')"
                class="checkbox"
                :id="'room' + el"
                type="checkbox"
                :value="el"
                v-model="rooms"
              />
              <label :for="'room' + el">{{ el }} {{ $t("dormitorio(s)") }}</label>
            </div>
          </simplebar>
        </client-only>
        </template>
        <PuSkeleton height="120px" v-else></PuSkeleton>
      </div>
    </div>
    <div class="grid-s-12 grid-m-6 grid-l-4">
      <div class="card-filter">
        <h5>
          <b>{{ $t("Precios") }}:</b>
        </h5>
        <template  v-if="!requestServer || lastSelected == 'ubigeo'">
        <div class="range-prices">
          {{ $t("Selecciona el rango") }}
          <client-only>
            <!--<vue-range-slider
              :process-style="{
                backgroundColor: '#0E5983',
              }"
              :enableCross="false"
              :tooltip="false"
              v-model="rangePrices"
              :min="data.prices.min"
              :max="data.prices.max"
            ></vue-range-slider>-->
            <vue-range-slider
              :process-style="{
                backgroundColor: '#0E5983',
              }"
              :enableCross="false"
              :tooltip="false"
              v-model="rangePrices"
              :min="data.prices.min"
              :max="data.prices.max"
            ></vue-range-slider>
          </client-only>
          
        </div>
        <div>
          {{ $t("Desde") }} {{ minFormat }} - {{ $t("Hasta") }} {{ maxFormat }}
        </div>
        </template>
        <PuSkeleton height="60px" v-else></PuSkeleton>
      </div>
    </div>
    <div class="grid-s-12 grid-m-6 grid-l-4">
      <div class="card-filter">
        <h5>
          <b>{{ $t("Área") }}:</b>
        </h5>
        <template  v-if="!requestServer || lastSelected == 'ubigeo'">
        <div class="range-prices">
          {{ $t("Selecciona el rango") }}
          <client-only>
            <vue-range-slider
              :process-style="{
                backgroundColor: '#0E5983',
              }"
              :enableCross="false"
              :tooltip="false"
              v-model="rangeAreas"
              :min="data.areas.min"
              :max="data.areas.max"
            ></vue-range-slider>
          </client-only>
        </div>
        <div>
          {{ $t("Desde") }} {{ rangeAreas[0] }} - {{ $t("Hasta") }} {{ rangeAreas[1] }}
        </div>
        </template>
        <PuSkeleton height="60px" v-else></PuSkeleton>
      </div>
    </div>
    <div class="grid-s-6 grid-l-2">
      <button class="btn btn2" @click="sendFilters" style="width: 100%; margin-bottom: 10px;">
        {{ $t("Filtrar") }}
      </button>
      <button class="btn btn1" @click="reset" style="width: 100%">
        {{ $t("Borrar Filtrado") }}
      </button>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
export default {
  props: {
    //data: Object,
  },
  data() {
    return {
      //rangePrices: [this.data.prices.min, this.data.prices.max],
      //rangeAreas: [this.data.areas.min, this.data.areas.max],
      rangePrices: [],
      rangeAreas: [],
      views: [],
      floors: [],
      departments: [],
      rooms: [],
      statuses: [],
      projects: [],
      typeDepartments: [],

      lastSelected:'',
      requestServer: false,
      data: {
        prices:{
          max: 0,
          min: 0
        },
        areas:{
          max: 0,
          min: 0,
        }
      }
    };
  },
  created() {
    //this.formatter = value => `S/ ${value}`
  },
  methods: {
    sendFilters() {
      this.$emit(
        "set",
        1,
        this.rangePrices,
        this.views,
        this.floors,
        this.departments,
        this.rooms,
        this.statuses,
        this.projects,
        this.typeDepartments,
        this.rangeAreas
      );
    },
    reset() {
      this.rangePrices = [this.data.prices.min, this.data.prices.max];
      this.rangeAreas = [this.data.areas.min, this.data.areas.max];
      this.views = [];
      this.floors = [];
      this.departments = [];
      this.rooms = [];
      this.statuses = [];
      this.projects = [];
      this.typeDepartments = [];
      this.lastSelected = '';
      setTimeout(() => {
        this.$emit("clear");
      }, 50);
      this.updateFilter();
    },
    updateFilter(v = false){
      this.lastSelected = v;
      this.requestServer = true;
      this.$axios
        .$get("/api/reserve/filters", {
          params: {
            /*
            range: this.range,*/
            statuses: this.statuses,
            projects: this.projects,
            types: this.typeDepartments,
            rooms: this.rooms,
            floors: this.floors,
            views: this.views,
            ubigeo: this.departments,
            /*
            range_area: this.areas,*/
          },
        })
        .then((response) => {
          this.rangePrices = [response.data.filters.prices.min, response.data.filters.prices.max];
          this.rangeAreas = [response.data.filters.areas.min, response.data.filters.areas.max];
          this.data = Object.assign({}, response.data.filters);
          this.requestServer = false;
        });
    }
  },
  mounted(){
    this.updateFilter();
  },
  computed: {
    minFormat: function () {
      if(this.rangePrices[0]){
        return "S/ " + this.rangePrices[0].toLocaleString("en");
      }
    },
    maxFormat: function () {
      if(this.rangePrices[1]){
        return "S/ " + this.rangePrices[1].toLocaleString("en");
      }
    },
  },
  watch: {
    /*"data": function (newValue, oldValue) {
      this.$emit("update:range", newValue);
    },*/
    /*"rangePrices": function (newValue, oldValue) {
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
    }*/
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
  },
};
</script>