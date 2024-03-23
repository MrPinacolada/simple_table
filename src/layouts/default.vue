<template lang="pug">
    header 
        div.container
            div.container-butts   
                button
                span.menu 
                    p

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
        padding-top: 27px;
        padding-bottom: 28px;
        padding-left: 30px;
        padding-right: 30px;
        justify-content: space-between;
        background: var(--white);
        &-butts {
            button{
                
            }
        }
    }
}
</style>
