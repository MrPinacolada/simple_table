<template lang="pug">
    header.head-default 
        section.container
            nav.container-butts   
                button
                    img(src='../assets/image/icons/notif.svg')
                span.menu 
                    p.font-base {{ table_store.state.user_name }}
                    img(src='../assets/image/icons/arrow.svg')

    main
        slot
</template>

<script lang="ts">
import { table_store } from "@/store/table_store"

export default {
    name: "default-layout",
    components: {},
    data() {
        return {
            table_store,
        }
    },
}
</script>

<style lang="scss">
.head-default {
    .container {
        display: flex;
        width: 100%;
        height: 80px;
        padding-top: 27px;
        padding-bottom: 28px;
        padding-left: 30px;
        padding-right: 30px;
        justify-content: flex-end;
        align-items: center;
        background: var(--white);
        border-bottom: 1px var(--gray) solid;

        &-butts {
            display: flex;
            gap: 30px;
            button {
                border: none;
                background: transparent;
                width: 25px;
                height: 25px;
            }
            .menu {
                display: flex;
                gap: 1px;
                align-items: center;
                img {
                    width: 25px;
                    height: 25px;
                }
            }
        }
    }
}
main {
    height: calc(100vh - 80px);
    background: #f2f2f2;
    padding-top: 30px;
}
</style>
