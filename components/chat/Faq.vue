<template>
  <div>
    
      <div v-show="block == 'list'">
          <input
        type="text"
        placeholder="Buscar por palabra clave"
        v-model="search"
      />
      <button>Search</button>
        <client-only>
          <simplebar
            data-simplebar-auto-hide="false"
            class="chat__body__wrapper"
            id="chat_body_wrapper__faq"
          >
            <div v-if="filteredList.length > 0">
            <button
              v-for="el in filteredList"
              :key="'chfaq' + el.id"
              @click="setElement(el)"
            >
              <h1>{{ el.question }}</h1>
              <p>
                {{ el.answer_format }}
              </p>
            </button>
            </div>

            <div v-else>
                No se encontraron resultados
            </div>
          </simplebar>
        </client-only>
      </div>
        <div v-if="block == 'element'" class="faq-element">
          <button @click="closeElement">Close</button>
          <client-only>
            <simplebar
              data-simplebar-auto-hide="false"
              class="chat__body__wrapper"
              id="chat_body_wrapper__faq"
            >
              <h1>
                {{ element.question }}
              </h1>
              <div v-html="element.answer"></div>
            </simplebar>
          </client-only>
        </div>
    </div>
    
</template>
<style lang="scss">
#pgChat {
  .faq-element {
   
  }
}
</style>
<script>
export default {
  data() {
    return {
      block: "list",
      questions: [],
      search: "",
      element: {
        question: "",
        answer: "",
      },
    };
  },
  methods: {
    closeElement() {
      this.block = "list";
      this.element = {
        question: "",
        answer: "",
      };
    },
    setElement(el) {
      this.element = el;
      this.block = "element";
    },
    getFaq() {
      this.$axios.$get("/api/chat/get/faq").then((response) => {
        this.questions = response;
      });
    },
  },
  computed: {
    filteredList() {
      return this.questions.filter((el) => {
        return (
          el.question.toLowerCase().includes(this.search.toLowerCase()) ||
          el.answer.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  mounted() {
    this.getFaq();
  },
};
</script>