<template>
  <section class="filtro-home wow fadeInUp" data-wow-delay="0.8s">
    <div class="container">
      <div class="grid-filtro">
        <h1>{{ label }}</h1>
        <form @submit.prevent="search">
          <div class="grid-input-filtro">
            <div class="dropdown top">
              <div class="dropdown-result">
                Ciudad - Distrito <i class="flaticon-download"></i>
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
                      <!--<input
                        class="checkbox"
                        :id="el3['district']"
                        type="checkbox"
                        :value="el.code_department+el3.code_district"
                        v-model="districtsValue"
                      />-->
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
            <div class="dropdown top">
              <div class="dropdown-result">
                Estatus del proyecto <i class="flaticon-download"></i>
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
                <!--<div class="form-control first">
					<input
					class="checkbox"
					id="contrucción"
					type="checkbox"
					value="value1"
					/>
					<label for="contrucción">En contrucción</label>
				</div>
				<div class="form-control first">
					<input
					class="checkbox"
					id="inmediata"
					type="checkbox"
					value="value1"
					/>
					<label for="inmediata">Entrega inmediata</label>
				</div>-->
              </div>
            </div>
            <div class="dropdown top">
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

                <!--<div class="form-control first">
                  <input
                    class="checkbox"
                    id="1dorm"
                    type="checkbox"
                    value="value1"
                  />
                  <label for="1dorm">1 Dormitorio</label>
                </div>
                <div class="form-control first">
                  <input
                    class="checkbox"
                    id="2dorm"
                    type="checkbox"
                    value="value1"
                  />
                  <label for="2dorm">2 Dormitorios</label>
                </div>
                <div class="form-control first">
                  <input
                    class="checkbox"
                    id="3dorm"
                    type="checkbox"
                    value="value1"
                  />
                  <label for="3dorm">3 Dormitorios</label>
                </div>-->
              </div>
            </div>
            <button
              type="submit"
              class="btn btn2"
              :class="loading ? 'btn--opacity' : ''"
            >
              {{ loading ? $t("Cargando")+"..." : $t("Buscar") }}
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
    label: String,
    filters: Object,
    loading: Boolean,
  },
  data() {
    return {
      departmentsValue: [],
      districtsValue: [],
      statusValue: [],
      roomsValue: [],
    };
  },
  methods: {
    search() {
      this.$emit(
        "search"
        /*,
        this.departmentsValue,
        this.districtsValue,
        this.statusValue*/
      );
    },
  },
  watch: {
    departmentsValue: {
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
    },
  },
};
</script>