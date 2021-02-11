<template>
    <header class="">
	<div class="container">
		<div class="grid-menu">
			<div class="left wow fadeInLeft">
				<div class="logo">
                    <a href="index.php">
                        <img src="~/assets/img/logo-color.png" alt="" class="logo1 lazyload" style="display: none;">
                        <img src="~/assets/img/logo.png" alt="" class="logo2 lazyload">
                    </a>
				</div>
				<div class="menu">
					<a id="abrir-side" @click.prevent="openMenu"><i class="flaticon-menu"></i></a>
				</div>
			</div>
			<div class="nav wow fadeIn" data-wow-delay="0.2s">
				<a href="" class="btn-circle"><i class="flaticon-whatsapp-1"></i></a>
				<a href="" class="btn-circle"><i class="flaticon-telephone"></i></a>
				<a href="" class="btn-idioma">ES <img class="lazyload" src="~/assets/img/es.png" alt=""> <i class="flaticon-download"></i></a>
			</div>
		</div>
	</div>
</header>
</template>

<script>
export default {
  computed: {
    menu() {
      return this.$store.getters.getMenu;
    },
  },
  data() {
    return {
    };
  },
  methods:{
    openMenu(){
      this.$store.dispatch('setMenuOpen');
    }
  }
};
</script>
