<template>
  <div>
    <div v-show="block == 'list'">

      <div class="chat__search relative">
        <input
          type="text"
          placeholder="Buscar por palabra clave"
          v-model="search"
          class="input shadow chat_input_message"
        />
        <button
          class="button ib-wrapper__button button_search"
        >
          <img :src="require('~/assets/img/icon_search.png')" alt="">
        </button>
      </div>

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
              class="button_Question"
            >
              <h1 class="title_FAQ relative">{{ el.question }} <img :src="require('~/assets/img/flecha-right.png')" class="flechaRight" alt=""></h1>
              <p>
                {{ el.answer_format }}
              </p>
            </button>

          </div>

          <div v-else>No se encontraron resultados</div>
        </simplebar>
      </client-only>
    </div>

    <div v-if="block == 'element'" class="faq-element">
      <client-only>        
        <simplebar
          data-simplebar-auto-hide="false"
          class="chat__body__wrapper"
          id="chat_body_wrapper__faq"
        >
        
      <button class="button_closeFAQ" @click="closeElement">Close</button>
          <h1 class="title_FAQ relative">
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
    .title_FAQ{
      font-size: 16px;
      color: #0079BB;
      display: inline;
    }
    p{
      font-size: 12px;
      color: #353535;
      line-height: 17px;
      text-align: justify;
      margin-top: 10px;
    }
    strong {
      color: #0B6FA6;
    }
  }
  .button_search {
    right: 15px !important;
    img{
      margin-top: 5px;
    }
  }
  .simplebar-content{
    padding: 20px !important;
    position: relative;
  }
  button.button_Question {
    margin-bottom: 10px;
    border-radius: 5px;
    background: #E8F4FF;
    text-align: left;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%; 
    h1.title_FAQ{
      color: #0079BB;
      font-size: 14px;
      img{
        position: absolute;
        right: 0;
        bottom: 50%;
        transform: translate(0, 50%);
        width: 9px;
      }
    }   
    p{
      font-size: 12px;
      color: #353535;
      line-height: 15px;
      margin: 0;
    }
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