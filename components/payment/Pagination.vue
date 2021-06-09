<template>
  <div class="pagination-pagos">
    <button
      v-if="data.current_page > 1"
      class="page-link rounded-circle"
      @click.prevent="clickPrevPage()"
    >
      <i class="flaticon-back"></i>
    </button>
    <ul>
      <li v-for="page in data.last_page" :key="'p' + page">
        <button v-bind:class="[page == data.current_page ? 'active' : '']">
          1
        </button>
      </li>
    </ul>
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
    clickPage(page) {
      this.$emit("get", page);
    },
    clickNextPage() {
      this.$emit("get", this.data.current_page + 1);
    },
    clickPrevPage() {
      this.$emit("get", this.data.current_page - 1);
    },
  },
};
</script>