<template>
  <span class="chat__profile" id="chatProfile">
    <img :src="require('~/assets/img/robotPlay.png')" alt />
  </span>
</template>
<style scoped>
.chat__profile {
  /*background-image: url("~/assets/img/robotPlay.png");*/
  height: 35px;
  width: 35px;
  background-position: center;
  display: inline-block;
  background-size: 100%;
  background-repeat: no-repeat;
  border-radius: 0;
  margin-right: 10px;
  background: #0079bb;
  position: relative;
  border-radius: 5px;
}
div#chatProfile img{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>