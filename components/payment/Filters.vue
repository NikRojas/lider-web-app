<template>
  <div class="grid-col">
    <div class="grid-s-6 grid-m-4 grid-l-2">
      <div class="card-filter">
        <h5>
          <b>{{ $t("Ciudad - Distrito") }}:</b>
        </h5>
        <template v-if="!requestServer || lastSelected == 'ubigeo'">
          <client-only>
            <simplebar class="scroll-filter" data-simplebar-auto-hide="false">
              <div
                class="form-control"
                :class="el.department ? '' : 'pl-1'"
                v-for="(el, i) in data.departments"
                :key="'dep' + el.code_ubigeo + i"
              >
                <template v-if="el.department">
                  <!--<input
                @change="updateFilter('ubigeo')"
                class="checkbox"
                :id="'dep' + el.code_department"
                v-model="departments"
                type="checkbox"
                :value="el.code_department"
              />-->
                  <input
                    @change="handleUbigeo(el.code_department, i, true)"
                    class="checkbox"
                    :id="'dep' + el.code_department"
                    v-model="departments"
                    type="checkbox"
                    :value="el.code_department"
                  />
                  <label :for="'dep' + el.code_department">{{
                    el.department
                  }}</label>
                </template>
                <template v-else>
                  <!--<input
                @change="updateFilter('ubigeo')"
                class="checkbox pl-1"
                :id="'ubi' + el.code_ubigeo"
                type="checkbox"
                v-model="departments"
                :value="el.code_ubigeo"
              />-->
                  <input
                    @change="handleUbigeo(el.code_ubigeo, i, false)"
                    class="checkbox pl-1"
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
        <template v-if="!requestServer || lastSelected == 'status'">
          <client-only>
            <simplebar class="scroll-filter" data-simplebar-auto-hide="false">
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
                <label :for="'stat' + el.id">{{
                  el["name_" + $i18n.locale]
                }}</label>
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
        <template v-if="!requestServer || lastSelected == 'projects'">
          <client-only>
            <simplebar class="scroll-filter" data-simplebar-auto-hide="false">
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
                <label :for="'proj' + el.id">{{
                  el["name_" + $i18n.locale]
                }}</label>
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
        <template v-if="!requestServer || lastSelected == 'types'">
          <client-only>
            <simplebar class="scroll-filter" data-simplebar-auto-hide="false">
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
        <template v-if="!requestServer || lastSelected == 'floors'">
          <client-only>
            <simplebar class="scroll-filter" data-simplebar-auto-hide="false">
              <div
                class="form-control"
                v-for="el in data.floors"
                :key="'floor' + el"
              >
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
        <template v-if="!requestServer || lastSelected == 'views'">
          <client-only>
            <simplebar class="scroll-filter" data-simplebar-auto-hide="false">
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
        <template v-if="!requestServer || lastSelected == 'rooms'">
          <client-only>
            <simplebar class="scroll-filter" data-simplebar-auto-hide="false">
              <div
                class="form-control"
                v-for="el in data.rooms"
                :key="'room' + el"
              >
                <input
                  @change="updateFilter('rooms')"
                  class="checkbox"
                  :id="'room' + el"
                  type="checkbox"
                  :value="el"
                  v-model="rooms"
                />
                <label :for="'room' + el"
                  >{{ el }} {{ $t("dormitorio(s)") }}</label
                >
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
        <template v-if="!requestServer || lastSelected == 'ubigeo'">
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
                @drag-end="handleDragEndPrice"
                :enableCross="false"
                :tooltip="false"
                v-model="rangePrices"
                :min="data.prices.min"
                :max="data.prices.max"
              ></vue-range-slider>
            </client-only>
          </div>
          <div>
            {{ $t("Desde") }} {{ minFormat }} - {{ $t("Hasta") }}
            {{ maxFormat }}
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
        <template v-if="!requestServer || lastSelected == 'ubigeo'">
          <div class="range-prices">
            {{ $t("Selecciona el rango") }}
            <client-only>
              <vue-range-slider
                :process-style="{
                  backgroundColor: '#0E5983',
                }"
                @drag-end="handleDragEndArea"
                :enableCross="false"
                :tooltip="false"
                v-model="rangeAreas"
                :min="data.areas.min"
                :max="data.areas.max"
              ></vue-range-slider>
            </client-only>
          </div>
          <div>
            {{ $t("Desde") }} {{ rangeAreas[0] }} - {{ $t("Hasta") }}
            {{ rangeAreas[1] }}
          </div>
        </template>
        <PuSkeleton height="60px" v-else></PuSkeleton>
      </div>
    </div>
    <div class="grid-s-6 grid-l-2">
      <button
        class="btn btn2"
        :class="requestServer ? 'btn--opacity' : ''"
        :disabled="requestServer"
        @click="sendFilters"
        style="width: 100%; margin-bottom: 10px"
      >
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
    filtersParent: Object,
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

      lastSelected: "",
      requestServer: false,
      data: {
        prices: {
          max: 0,
          min: 0,
        },
        areas: {
          max: 0,
          min: 0,
        },
      },
      areaDragged: false,
      pricesDragged: false,
    };
  },
  created() {
    //this.formatter = value => `S/ ${value}`
  },
  methods: {
    handleDragEndArea() {
      this.areaDragged = true;
    },
    handleDragEndPrice() {
      this.pricesDragged = true;
    },
    handleUbigeo(e, index, departmentParam = false) {
      let filtered;
      let districts;
      let department;
      let check;
      let districtDepartmentCode;
      //Setear Variable
      let tempDepartment = this.data.departments.slice();
      //Quitar objeto de array
      tempDepartment.splice(index, 1);
      if (departmentParam) {
        //Chequear si existe ya en el array
        check = this.departments.includes(e);
        //Obtener los distritos del departamento segun el codigo de departamento
        filtered = tempDepartment.filter(function (obj) {
          return obj.code_department == e;
        });
        //Obtener codigos de ubigeo de distritos
        districts = filtered.map((a) => a.code_ubigeo);
        if (check) {
          //Si existe el departamento en el array, agregar los distritos
          this.departments = this.departments.concat(districts);
        } else {
          //Si no existe departamento en el array, se quitan todos los distritos
          this.departments = this.departments.filter(
            (el) => !districts.includes(el)
          );
        }
      } else {
        //Obtener departamento de codigo ubigeo
        districtDepartmentCode = e.substring(0, 2);
        //Obtener el departamento
        filtered = tempDepartment.filter(function (obj) {
          return (
            obj.code_department == districtDepartmentCode && obj.is_department
          );
        });
        check = this.departments.includes(filtered[0].code_department);
        //Si no existe el departamento agregarlo al array
        if (!check) {
          department = filtered.map((a) => a.code_department);
          this.departments = this.departments.concat(department);
        }
        //SI NO HAY NINGUN UBIGEO DESELECCIONAR EL DEPARTAMENTO
        let checkIfAlmostOneDistrictExist = this.departments.find(function (
          el
        ) {
          return (
            (el.length == 6) & (el.substring(0, 2) == districtDepartmentCode)
          );
        });
        if (
          checkIfAlmostOneDistrictExist == null &&
          checkIfAlmostOneDistrictExist == undefined
        ) {
          this.departments = this.departments.filter(
            (g) => g != districtDepartmentCode
          );
        }
      }
      this.updateFilter("ubigeo");
    },
    sendFilters() {
      let filters = {
        rangePrices: this.rangePrices,
        views: this.views,
        floors: this.floors,
        departments: this.departments,
        rooms: this.rooms,
        statuses: this.statuses,
        projects: this.projects,
        typeDepartments: this.typeDepartments,
        rangeAreas: this.rangeAreas,
      };
      this.$store.dispatch("setFilters", filters);
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
      this.lastSelected = "";
      setTimeout(() => {
        this.$emit("clear");
        this.$store.dispatch("setFilters", {});
      }, 50);
      this.updateFilter();
    },
    updateFilter(v = false, init = false) {
      this.lastSelected = v;
      this.requestServer = true;
      let areas = this.rangeAreas;
      let prices = this.rangePrices;
      let minArea, maxArea, minPrice, maxPrice;
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
          this.data = Object.assign({}, response.data.filters);
          //Borrar los codigo de ubigeo ya no obtenidos
          let codesUbigeo = response.data.filters.departments.filter(function (
            obj
          ) {
            return !obj.is_department;
          });
          let notExists = this.departments.filter(
            (el) => !codesUbigeo.map((a) => a.code_ubigeo).includes(el)
          );
          let notExistsDistrict = notExists.filter((el) => el.length == 6);
          if (notExistsDistrict.length) {
            this.departments = this.departments.filter(
              (g) => !notExistsDistrict.includes(g)
            );
          }

          if (init) {
            const { rangePrices, rangeAreas } = this.filters;
            if (rangePrices.length) {
              this.rangePrices = rangePrices;
            }
            else{
              this.rangePrices = [
                response.data.filters.prices.min,
                response.data.filters.prices.max,
              ];
            }
            if (rangeAreas.length) {
              this.rangeAreas = rangeAreas;
            }
            else{
              this.rangeAreas = [
                response.data.filters.areas.min,
                response.data.filters.areas.max,
              ];
            }
            this.sendFilters();
          } else {
            //Si se movio el slider
            if (this.areaDragged) {
              if (
                areas[0] > response.data.filters.areas.min &&
                areas[0] < response.data.filters.areas.max
              ) {
                minArea = areas[0];
              } else {
                minArea = response.data.filters.areas.min;
              }
              if (
                areas[1] < response.data.filters.areas.max &&
                areas[1] > response.data.filters.areas.min
              ) {
                maxArea = areas[1];
              } else {
                maxArea = response.data.filters.areas.max;
              }
              this.rangeAreas = [minArea, maxArea];
            } else {
              this.rangeAreas = [
                response.data.filters.areas.min,
                response.data.filters.areas.max,
              ];
            }
            if (this.pricesDragged) {
              if (
                prices[0] > response.data.filters.prices.min &&
                prices[0] < response.data.filters.prices.max
              ) {
                minPrice = prices[0];
              } else {
                minPrice = response.data.filters.prices.min;
              }
              if (
                prices[1] < response.data.filters.prices.max &&
                prices[1] > response.data.filters.prices.min
              ) {
                maxPrice = prices[1];
              } else {
                maxPrice = response.data.filters.prices.max;
              }
              this.rangePrices = [minPrice, maxPrice];
            } else {
              this.rangePrices = [
                response.data.filters.prices.min,
                response.data.filters.prices.max,
              ];
            }
          }
          this.requestServer = false;
          this.areaDragged = false;
          this.pricesDragged = false;
        });
    },
    setFilters() {
      const {
        //rangePrices,
        views,
        floors,
        departments,
        rooms,
        statuses,
        projects,
        typeDepartments,
        //rangeAreas,
      } = this.filters;
      if (views) this.views = views;
      if (floors) this.floors = floors;
      if (departments) this.departments = departments;
      if (rooms) this.rooms = rooms;
      if (statuses) this.statuses = statuses;
      if (projects) this.projects = projects;
      if (typeDepartments) this.typeDepartments = typeDepartments;
      this.updateFilter(false, true);
    },
  },
  mounted() {
    this.setFilters();
  },
  computed: {
    minFormat: function () {
      if (this.rangePrices[0]) {
        return "S/ " + this.rangePrices[0].toLocaleString("en");
      }
    },
    maxFormat: function () {
      if (this.rangePrices[1]) {
        return "S/ " + this.rangePrices[1].toLocaleString("en");
      }
    },
    filters() {
      return this.$store.getters.getFilters;
    },
  },
  watch: {
    filtersParent: {
      immediate: true,
      handler(newValue, oldValue) {
        //console.log(newValue);
        this.data = Object.assign({}, newValue);
        this.rangeAreas = [newValue.areas.min, newValue.areas.max];
        this.rangePrices = [newValue.prices.min, newValue.prices.max];
      },
    },
  },
};
</script>