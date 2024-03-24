<template lang="pug">
    div.paginator
         button.left(@click="goToPreviousPage")
             img(src='@/assets/image/icons/arrow.svg' style='rotate:90deg;') 
         div.slides(v-for='item,index in generated_array' :key='index' ) 
             button.slide(:class='{active:current===item}' @click="setCurrentPage(item)") {{ item }}
         button.right(@click="goToNextPage") 
             img(src='@/assets/image/icons/arrow.svg' style='rotate:-90deg;') 
 </template>

<script lang="ts">
export default {
    name: "base_pagination",
    props: {
        value: {
            type: Number,
            required: true,
        },
        current: {
            type: Number,
            required: true,
        },
    },
    computed: {
        generated_array(): number[] {
            return Array.from({ length: this.value }, (_, index) => index + 1)
        },
    },
    methods: {
        goToPreviousPage() {
            if (this.current > 1) {
                this.$emit("update:current", this.current - 1 - 1)
            }
        },
        goToNextPage() {
            if (this.current < this.value) {
                this.$emit("update:current", this.current + 1 - 1)
            }
        },
        setCurrentPage(pageNumber: number) {
            this.$emit("update:current", pageNumber - 1)
        },
    },
}
</script>

<style scoped lang="scss">
.paginator {
    display: flex;
    width: fit-content;
    height: 40px;
    align-items: center;
    gap: 20px;

    .left,
    .right,
    .slide {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        outline: none;
        background-color: #fff;
        border-radius: 6px;
        &:hover {
            background: rgb(242, 241, 243);
        }
        &:active {
            background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
                rgb(242, 241, 243);
        }
    }
}
.active {
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
        rgb(242, 241, 243);
}
</style>
