<template>
  <div class="pagination-pagos" v-if="data.total">
    <button
      v-if="data.current_page > 1"
      class="page-link rounded-circle"
      @click.prevent="clickPrevPage()"
    >
      <i class="flaticon-back"></i>
    </button>

   <!-- <ul class="pagination--list">
      <li v-for="page in data.last_page" :key="'p' + page">
        <button
          v-bind:class="[page == data.current_page ? 'active' : '']"
          @click.prevent="clickPage(page)"
        >
          {{ page }}
        </button>
      </li>
    </ul>-->

    <select
      v-model="pageActive"
      class="pagination--select"
      style="width: 70px; height: 43px"
      name=""
      id=""
      @change="clickPageSelect(pageActive)"
    >
      <option
        :value="page1"
        v-for="page1 in data.last_page"
        :key="'ps' + page1"
      >
        {{ page1 }}
      </option>
    </select>
    <button
      v-if="data.current_page < data.last_page"
      class="page-link"
      @click.prevent="clickNextPage()"
    >
      <i class="flaticon-next"></i>
    </button>
    <!--{{ data.total }} {{ $t('inmuebles') }}-->
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
  },
  data() {
    return {
      pageActive: 1,
      //offset: 2
    };
  },
  watch: {
    "data.current_page": function (newValue, oldValue) {
      this.pageActive = newValue;
    },
  },
  computed: {
    /*pages(){
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
            }*/
  },
  methods: {
    clickPageSelect(page) {
      this.$emit("get", page);
    },
    clickPage(page) {
      this.pageActive = page;
      this.$emit("get", page);
    },
    clickNextPage() {
      this.pageActive = this.data.current_page + 1;
      this.$emit("get", this.data.current_page + 1);
    },
    clickPrevPage() {
      this.pageActive = this.data.current_page - 1;
      this.$emit("get", this.data.current_page - 1);
    },
  },
};
</script>