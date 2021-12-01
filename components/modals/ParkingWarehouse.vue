<template>
    <div style="display: inline-block">
    <a href="#" class="btn btn--parkingwarehouse" @click.prevent="showModal">
      {{ $t("Ver Piso") }}
    </a>
    <client-only>
        <modal
        :name="'modal'+modalId"
        class="modal--parkingswarehouses"
        height="70%"
        width="95%"
        :max-width="1100"
        :adaptive="true"
        >
        <button
            class="close-button"
            style="cursor: pointer"
            type="button" 
            @click.prevent="$modal.hide('modal'+modalId)"
        >
            ✖
        </button>
        <div>
            <div class="content-modal">
                <h3 class="title">{{ floorData.name }}</h3>
                    <p>{{ estate.description }}</p>
                <div style="height: 460px;">
                    <img :src="storageUrl + '/img/projects/floors/' + floorData.image" alt="">
                </div>
            </div>
        </div>
        </modal>
    </client-only>
    </div>
</template>
<script>
export default {
    props:{
        floorData: Object,
        estate: Object
    },
    data(){
        return{
             storageUrl: process.env.STORAGE_URL,
             modalId: '_'+Math.random().toString(36).substr(2, 9)
        }
    },
    methods: {
    showModal() {
      this.$modal.show("modal"+this.modalId);
    },
  },
}
</script>