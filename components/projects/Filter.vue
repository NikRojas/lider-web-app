<template>
    <section class="filtro-home wow fadeInUp" data-wow-delay="0.8s">
	<div class="container">
		<div class="grid-filtro">
			<h1>{{ label }}</h1>
			<div class="grid-input-filtro">
				<div class="dropdown top">
					<div class="dropdown-result">Ciudad - Distrito <i class="flaticon-download"></i></div>
					<div class="dropdown-content">
						<div class="form-control first">
							<input class="checkbox" id="checkbox-1" type="checkbox" value="value1">
    						<label for="checkbox-1">Arequipa</label>
						</div>
						<div class="form-control second">
							<input class="checkbox" id="checkbox-2" type="checkbox" value="value2">
    						<label for="checkbox-2">Distrito 1</label>
						</div>
						<div class="form-control second">
							<input class="checkbox" id="checkbox-3" type="checkbox" value="value2">
    						<label for="checkbox-3">Distrito 2</label>
						</div>
						<div class="form-control first">
							<input class="checkbox" id="lima" type="checkbox" value="value1">
    						<label for="lima">Lima</label>
						</div>
						<div class="form-control second">
							<input class="checkbox" id="lima1" type="checkbox" value="value1">
    						<label for="lima1">Distrito 1</label>
						</div>
						<div class="form-control second">
							<input class="checkbox" id="lima2" type="checkbox" value="value1">
    						<label for="lima2">Distrito 2</label>
						</div>
					</div>
				</div>
				<div class="dropdown top">
					<div class="dropdown-result">Estatus del proyecto <i class="flaticon-download"></i></div>
					<div class="dropdown-content">
						<div class="form-control first">
							<input class="checkbox" id="venta" type="checkbox" value="value1">
    						<label for="venta">Pre-venta</label>
						</div>
						<div class="form-control first">
							<input class="checkbox" id="contrucción" type="checkbox" value="value1">
    						<label for="contrucción">En contrucción</label>
						</div>
						<div class="form-control first">
							<input class="checkbox" id="inmediata" type="checkbox" value="value1">
    						<label for="inmediata">Entrega inmediata</label>
						</div>
					</div>
				</div>
				<div class="dropdown top">
					<div class="dropdown-result">N° dormitorios <i class="flaticon-download"></i></div>
					<div class="dropdown-content">
						<div class="form-control first">
							<input class="checkbox" id="1dorm" type="checkbox" value="value1">
    						<label for="1dorm">1 Dormitorio</label>
						</div>
						<div class="form-control first">
							<input class="checkbox" id="2dorm" type="checkbox" value="value1">
    						<label for="2dorm">2 Dormitorios</label>
						</div>
						<div class="form-control first">
							<input class="checkbox" id="3dorm" type="checkbox" value="value1">
    						<label for="3dorm">3 Dormitorios</label>
						</div>
					</div>
				</div>
				<a href="" class="btn btn2">Buscar</a>
			</div>
		</div>
	</div>
</section>
</template>
<script>
export default {
    props:{
        label:String
    }
}
</script>