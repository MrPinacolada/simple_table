<template lang="pug">
    header.head-login 
        div.container
            img(src='../assets/image/base/logo.svg' style='width:243px;height:25px;' alt='logo')
            div.container-butts
                p.font-base Поддержка
                img(src='../assets/image/icons/telegram.svg' style='width:30px;height:30px;'  alt='tg')
                img(src='../assets/image/icons/whatsapp.svg' style='width:30px;height:30px;'  alt='wh')
                

    main
        slot
</template>

<script lang="ts">
export default {
    name: "login-layout",
}
</script>

<style lang="scss">
.head-login {
    .container {
        display: flex;
        width: 100%;
        height: 80px;
        background: #f2f2f2;
        padding-top: 40px;
        padding-left: 40px;
        padding-right: 40px;
        align-items: center;
        justify-content: space-between;
        &-butts {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    }
}
main {
    height: calc(100vh - 80px);
    background: #f2f2f2;
}
</style>
