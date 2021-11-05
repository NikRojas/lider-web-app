<template>
  <span class="chat__profile " id="chatProfile">
    <img :src="require('~/assets/img/bot.png')" alt />
  </span>
</template>
<style scoped>
.chat__profile {
  height: 42px;
  width: 42px;
  display: inline-block;
  border-radius: 0;
  margin-right: 10px;
  background: #0079bb;
  position: relative;
  border-radius: 5px;
  /*border: 1px solid #336181;*/
}
span#chatProfile img{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  /*width: 36px;*/
  height: 41px;
  vertical-align: bottom;
}
#pgChat.chat .chat__button {
    background: white!important;
}
#pgChat.chat .chat__button .img__wrapper {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.44);
}
</style>