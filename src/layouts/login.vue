<template lang="pug">
    header 
        div.container
            img(src='../assets/image/base/logo.svg' style='width:243px;height:30px;' alt='logo')
            div.conteiner-butts
                p.font-base Поддержка

    main
        slot
</template>

<script lang="ts">
export default {
    name: "login-layout",
}
</script>

<style lang="scss">
header {
    .container {
        display: flex;
        width: 100%;
        height: 80px;
        background: transparent;
        padding-top: 40px;
        padding-left: 40px;
        padding-right: 40px;
        align-items: center;
        justify-content: space-between;
        &-butts {
            display: flex;
            align-items: center;
        }
    }
}
</style>
