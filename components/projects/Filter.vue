<template>
  <section class="filtro-home wow fadeInUp" data-wow-delay="0.8s">
    <div class="container">
      <div class="grid-filtro">
        <h1>{{ label }}</h1>
        <form @submit.prevent="search">
          <div class="grid-input-filtro">
            <div>
              <select name="ubigeo" v-model="filter.ubigeo" id="" class="w-100">
                <option disabled value="0">
                  {{ $t("Ciudad - Distrito") }}
                </option>
                <option value="all">
                  {{ $t('Todos')}}
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
                   <option value="all"  v-if="filtersData.status.length">
                  {{ $t('Todos')}}
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
                  <PuSkeleton height="52px"></PuSkeleton>
                </client-only>
              </div>
              <div v-else>
                <select name="room" v-model="filter.rooms" id="" class="w-100">
                  <option disabled value="0">N° {{ $t("Dormitorios") }}</option>
                   <option value="all" v-if="filtersData.rooms.length">
                  {{ $t('Todos')}}
                </option>
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
          this.notSearch = true;
        }
          this.$emit("update:ubigeo", newValue);
      },
    },
     "filter.rooms": {
      handler: function (newValue) {
        if (newValue) {
          this.notSearch = true;
        }
        this.$emit("update:rooms", newValue);
      },
    },
     "filter.status": {
      handler: function (newValue) {
        if (newValue) {
          this.notSearch = true;
        }
          this.$emit("update:status", newValue);
      },
    },
  },
};
</script>