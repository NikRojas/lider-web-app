<template>
  <div class="hola">
    <div >
      <div class="chat__search relative">
        <input
          type="text"
          placeholder="Buscar por palabra clave"
          v-model="search"
          class="input shadow chat_input_message"
        />
        <button class="button ib-wrapper__button button_search">
          <img :src="require('~/assets/img/icon_search.png')" alt="" />
        </button>
      </div>

      <client-only>
        <simplebar
          data-simplebar-auto-hide="false"
          class="chat__body__wrapper"
          id="chat_body_wrapper__faq"
        >
          <div class="content__button_Question" v-if="filteredList.length > 0">
            <button
              v-for="el in filteredList"
              :key="'chfaq' + el.id"
              @click="setElement(el)"
              class="button_Question"
            >
              <h1 class="title_FAQ relative">
                {{ el.question }}
                <img
                  :src="require('~/assets/img/flecha-right.png')"
                  class="flechaRight"
                  alt=""
                />
              </h1>
              <p>
                {{ el.answer_format }}
              </p>
            </button>
          </div>

          <div v-else>
            <div class="content__button_Question">              
              <div class="without_results">
                <img :src="require('~/assets/img/p-no-results.png')" alt="">
                <p>No se encontraron resultados</p>
              </div>              
            </div>
          </div>
        </simplebar>
      </client-only>
    </div>
<!-- v-if="block == 'element'" -->
    <div  class="faq-element shadow" id="id_faq_element">
      <client-only>
        <simplebar
          data-simplebar-auto-hide="false"
          class="chat__body__wrapper"
          id="chat_body_wrapper__faq"
        >
          <div class="content__Answer relative ">
            <button class="button_closeFAQ" @click="closeElement"><img :src="require('~/assets/img/close_Answer_FAQ.png')" alt=""></button>
            <h1 class="title_FAQ relative">
              {{ element.question }}
            </h1>
            <div v-html="element.answer"></div>
          </div>
        </simplebar>
      </client-only>
    </div>
  </div>
</template>
<style lang="scss">
#pgChat {
  .faq-element {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: white;
    transform: translate(0px, 100%);
    transition: 0.8s all;
    z-index: 3;
    &.up_faq_element{
      transform: translate(0px, 0%);
    }
    .title_FAQ {
      font-size: 16px;
      color: #0079bb;
      display: inline;
    }
    p {
      font-size: 12px;
      color: #353535;
      line-height: 17px;
      text-align: justify;
      margin-top: 20px;
      margin-bottom: 0;

    }
    strong {
      color: #0b6fa6;
    }
  }
  .button_search {
    right: 15px !important;
    img {
      margin-top: 5px;
    }
  }
  .simplebar-content {
    //padding: 20px !important;      v-show="block == 'list'"
    position: relative;
    .content__Answer{      
      padding-left: 30px;
      padding-right: 30px;
      border-radius: 5px;
      p{
        img{
          display: table;
          margin: auto;
        }
        a{
          color: #F15F23;
        }
      }
      .button_closeFAQ{
        position: absolute;
        padding: 0 0 0px 10px;
        right: 31px;
        background: none;

      }
    }
  }

  .content__button_Question {
    padding-left: 20px;
    padding-right: 20px;
    button.button_Question {
      margin-bottom: 10px;
      border-radius: 5px;
      background: #e8f4ff;
      text-align: left;
      padding-left: 20px;
      padding-right: 20px;
      width: 100%;
      h1.title_FAQ {
        color: #0079bb;
        font-size: 14px;
        img {
          position: absolute;
          right: 0;
          bottom: 50%;
          transform: translate(0, 50%);
          width: 9px;
        }
      }
      p {
        font-size: 12px;
        color: #353535;
        line-height: 15px;
        margin: 0;
      }
    }
    .without_results{
      text-align: center;
      img{
        width: 120px;
      }
      p{
        font-weight: 500;
      }
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
      /*this.element = {
        question: "",
        answer: "",
      };  */    
      var up_faq = $("#id_faq_element");
      up_faq.removeClass("up_faq_element")
    },
    setElement(el) {
      this.element = el;
      this.block = "element";
      var up_faq = $("#id_faq_element");
      up_faq.addClass("up_faq_element");
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