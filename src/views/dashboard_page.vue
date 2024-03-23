<template lang="pug">
    default_layout
     div.wrapper 
        section.dashboard
            div.dashboard-title
                h2.font-h2 Мои товары
                img(src='../assets/image/icons/question-semibold.svg')
                p.font-gray 4 из 30
            div.dashboard-subtitle
            div.dashboard-search
            div.dashboard-table


</template>

<script lang="ts">
import default_layout from "@/layouts/default.vue"
export default {
    name: "dashboard",

    components: {
        default_layout,
    },
    data() {
        return {
            login: "",
            password: "",
            disabled: true,
        }
    },
}
</script>

<style scoped lang="scss">
.wrapper {
    display: grid;
    width: 100%;
    height: 100%;
    justify-items: center;
    align-items: start;
    .dashboard {
        display: grid;
        grid-template-columns: 1fr;
        gap: 30px;
        max-width: 1600px;
        min-width: 1600px;
        height: fit-content;
        background: var(--white);
        border-radius: 15px;
        box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.16);
        padding-top: 40px;
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 60px;
        &-title {
            display: flex;
            gap: 12px;
            justify-content: flex-start;
            align-items: flex-end;
            width: 100%;
        }
    }
}
</style>
