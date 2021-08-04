<template>
  <div
    class="
      chat__message__wrapper
      chat__message__wrapper--block
      chat__message__wrapper--el
      chat__qualify__wrapper
      faceReaction__content
    "
  >
    <template v-if="!triggered && !hide">
      <button
        class="chat__link chat__link--button shadow face_reaction"
        v-for="(el, i) in array"
        :key="'button'+i"
        @click.prevent="clickButton(el.value)"
        :class="el.classes"
      >
      <img :src="require('~/assets/img/face_reaction/muyMalo.png')" height="15" width="auto" v-if="el.value == 'Muy mala'"  alt="">
      <img :src="require('~/assets/img/face_reaction/Malo.png')" height="15" width="auto" v-if="el.value == 'Mala'"  alt="">
      <img :src="require('~/assets/img/face_reaction/regular.png')" height="15" width="auto" v-if="el.value == 'Regular'"  alt="">
      <img :src="require('~/assets/img/face_reaction/bueno.png')" height="15" width="auto" v-if="el.value == 'Buena'"  alt="">
      <img :src="require('~/assets/img/face_reaction/muybueno.png')" height="15" width="auto" v-if="el.value == 'Muy buena'"  alt="">

      
      </button>
    </template>
  </div>
</template>
<style scoped>
.chat__link--button{
    display: inline-block !important;
}
</style>
<script>
export default {
  props: {
    array: Array,
    triggered: {
      default: false,
    },
  },
  data(){
    return{
      hide: false,
    }
  },
  methods: {
    clickButton(text) {
      this.hide = true;
      this.$emit("click", text, true);
    },
  },
};
</script>