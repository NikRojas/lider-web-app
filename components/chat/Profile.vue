<template>
  <span class="chat__profile " id="chatProfile">
    <img :src="require('~/assets/img/bot.png')" alt />
  </span>
</template>
<style scoped>
.chat__profile {
  height: 36px;
  width: 36px;
  display: inline-block;
  border-radius: 0;
  margin-right: 10px;
  background: #e8f4ff;
  position: relative;
  border-radius: 5px;
  border: 1px solid #336181;
}
span#chatProfile img{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 30px;
}
#pgChat.chat .chat__button {
    background: white!important;
}
#pgChat.chat .chat__button .img__wrapper {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.44);
}
</style>