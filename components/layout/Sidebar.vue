<template>
  <div class="nav-bar" :class="{ active: menuOpen }">
    <div class="sombra"></div>
    <div class="content">
      <div class="head">
        <img src="~/assets/img/logo.png" class="lazyload" alt="" />
        <a href="#" @click.prevent="closeMenu"
          ><i class="flaticon-cancelar"></i
        ></a>
      </div>
      <div class="link-menu">
        <ul>
          <li><a href="page-nosotros.php">Nosotros</a></li>
          <li><a href="index.php">Proyectos</a></li>
          <li><a href="page-testimonios.php">Testimoniales</a></li>
          <li><a href="page-cami.php">Comunidad Amiga - CAMI</a></li>
          <li><a href="page-blog.php">Blog</a></li>
          <li><a href="page-contacto.php">Contacto</a></li>
        </ul>
      </div>
      <div class="redes">
        <ul>
          <li
            v-for="(social, index) in menu.social_networks"
            :key="'sm' + index"
          >
            <a
              class="btn-circle"
              :href="social.url"
              target="_blank"
              rel="noopener"
            >
              <i :class="'flaticon-' + social.master_social_networks.icon" v-if="social.master_social_networks.icon"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    menu() {
      return this.$store.getters.getMenu;
    },
    menuOpen() {
      return this.$store.getters.getMenuOpen;
    },
  },
  methods: {
    closeMenu() {
      this.$store.dispatch("setMenuOpen");
    },
  },
  data() {
    return {};
  },
};
</script>