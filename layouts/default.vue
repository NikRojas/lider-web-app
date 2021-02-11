<template>
  <div>
    <Menu/>
    <Sidebar/>
    <Nuxt />
    <Footer/>
  </div>
</template>

<script>
import Sidebar from "../components/layout/Sidebar";
import Menu from "../components/layout/Menu";
import Footer from "../components/layout/Footer";
//import Icons from "../components/Icons";

export default {
  components:{
    Sidebar,
    Footer,
    //Icons,
    Menu,
  },
  /*created(){
    this.$router.afterEach((to, from) => {
      this.$store.dispatch('setMenu');
    });
  }*/
}
</script>
