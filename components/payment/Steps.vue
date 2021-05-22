<template>
    <div>
        {{ active}}
        {{ text}}
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