<template>
  <div>
    <template v-if="!triggered && !hide">
      <button
        class="chat__link chat__link--button"
        :class="el.classes"
        id="chat__buttonLink"
        v-for="(el, i) in array"
        :key="'button'+i"
        @click.prevent="click(el.text)"
      ><span class="chat__link__text">{{ el.text }}</span></button>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    array: Array,
    triggered: {
      default: false
    }
  },
  data(){
    return{
      hide: false,
    }
  },
  methods: {
    click(text) {
      this.hide = true;
      this.$emit("click", text, true);
    }
  },
};
</script>
