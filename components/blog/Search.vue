<template>
  <form class="buscador" @submit.prevent="submit" autocomplete="off">
    <input type="text" v-model="q" :placeholder="$t('Que estás buscando')" />
    <i class="flaticon-lupa"></i>
  </form>
</template>
<script>
export default {
  data() {
    return {
      q: "",
    };
  },
  methods: {
    submit() {
      if (!this.q) {
        return;
      }
      this.$router.push(
        this.localePath({
          name: "blog",
          query: { q: this.q },
        })
      );
    },
  },
  watch: {
    "$route.query.q": {
      handler: function (val, oldVal) {
        if (!val) {
          this.q = "";
        }
      },
      immediate: true,
    },
  },
};
</script>