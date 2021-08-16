<template>
  <span class="chat__profile" id="chatProfile">
    <img :src="require('~/assets/img/robotPlay.png')" alt />
  </span>
</template>
<style scoped>
.chat__profile {
  height: 36px;
  width: 36px;
  display: inline-block;
  border-radius: 0;
  margin-right: 10px;
  background: #0079bb;
  position: relative;
  border-radius: 5px;
}
span#chatProfile img{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 36px;
}
</style>