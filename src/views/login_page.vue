<template lang="pug">
  login_layout
    div.container
        div.login-box
</template>
<script lang="ts">
import login_layout from "@/layouts/login.vue"

export default {
    name: "login",
    components: {
        login_layout,
    },
}
</script>
<style scoped lang="scss">
.container {
    width: 100vw;
    height: calc(100vh - 80px);
    display: grid;
    align-items: center;
    justify-items: center;
    .login-box {
        width: 430px;
        height: 500px;
        border-radius: 15px;
        box-shadow: 0px 6px 8px 0px #00000029;
        background: var(--white);
    }
}
</style>
