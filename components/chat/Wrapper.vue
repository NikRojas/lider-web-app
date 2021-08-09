<template>
  <div
    class="chat"
    :class="{ active: reveal }"
    id="pgChat"
    v-if="!connectionError"
  >
    <!--<div
      v-for="(record, index) in recordings"
      :key="index"
      class="recorded-item"
    >
      <div class="audio-container">
        <audio :src="record.src" controls />
      </div>
    </div>-->

    <transition name="slide">
      <div class="chat__box shadow" :class="{ active: reveal }" v-show="reveal">
        <div class="chat__header font-weight-bold" id="chatHeader">
          <div class="grid-header-chat">
            <div class="chat__header_avatar_name" id="chatHeader_avatar_name">
              <div class="chat__avatar">
                <img :src="require('~/assets/img/robotPlay.png')" alt />
              </div>
              <div class="chat__name">
                <h3>{{ botName }}</h3>
                <div class="online">
                  <span></span>
                  <p>En línea</p>
                </div>
              </div>
            </div>

            <div class="chat__sound">
              <div class="chat__name">
                <button
                  class="button button--sound"
                  id="buttonSound_chat"
                  v-if="soundSupported"
                  @click="toggleSound"
                >
                  <img
                    :src="require('~/assets/img/vol_off.svg')"
                    alt="Volumen Off"
                    height=""
                    width="auto"
                    v-if="!soundActive"
                  />
                  <img
                    :src="require('~/assets/img/vol_on.svg')"
                    alt="Volumen On"
                    height=""
                    width="auto"
                    v-else
                  />
                  <!--img src="" alt="Volumen On" v-else /-->
                  <!--{{ soundActive ? "V. ON" : "V. OFF" }}-->
                </button>
              </div>
            </div>
          </div>
          <button
            class="button chat__close"
            @click="toggleChat"
            id="buttonChat__Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div class="chat__tab">
          <button
            class="tabActivo"
            id="buttonTab_chatRobot"
            style="display: inline-block"
            @click="setBlock('chat')"
          >
            <img :src="require('~/assets/img/chat_robot.png')" alt="" /> Chat
          </button>
          <button
            class=""
            id="buttonTab_chatFAQ"
            style="display: inline-block"
            @click="setBlock('faq')"
          >
            <img :src="require('~/assets/img/pregunta.png')" alt="" /> Preguntas
            Frecuentes
          </button>
        </div>

        <div class="chat__body" v-show="block == 'faq'">
          <Faq />
        </div>
        <div class="chat__body" v-show="block == 'chat'">
          <client-only>
            <simplebar
              class="chat__body__wrapper"
              data-simplebar-auto-hide="false"
              id="chat_body_wrapper"
            >
              <div v-if="chatMessages.length > 0">
                <div
                  class="chat__message"
                  :class="[
                    el.type ? 'chat__message-server' : 'chat__message-client',
                  ]"
                  v-for="(el, i) in chatMessages"
                  :key="i"
                >
                  <div
                    class="
                      chat__message__wrapper--block chat__message__wrapper--text
                    "
                    v-if="el.message || el.element == 'texts'"
                  >
                    <Profile v-if="el.type == 'server'"></Profile>

                    <div
                      class="chat__wrapper__texts"
                      v-if="el.element == 'texts'"
                    >
                      <Message
                        :text="el2"
                        v-for="(el2, i) in el.content"
                        :key="'texts' + i"
                      ></Message>
                    </div>

                    <div
                      class="
                        chat__message__wrapper chat__message__wrapper--block
                      "
                      v-else-if="el.message"
                    >
                      <Message :text="el.message"></Message>
                    </div>
                  </div>

                  <div
                    class="
                      chat__message__wrapper--block chat__message__wrapper--text
                    "
                    v-if="el.element != 'texts' && el.texts"
                  >
                    <Profile v-if="el.type == 'server'"></Profile>

                    <div class="chat__wrapper__texts">
                      <Message
                        :text="elText"
                        v-for="(elText, i) in el.texts"
                        :key="'texts' + i"
                      ></Message>
                    </div>
                  </div>

                  <div
                    class="
                      chat__message__wrapper--block chat__message__wrapper--text
                    "
                    v-if="el.message_above"
                  >
                    <div
                      class="
                        chat__message__wrapper
                        chat__message__wrapper--block
                        chat__message--ml-auto
                      "
                    >
                      <Message :text="el.message_above"></Message>
                    </div>
                  </div>

                  <div
                    class="
                      chat__message__wrapper chat__message__wrapper--carousel
                    "
                    v-if="el.gallery"
                  >
                    <Gallery :array="el.gallery"></Gallery>
                  </div>

                  <div
                    class="
                      chat__message__wrapper chat__message__wrapper--carousel
                    "
                    v-if="el.element != 'carousel' && el.carousel"
                  >
                    <Carousel :array="el.carousel"></Carousel>
                  </div>

                  <div
                    class="
                      chat__message__wrapper
                      chat__message__wrapper--block
                      chat__message__wrapper--el
                    "
                    v-if="el.element == 'cards'"
                  >
                    <Card :array="el.content" @click="clickButton"></Card>
                  </div>
                  <div
                    class="
                      chat__message__wrapper
                      chat__message__wrapper--block
                      chat__message__wrapper--el
                    "
                    v-if="el.element == 'buttons'"
                  >
                    <Button
                      :triggered="el.triggered"
                      :array="el.content"
                      @click="clickButton"
                    ></Button>
                  </div>
                  <Qualify
                    v-if="el.element == 'qualify'"
                    :array="el.content"
                    :triggered="el.triggered"
                    @click="clickButton"
                  />

                  <div
                    class="
                      chat__message__wrapper chat__message__wrapper--carousel
                    "
                    v-if="el.element == 'carousel'"
                  >
                    <Carousel
                      :array="el.content"
                      @click="clickButton"
                      :triggered="el.triggered"
                    ></Carousel>
                  </div>

                  <div
                    class="
                      chat__message__wrapper chat__message__wrapper--carousel
                    "
                    v-if="el.element == 'carousel-button'"
                  >
                    <CarouselButton
                      :triggered="el.triggered"
                      :array="el.content"
                      @click="clickButton"
                    ></CarouselButton>
                  </div>

                  <div
                    class="
                      chat__message__wrapper chat__message__wrapper--carousel
                    "
                    v-if="el.element == 'gallery'"
                  >
                    <Gallery :array="el.content"></Gallery>
                  </div>

                  <div
                    class="
                      chat__message__wrapper--block chat__message__wrapper--text
                    "
                    v-if="el.message_below"
                  >
                    <div
                      class="
                        chat__message__wrapper
                        chat__message__wrapper--block
                        chat__message--ml-auto
                      "
                    >
                      <Message :text="el.message_below"></Message>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="
                  chat__message chat__message-server chat__message-server-typing
                "
                v-if="chatServerResponse"
              >
                <div
                  class="
                    chat__message__wrapper chat__message__wrapper--block
                    shadow
                  "
                >
                  <div class="chat__message__text" style="margin-left: 15px">
                    <Typing />
                  </div>
                </div>
              </div>
            </simplebar>
          </client-only>
        </div>
        <div class="chat__footer" v-show="block == 'chat'">
          <div class="ib-wrapper" v-if="showInput && !chooseButton">
            <div
              id="buttonMicro_voz"
              class="buttonMicro_voz shadow"
              v-if="!chooseButton"
              :class="recognitionActive ? 'button--disabled' : ''"
            >
              <button
                class="button button--micro"
                @click="startRecording"
                :disabled="recognitionActive"
                v-if="recognitionSupported"
              >
                <img
                  :src="require('~/assets/img/Micro_voz.png')"
                  alt="Micro"
                  height=""
                  width="auto"
                />
                <!--{{ recognitionActive ? "Hablando..." : "Hablar" }}-->
              </button>
            </div>
            <input
              type="text"
              :placeholder="
                chooseButton
                  ? 'Seleccione una opción'
                  : recognitionActive
                  ? 'Escuchando'
                  : 'Escribe tu mensaje aqui'
              "
              v-model="message"
              class="input shadow chat_input_message"
              @keypress.enter="sendMessage"
              :disabled="
                chatServerResponse || chooseButton || recognitionActive
              "
              ref="inputChat"
            />

            <button
              @click.prevent="sendMessage"
              class="button ib-wrapper__button send"
              id="button__sendMessage"
              :disabled="recognitionActive || chooseButton"
            >
              <img :src="require('~/assets/img/send_Mensaje.png')" alt="" />
            </button>
          </div>
          <!--span class="chat__company">
          Powered by
          <a
            rel="noopener"
            target="_blank"
            href="https://playgroup.pe"
            class="font-weight-bold"
            >PLAY Group</a
          >
        </span-->
        </div>
      </div>
    </transition>

    <div class="chat__dialog shadow" v-if="showNotification">
      {{ messageActive }}
    </div>

    <div class="chat__button chat__button--main shadow" v-if="!reveal">
      <span class="chat__notification shadow" v-if="showNotification">1</span>
      <button class="button img__wrapper" id="pgChatButton" @click="toggleChat">
        <img src="/img/futuroso.gif" alt="Chat" />
      </button>
    </div>
  </div>
</template>
<style scoped>
@-webkit-keyframes slide-in-fwd-center {
  0% {
    -webkit-transform: translateZ(-1400px);
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes slide-in-fwd-center {
  0% {
    -webkit-transform: translateZ(-1400px);
    transform: translateZ(-1400px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
.slide-enter-active {
  -webkit-animation: slide-in-fwd-center 0.35s both;
  animation: slide-in-fwd-center 0.35s both;
}

.slide-leave {
  opacity: 0;
  animation: none;
}
</style>
<script>
import Button from "./Button";
import Message from "./Message";
import CloseIcon from "../icons/Close";
import Card from "./Card";
import Carousel from "./Carousel";
import Qualify from "./Qualify";
import CarouselButton from "./CarouselButton";
import Gallery from "./Gallery";
import Profile from "./Profile";
import Typing from "./Typing";
import Faq from "./Faq";
export default {
  components: {
    Button,
    Gallery,
    Message,
    Card,
    Carousel,
    Profile,
    Typing,
    CarouselButton,
    CloseIcon,
    Qualify,
    Faq,
  },
  data() {
    return {
      botName: "LiderBot",
      chooseButton: false,
      reveal: false,
      showNotification: false,
      message: "",
      showInput: true,
      recognitionActive: false,
      recognitionSupported: false,
      recognition: null,
      volume: null,
      firstTime: true,
      connectionError: false,
      host: "",
      chatbotId: "",
      chooseButton: false,
      messageActive: "",
      messagesHello: [
        "¡Hey! Sé que estás ahí, no te olvides que yo puedo ayudarte con cualquier duda.",
        "¿Sigues ahí? Deja tus dudas en mis peludas manos. ¡Yo te ayudo!",
        "¡Regresaste! Acá me encontrarás si tienes cualquier problema.",
        "¿Estás? Recuerda que yo te ayudo con cualquier duda que tengas. ¡Osito Futuroso a tu servicio!",
      ],
      messagesHelloProject: ["Esto es un proyecto", "Departamentos"],
      timerNotification: "",
      soundActive: true,
      soundSupported: true,
      block: "chat",
    };
  },
  computed: {
    chatMessages() {
      return this.$store.getters.getChatMessages;
    },
    chatServerResponse() {
      return this.$store.getters.getChatServerResponse;
    },
    routeName() {
      return this.$route.name;
    },
  },
  updated() {
    this.scrollBottom();
    //console.log($nuxt.$route.name)
    /*if (this.showNotification) {
      setTimeout(() => {
        this.showNotification = false;
      }, 60000);
    }*/
  },
  mounted() {
    if (this.$device.ios) {
      this.soundSupported = false;
    }
    this.initSoundBot();
    this.initMicrophone();
    this.socket = this.$nuxtSocket({
      channel: "/chat",
      reconnection: false,
    });
    this.showMessages();
    this.host = window.location.host + window.location.pathname;
    this.socket.on("message", (resp) => {
      console.log(resp);
      this.setMessage(resp);
      if (resp.route) {
        this.$router.push(this.localePath(resp.route));
      }
      if (resp.route_section) {
        let scrollToOptions = { easing: "ease" };
        if (resp.route_section == "#cotizar") {
          scrollToOptions.offset = +40;
        }
        setTimeout(() => {
          this.$scrollTo(resp.route_section, 1000, scrollToOptions);
        }, 600);
      }
      if (
        resp.element == "buttons" ||
        resp.element == "carousel" ||
        resp.element == "qualify"
      ) {
        this.chooseButton = true;
      }
      let self = this;
      setTimeout(() => {
        if (self.$refs.inputChat) self.$refs.inputChat.focus();
      }, 300);
      this.scrollBottom();
    });

    this.socket.on("conversation", (resp) => {
      this.setConversation(resp);
      this.scrollBottom();
      let self = this;
      setTimeout(() => {
        if (self.$refs.inputChat) self.$refs.inputChat.focus();
      }, 300);
    });

    this.socket.on("connect_error", (resp) => {
      this.connectionError = true;
    });

    this.socket.on("disconnect", (resp) => {
      const el = {
        message: "Hubo un problema de conexión con el servidor.",
        type: "server",
      };
      this.setMessage(el);
      this.$store.dispatch("setChatServerResponse");
      this.showInput = false;
    });
  },
  methods: {
    setBlock(data) {
      this.block = data;
      var btnFAQ = $("#buttonTab_chatFAQ");
      var btnChat = $("#buttonTab_chatRobot");
      if (btnFAQ.hasClass("tabActivo")) {
        btnFAQ.removeClass("tabActivo");
        btnChat.addClass("tabActivo");
      } else {
        btnFAQ.addClass("tabActivo");
        btnChat.removeClass("tabActivo");
      }
    },
    showMessages() {
      let self = this;
      this.timerNotification = setInterval(function () {
        let messages;
        if (
          $nuxt.$route.name == "project___es" ||
          $nuxt.$route.name == "project___en"
        ) {
          messages = "messagesHelloProject";
        } else {
          messages = "messagesHello";
        }
        self.messageActive =
          self[messages][Math.floor(Math.random() * self[messages].length)];
        self.showNotification = true;
      }, 15000); // 60 * 1000 milsec
    },
    initMicrophone() {
      if (
        "webkitSpeechRecognition" in window ||
        "SpeechRecognition" in window ||
        "webkitSpeechRecognition" in window ||
        "mozSpeechRecognition" in window
      ) {
        this.recognition = new (window.SpeechRecognition ||
          window.webkitSpeechRecognition ||
          window.mozSpeechRecognition ||
          window.msSpeechRecognition)();
        this.recognition.lang = "es-PE";
        this.recognition.interimResults = false;
        var self = this;
        this.recognition.onresult = function (event) {
          //console.log("You said: ", event.results[0][0].transcript);
          self.message = event.results[0][0].transcript;
          self.sendMessage();
          self.recognitionActive = false;
          let audio = new Audio(
            "https://freesound.org/data/previews/69/69723_866625-lq.mp3"
          );
          audio.play();
        };
        this.recognition.onspeechend = function (event) {};
        this.recognition.onerror = function (e) {
          //console.log(e);
        };
        self.recognitionSupported = true;
        if (
          /Edge/.test(window.navigator.userAgent) ||
          /Edg/.test(window.navigator.userAgent)
        ) {
          this.recognitionSupported = false;
        }
      } else {
        // speech recognition API not supported
        //console.log("speech recognition API not supported");
      }
    },
    startRecording() {
      let audio = new Audio(
        "https://freesound.org/data/previews/173/173328_2370190-lq.mp3"
      );
      audio.play();
      this.recognitionActive = true;
      this.recognition.start();
    },
    toggleChat() {
      this.reveal = !this.reveal;
      this.showNotification = false;
      if (this.reveal && this.firstTime) {
        this.$store.dispatch("setChatServerResponse");
        this.socket.emit("join", this.chatbotId, this.host);
      } else {
        this.firstTime = false;
      }
      if (this.reveal) {
        clearInterval(this.timerNotification);
      } else {
        this.showMessages();
      }
    },
    scrollBottom() {
      setTimeout(() => {
        document.querySelector(
          "#chat_body_wrapper .simplebar-content-wrapper"
        ).scrollTop =
          document.querySelector(
            "#chat_body_wrapper .simplebar-content-wrapper"
          ).scrollHeight -
          0 -
          35;
      }, 250);
    },
    clickButton(text, triggered = false) {
      this.message = text;
      this.sendMessage(triggered);
    },
    sendMessage(triggered = false) {
      if (!this.message) {
        return;
      }
      const el = { message: this.message };
      this.socket.emit("message", this.chatbotId, el, triggered);
      this.setMessage(el);
      this.message = "";
    },
    setConversation(array) {
      this.$store.dispatch("setConversation", array);
      this.$store.dispatch("setChatServerResponse");
      const [lastItem] = array.slice(-1);
      if (
        lastItem.triggered === undefined &&
        (lastItem.element == "buttons" ||
          lastItem.element == "carousel" ||
          lastItem.element == "qualify")
      ) {
        this.chooseButton = true;
      }
    },
    setMessage(obj) {
      this.$store.dispatch("setMessage", obj);
      this.$store.dispatch("setChatServerResponse");
      this.chooseButton = false;
    },
    toggleSound() {
      this.soundActive = !this.soundActive;
      this.$cookies.set("fizFIb1Ygg", this.soundActive);
      window.speechSynthesis.cancel();
    },
    async speak(phrases) {
      window.speechSynthesis.cancel();
      let sentence;
      let voiceSpanish = window.speechSynthesis
        .getVoices()
        .findIndex(function (voice) {
          return (
            voice.name === "Google español de Estados Unidos" ||
            voice.lang === "es-MX" ||
            voice.lang === "es-ES"
          );
        });
      let self = this;
      for (var i = 0; i < phrases.length; i++) {
        let n = new window.SpeechSynthesisUtterance(
          phrases[i].replace(/(<([^>]+)>)/gi, "")
        );
        n.volume = 1;
        //n.rate = 1;
        //n.pitch = 0;
        n.lang = "es-ES";
        n.voice = window.speechSynthesis.getVoices()[voiceSpanish];
        window.speechSynthesis.speak(n);
      }
    },
    initSoundBot() {
      const cookieSound = this.$cookies.get("fizFIb1Ygg");
      if (typeof cookieSound !== "undefined") {
        this.soundActive = cookieSound;
      } else {
        this.$cookies.set("fizFIb1Ygg", this.soundActive);
      }
    },
  },
  created() {
    const ZnV0dXJhIGNoYXRib3Q = this.$cookies.get("ZnV0dXJhIGNoYXRib3Q");
    if (!ZnV0dXJhIGNoYXRib3Q) {
      this.chatbotId = Date.now() + Math.random().toString().slice(2) + "cGc=";
      this.$cookies.set("ZnV0dXJhIGNoYXRib3Q", this.chatbotId);
    } else {
      this.chatbotId = ZnV0dXJhIGNoYXRib3Q;
    }
  },
  watch: {
    reveal: {
      immediate: true,
      handler(newVal, oldVal) {},
    },
    /*routeName:{
      immediate: true,
      handler(newVal, oldVal) {
        console.log(newVal);
      },
    },*/
    showNotification: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal) {
          setTimeout(() => {
            this.showNotification = false;
          }, 3000);
        }
      },
    },
    chatMessages: {
      handler: function (newValue) {
        if (newValue.length > 0) {
          console.log(newValue);
          if (!this.$device.ios) {
            let value = newValue[newValue.length - 1];
            if (value.type == "server") {
              if (this.soundActive) {
                if (typeof value.element !== "undefined") {
                  if (value.element === "texts") {
                    this.speak(value.content);
                  } else {
                    let phrase = [];
                    if (value.message) {
                      phrase = [...phrase, value.message];
                    }
                    if (value.texts) {
                      phrase = phrase.concat(value.texts);
                    }
                    if (typeof value.message_above !== "undefined") {
                      phrase.push(value.message_above);
                    }
                    if (typeof value.message_below !== "undefined") {
                      phrase.push(value.message_below);
                    }
                    console.log(phrase);
                    this.speak(phrase);
                  }
                } else {
                  const phrase = new Array(value.message);
                  this.speak(phrase);
                }
              }
            }
          }
        }
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
#pgChat {
  .button--disabled {
    opacity: 0.6;
  }
  .chat__message--ml-auto {
    margin-left: auto;
  }
  &.chat {
    .send {
      vertical-align: middle;
      //margin-top: 3px;
    }
    .bg {
      background: #f6f6fc;
    }
    input:disabled {
      background: #cecece;
    }
    .input {
      width: 100%;
      height: 50px;
      border: none;
      outline: none;
      display: inline;
      padding: 0 45px 0 15px;
      border-radius: 10px;
      font-size: 14px;
    }

    .button {
      border: 0;
      padding: 0;
      cursor: pointer;
      //font-family: 'Poppins', Helvetica, Arial, sans-serif;
      font-weight: normal;
      &:focus {
        outline: 0;
      }
    }
    .input {
      //font-family: 'Poppins', Helvetica, Arial, sans-serif;
      font-weight: normal;
    }
    .font-weight-light {
      font-weight: 300;
    }
    .font-weight-bold {
      font-weight: 700;
    }
    .color-secondary {
      color: darkgrey;
    }
  }
  .shadow {
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.11),
      0 5px 15px 0 rgba(0, 0, 0, 0.08);
  }
  .chat__link__text {
    display: none;
  }
  .chat__link {
    background: #f33459;
    color: white;
    cursor: pointer;
    border-radius: 50px;
    padding: 8px 20px;
    // margin: 3px;
    border: 0;
    &::before {
      content: "Elegir";
    }
    &.chat__link--button {
      margin-bottom: 10px;
      display: block;
      .chat__link__text {
        display: block !important;
      }
      &::before {
        content: none !important;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .chat__link {
      margin-right: 5px !important;
    }
  }

  .chat__close {
    margin-left: auto;
    background: transparent;
    font-size: 16px;
    position: absolute;
    top: 20px;
    right: 20px;
    svg {
      vertical-align: middle;
      stroke-width: 30;
      color: white;
    }
  }
  .chat__company {
    font-size: 11px;
    display: block;
    text-align: right;
    margin-top: 7px;
    a {
      color: #f33459;
      text-decoration: none;
      font-size: 12px;
    }
  }

  /*.chat__message__wrapper--carousel {
  margin-left: 20px;
}*/
  .chat__dialog {
    position: relative;
    display: inline-block;
    margin-bottom: 15px;
    max-width: 200px;
    border-radius: 10px;
    font-size: 13px;
    background: white;
    &::before {
      content: "";
      position: absolute;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
      /*-moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);*/
      transform: rotate(45deg);
      bottom: -5px;
      right: 31px;
      border-color: transparent #fff #fff transparent;
      border-style: solid;
      border-width: 5px;
    }
    padding: 10px 12.5px;
  }

  .chat__message-server-typing {
    .chat__message__text {
      float: left !important;
      font-size: 20px !important;
      letter-spacing: 5px !important;
      padding-top: 5px !important;
      padding-bottom: 5px !important;
    }
  }

  .chat__button--main {
    position: relative;
    .chat__notification {
      position: absolute;
      top: 0;
      right: 0;
      background: red;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }
  .ib-wrapper {
    position: relative;
    display: flex;
    //width: calc(100% - 45px);
    /*margin-left: 20px;
  margin-right: 20px;*/
    border-radius: 10px;
  }
  .chat__message__wrapper--text {
    display: flex;
    padding: 0 20px;
  }
  .chat__message__wrapper--el {
    margin-left: 50px;
  }
  .ib-wrapper__button {
    cursor: pointer;
    background: transparent;
    border-radius: 50%;
    height: 50px;
    position: absolute;
    right: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    border: none;
    outline: none;
    text-align: center;
    font-size: 23px;
    font-weight: 700;
    border-radius: 10px;
    width: 64px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding: 10px 0;
    background: #f33459;
  }

  .grid-header-chat {
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    .chat__avatar img {
      max-width: 95px;
      vertical-align: bottom;
      margin-right: 1rem;
    }
    .chat__name {
      color: #fff;
      h3 {
        margin: 9px 0;
        color: #fff;
        font-size: 1.25rem;
      }
      .online {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        font-size: 14px;

        span {
          width: 8px;
          height: 8px;
          position: relative;
          display: block;
          background: #3ae23f;
          border-radius: 5px;
          margin-right: 5px;
        }
      }
    }
  }

  @media screen and (max-width: 650px) {
    &.chat {
      &.active {
        right: 0;
        max-width: 100%;
      }
      .chat__box .chat__body__wrapper {
        height: 55vh !important;
      }
    }
  }
  &.chat {
    .button--micro {
      color: #000;
      border-radius: 50px;
      background-color: white;
      padding: 5px 16px;
      font-weight: 500;
      line-height: 1.25;
      display: flex;
      justify-items: center;
      img {
        margin-right: 7px;
      }
    }
    position: fixed;
    right: 80px;
    .chat__close {
      .icon {
        width: 1.25em;
        height: 1.25em;
      }
    }
    .icon {
      display: inline-block;
      width: 1.6em;
      height: 1.6em;
      stroke-width: 0;
      stroke: currentColor;
      fill: currentColor;
    }

    input:focus {
      //outline: none;
      z-index: 0 !important;
    }
    &.active {
      width: 100%;
      max-width: 400px;
      bottom: 0;
    }

    bottom: 5%;
    z-index: 999;

    .chat__button {
      margin-left: auto;
      height: 80px;
      width: 80px;
      border-radius: 50%;
      padding: 0;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      .img__wrapper {
        display: flex;
        justify-content: center;
        overflow: hidden;
        display: flex;
        align-items: center;
        height: inherit;
        width: inherit;
        border-radius: 50%;
        img {
          //height: 45px;
          height: 80px;
          width: auto;
        }
      }
    }
    .chat__box {
      margin-bottom: 10px;
      &.active {
        margin-bottom: 0;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        //background-image: url(https://storage.googleapis.com/playgroup-bots/wiener/img/fondo.jpg);
      }
      .chat__body,
      .chat__footer {
        background: white;
      }
      .chat__header {
        background: #0079bb;
        //background-image: url(https://storage.googleapis.com/playgroup-web/bot/images/bg-bot.jpg);
        background-size: cover;
        /*border-bottom: 1px solid #d0d0ef;*/
        padding: 18px 20px 0;
        display: -webkit-box;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        position: relative;
        color: #fff;
      }
      .chat__wrapper__texts {
        max-width: 73%;
        .chat__message__text {
          float: left !important;
        }
      }
      .chat__message {
        //display: flex;
        width: 100%;
        .chat__message__wrapper {
          margin-bottom: 10px;
          &.chat__message__wrapper--block {
            //width: 75%;
            display: block;
            max-width: 73%;
          }
          &.chat__message__wrapper--full {
            width: 100%;
          }
        }
        .chat__message__text {
          display: inline-block;
          padding: 10px 18px;
          font-size: 12px;
          margin-bottom: 10px;
          border-radius: 5px;
          background: #e8f4ff;
        }

        &.chat__message-server {
          width: 100%;
          .chat__message__wrapper {
            margin-right: auto;
          }
          .chat__message__text {
            float: right;
          }
        }
        &.chat__message-client {
          .chat__message__wrapper {
            margin-left: auto;
            display: flex;
            justify-content: flex-end;
          }
          .chat__message__text {
            background: #0091c5;
            color: #fff;
          }
        }
      }
      .chat__body__wrapper {
        padding: 20px 0px;
        height: 400px;
        //overflow: auto;
      }
      .chat__footer, .chat__search {
        padding-bottom: 10px;
        padding-right: 15px;
        padding-left: 15px;
        padding-top: 10px;
      }
    }
  }
  //logo chat bot
  &.chat {
    bottom: 5%;
    right: 80px;
    @media only screen and (max-width: 1650px) {
      bottom: 3%;
      right: 55px;
    }
    @media only screen and (max-width: 1300px) {
      bottom: 3%;
      right: 40px;
    }
    @media only screen and (max-width: 700px) {
      right: 20px;
      bottom: 1.5%;
    }
    .chat__button {
      height: 56px;
      width: 56px;

      .img__wrapper img {
        height: 56px;
      }
    }
    .ml-auto {
      margin-left: auto;
    }
    .mt-1 {
      margin-top: 0.5rem;
    }
    .mb-0 {
      margin-bottom: 0 !important;
    }
  }
}

/*===========================*/
/*ESTILOS JOSEPH*/

div#pgChat {
  .relative {
    position: relative;
  }
  .chat__header {
    padding: 18px 20px !important;
  }

  .chat__body {
    padding-top: 10px;
  }

  .chat__header_avatar_name {
    display: grid !important;
    grid-template-columns: auto 1fr !important;
    background: rgba(255, 255, 255, 0.3) !important;
    border-radius: 5px;
    padding: 1px 35px 0 14px;
    .chat__avatar {
      img {
        max-width: 100% !important;
        width: 31px !important;
      }
    }
    .chat__name {
      padding-top: 4px !important;
      h3 {
        margin: 0 !important;
        font-weight: 100 !important;
        font-size: 14px !important;
      }
      .online {
        margin-bottom: 0 !important;
        span {
          width: 6px !important;
          height: 6px !important;
        }
        p {
          font-size: 10px !important;
          color: white !important;
          margin-bottom: 0px !important;
          line-height: 10px !important;
          font-weight: 100 !important;
        }
      }
    }
  }

  .button--sound {
    margin-left: 10px;
    padding: 10px !important;
    display: grid;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    width: 39px;
  }

  .chat__close {
    background: rgba(255, 255, 255, 0.2) !important;
    padding: 7px 9px !important;
    border-radius: 5px;
    position: initial;
    svg {
      font-size: 10px;
      display: block;
    }
  }

  .ib-wrapper__button {
    background: #0079bb;
    height: 38px;
    width: 42px;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .buttonMicro_voz {
    background: #0079bb;
    margin-right: 10px;
    border-radius: 5px;
    display: grid;
    .button--micro {
      background: none;
      align-items: center;
      align-content: center;
      img {
        margin-right: 0 !important;
        width: 21px;
      }
    }
  }

  .chat_input_message {
    height: 38px !important;
    min-height: 38px !important;
    font-size: 13px !important;
    border-radius: 5px !important;
  }

  .chat__link--button {
    display: inline-block;
    background: none;
    color: #f15f23;
    font-size: 12px;
    border: 1px solid #f15f23;
    border-radius: 5px;
    margin-right: 8px;
    width: 100%;
    margin-left: 17px;
    &:hover {
      background: #f15f23;
      color: white;
    }
  }

  /* ESTILOS DE DESPARTAMENTOS Y DISTRITOS */
  .chat_link_button_departamente_distrito {
    width: auto;
  }

  .faceReaction__content {
    display: flex !important;
    justify-content: space-around;
    .face_reaction {
      width: auto !important;
      border: none;
      padding: 6px;
      margin-bottom: 0;
      margin-right: 0;
      &:hover {
        background: none !important;
      }
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
    /* clases de Caras */
    .face_veryBad {
      //border: 1px solid #ff4a4a;
    }
    .face_Bad {
      //border: 1px solid #f15f23;
    }
    .face_regular {
      //border: 1px solid #e3d01e;
    }
    .face_god {
      //border: 1px solid #77e351;
    }
    .face_verygod {
      //border: 1px solid #189f0c;
    }
  }

  /* ESTILOS DEL TAB */
  .chat__tab {
    display: inline-flex;
    background: #f9f9f9;
    padding: 12px 0 0 22px;
    width: 100%;
    button {
      background: none;
      color: #353535;
      font-size: 12px;
      font-weight: 500;
      padding: 6px 28px;
      margin-right: 12px;
      &.tabActivo {
        background: white;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-top: 1px solid #eeeeee;
        border-left: 1px solid #eeeeee;
        border-right: 1px solid #eeeeee;
      }
    }
  }
}
</style>
