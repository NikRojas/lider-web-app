<template>
  <div style="display: inline-block">
    <a href="#" @click.prevent="showModal">
      {{ $t("Términos y Condiciones") }}
    </a>
    <client-only>
        <modal
        name="terms"
        class="modal--terms"
        height="auto"
        width="95%"
        :max-width="800"
        :adaptive="true"
        >
        <button
            class="close-button"
            style="cursor: pointer"
            type="button" 
            @click.prevent="$modal.hide('terms')"
        >
            ✖
        </button>
        <div>
            <div class="container">
            <h3 class="text-center">{{ $t("Términos y Condiciones") }}</h3>

            <div
                class="text text-justify"
                v-if="
                content[
                    content.findIndex((x) => x.name === 'Información')
                ].content_formatted.includes('description') &&
                content[
                    content.findIndex((el) => el.name === 'Información')
                ].content.find((x) => x.field === 'description')[
                    'value_' + $i18n.locale
                ]
                "
                v-html="
                content[
                    content.findIndex((el) => el.name === 'Información')
                ].content.find((x) => x.field === 'description')[
                    'value_' + $i18n.locale
                ]
                "
            ></div>
            </div>
        </div>
        </modal>
    </client-only>
  </div>
</template>
<script>
export default {
  props: {
    content: Array,
  },
  methods: {
    showModal() {
      this.$modal.show("terms");
    },
  },
};
</script>