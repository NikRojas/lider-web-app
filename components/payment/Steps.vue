<template>

        <div class="sized-container">
            <div class="pagination-container ">
                <div class="">
                <div class="pagination">
                    <div class="indicator"  :class="active == 'index' ? 'active' : ''">
                        <div class="tag">{{ $t('Elige tu inmueble') }}</div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: 0%;"></div>
                    </div>
                    <div class="indicator" :class="active == 'reserve' ? 'active' : ''">
                        <div class="tag">{{ $t('Ingresa tus datos') }}</div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar"></div>
                    </div>
                    <div class="indicator"  :class="active == 'summary' ? 'active' : ''">
                        <div class="tag">{{ $t('Resumen de separación') }}</div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar"></div>
                    </div>
                    <div class="indicator"  :class="active == 'success' ? 'active' : ''">
                        <div class="tag">{{ $t('Realiza el pago') }}</div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar"></div>
                    </div>
                </div>
                </div>
            </div>
        </div>

</template>
<script>
export default {
    props:{
        active: String,
        text: String
    }
}
</script>