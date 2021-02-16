<template>
  <div id="wrapper">
    <Menu />
    <Sidebar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Sidebar from "../components/layout/Sidebar";
import Menu from "../components/layout/Menu";
import Footer from "../components/layout/Footer";
export default {
  components: {
    Sidebar,
    Footer,
    Menu,
  },
  methods: {
    handleScroll(e) {
      e.preventDefault();
      var header = document.getElementById("header");
      if (window.scrollY > 200) {
        header.classList.add("header1");
      } else {
        header.classList.remove("header1");
      }
      if (window.scrollY > 500) {
        header.classList.add("active");
      } else {
        header.classList.remove("active");
      }
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
      var wow = new WOW({
        boxClass: "wow", // animated element css class (default is wow)
        animateClass: "animated", // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function (box) {
          // the callback is fired every time an animation is started
          // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null, // optional scroll container selector, otherwise use window
      });
      wow.init();
  },
};
</script>
