<template lang="pug">
    button.base-butt(@click='handleClick' :disabled='is_disabled' :class="{disabled: is_disabled}")  {{ placeholder }}
</template>

<script lang="ts">
export default {
    name: "base_input",
    props: {
        placeholder: {
            type: String,
            required: true,
        },
        is_disabled: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            input_value: "",
        }
    },
    methods: {
        handleClick(data: any) {
            this.$emit("base_click", data)
        },
    },
    computed: {},
}
</script>

<style scoped lang="scss">
.base-butt {
    width: fit-content;
    height: 55px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 17px 30px 18px 30px;
    border-radius: 6px;
    border: none;
    background-color: rgb(46, 210, 186);
    color: rgb(255, 255, 255);
    font-size: 15px;
    font-weight: 600;
    line-height: 15px;
    letter-spacing: 0%;
    cursor: pointer;
    &:hover {
        background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),
            rgb(46, 210, 186);
    }
    &:active {
        background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
            rgb(46, 210, 186);
    }
}
.disabled {
    background: rgb(242, 241, 243);
    color: rgb(153, 153, 153);
    opacity: 0.4;
    cursor: not-allowed;
    &:hover,
    :active {
        background: rgb(242, 241, 243);
        color: rgb(153, 153, 153);
    }
}
</style>
