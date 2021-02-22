<template>
  <section class="filtro-home wow fadeInUp" data-wow-delay="0.8s">
    <div class="container">
      <div class="grid-filtro">
        <h1>{{ label }}</h1>
        <form @submit.prevent="search">
          <div class="grid-input-filtro">
            <!--<div class="filter-dropdown">
              <div class="dropdown-result">
                {{ $t('Ciudad - Distrito')}} <i class="flaticon-download"></i>
              </div>
              <div class="dropdown-content">
                <template v-for="el in filters.departments">
                  <div
                    class="form-control first"
                    :key="'dep' + el.code_department"
                  >
                    <input
                      class="checkbox"
                      :id="el['department']"
                      type="checkbox"
                      :value="el.code_department"
                      v-model="departmentsValue"
                    />
                    <label :for="el['department']">{{ el.department }}</label>
                  </div>
                  <template v-if="departmentsValue.indexOf(el.code_department) !== -1">
                    <div
                      class="form-control second"
                      v-for="el3 in el.districts"
                      :key="el3.code_ubigeo"
                    >
                      <input
                        class="checkbox"
                        :id="el3['district']"
                        type="checkbox"
                        :value="el3.code_ubigeo"
                        v-model="districtsValue"
                      />
                      <label :for="el3['district']">{{ el3.district }}</label>
                    </div>
                  </template>
                </template>
              </div>
            </div>
            <div class="filter-dropdown">
              <div class="dropdown-result">
                {{ $t('Estatus del proyecto')}} <i class="flaticon-download"></i>
              </div>
              <div class="dropdown-content">
                <div
                  class="form-control first"
                  v-for="el in filters.status"
                  :key="'stat' + el.id"
                >
                  <input
                    class="checkbox"
                    :id="el['name_' + $i18n.locale]"
                    type="checkbox"
                    :value="el.id"
                    v-model="statusValue"
                  />
                  <label :for="el['name_' + $i18n.locale]">{{
                    el["name_" + $i18n.locale]
                  }}</label>
                </div>
              </div>
            </div>
            <div class="filter-dropdown">
              <div class="dropdown-result">
                N° {{ $t('Dormitorios') }} <i class="flaticon-download"></i>
              </div>
              <div class="dropdown-content">
                <div
                  class="form-control first"
                  v-for="el in filters.rooms"
                  :key="'room' + el"
                >
                  <input
                    class="checkbox"
                    :id="'room'+el"
                    type="checkbox"
                    :value="el"
                    v-model="roomsValue"
                  />
                  <label :for="'room'+el">{{
                    el
                  }} {{ el == 1 ? $t('Dormitorio') : $t('Dormitorios')}}</label>
                </div>
              </div>
            </div>-->
            <div>
              <select name="ubigeo" v-model="filter.ubigeo" id="" class="w-100">
                <option disabled value="0">
                  {{ $t("Ciudad - Distrito") }}
                </option>
                <option
                  v-for="(el, z) in filtersData.departments"
                  :key="'dep' + el.code_ubigeo + z"
                  :value="el.department ? el.code_department : el.code_ubigeo"
                >
                  {{ el.department ? el.department : el.district }}
                </option>
              </select>
            </div>
            <div>
              <div v-if="loadingSpecific">
                <client-only>
                  <PuSkeleton height="45px"></PuSkeleton>
                </client-only>
              </div>
              <div v-else>
                <select name="status" v-model="filter.status" id="" class="w-100">
                  <option disabled value="0">
                    {{ $t("Estatus del proyecto") }}
                  </option>
                  <option
                    v-for="el in filtersData.status"
                    :key="'stat' + el.id"
                    :value="el.id"
                  >
                    {{ el["name_" + $i18n.locale] }}
                  </option>
                </select>
              </div>
            </div>
            <div>
              <div v-if="loadingSpecific">
                <client-only>
                  <PuSkeleton height="45px"></PuSkeleton>
                </client-only>
              </div>
              <div v-else>
                <select name="room" v-model="filter.rooms" id="" class="w-100">
                  <option disabled value="0">N° {{ $t("Dormitorios") }}</option>
                  <option
                    v-for="el in filtersData.rooms"
                    :key="'room' + el"
                    :value="el"
                  >
                    {{ el }}
                    {{ el == 1 ? $t("Dormitorio") : $t("Dormitorios") }}
                  </option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn2"
              :class="loading ? 'btn--opaubigeo' : ''"
            >
              {{ loading ? $t("Cargando") + "..." : $t("Buscar") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    /*orientation:{
      default: 'bottom',
      type: String
    },*/
    label: String,
    filters: Object,
    loading: Boolean,
  },
  data() {
    return {
      filter: {
        rooms: 0,
        ubigeo: 0,
        status: 0,
      },
      filtersData: {},
      /*departmentsValue: [],
      districtsValue: [],
      statusValue: [],
      roomsValue: [],*/
      loadingSpecific: false,
      notSearch: false,
    };
  },
  methods: {
    search() {
      if(this.notSearch === false){
        return
      }
      this.$emit(
        "search",
        /*this.filter.ubigeo,
        this.filter.status,
        this.filter.rooms*/
        /*,
        this.departmentsValue,
        this.districtsValue,
        this.statusValue*/
      );
    },
    getFilters(ubigeo) {
      this.loadingSpecific = true;
      this.$axios
        .$get("/api/filters", {
          params: {
            ...(ubigeo ? { ubigeo: ubigeo } : {}),
          },
        })
        .then((response) => {
          this.loadingSpecific = false;
          if (response.status) {
            this.filtersData.status = response.status.slice();
          }
          if (response.rooms) {
            this.filtersData.rooms = response.rooms.slice();
          }
            this.filter.status = 0;
            this.filter.rooms = 0;

        });
    },
  },
  watch: {
    filters: {
      immediate: true,
      handler: function (newValue, oldValue) {
        this.filtersData = Object.assign({}, newValue);
      },
    },
    "filter.ubigeo": {
      handler: function (newValue) {
        if (newValue) {
          this.getFilters(newValue);
          this.$emit("update:ubigeo", newValue);
          this.notSearch = true;
        }
      },
    },
     "filter.rooms": {
      handler: function (newValue) {
        if (newValue) {
          this.$emit("update:rooms", newValue);
          this.notSearch = true;
        }
      },
    },
     "filter.status": {
      handler: function (newValue) {
        if (newValue) {
          this.$emit("update:status", newValue);
          this.notSearch = true;
        }
      },
    },
    /*departmentsValue: {
      handler: function (newValue, oldValue) {
        if (newValue) {
          let difference = oldValue.filter(x => !newValue.includes(x));
          
            if(difference.length){
              if(this.districtsValue.length){
                var newDistricts = this.districtsValue.filter(x => { console.log(x); x.substring(0, 2) == difference});
                this.districtsValue = newDistricts.slice();
              }
            }

          this.$emit("update:departments", newValue);
          this.search();
        }
      },
    },
    districtsValue: {
      handler: function (newValue) {
        if (newValue) {
          var value = newValue[newValue.length - 1];
          if(value && value.length){
            var codeDepartment = value.substring(0, 2);
            var exist = this.departmentsValue.indexOf(codeDepartment) !== -1;
            if(!exist){
              this.departmentsValue.push(codeDepartment);
            }
          }
          this.$emit("update:districts", newValue);
          this.search();
        }
      },
    },
    statusValue: {
      handler: function (newValue) {
        if (newValue) {
          this.$emit("update:statuses", newValue);
          this.search();
        }
      },
    },
    roomsValue: {
      handler: function (newValue) {
        if (newValue) {
          this.$emit("update:rooms", newValue);
          this.search();
        }
      },
    },*/
  },
};
</script>