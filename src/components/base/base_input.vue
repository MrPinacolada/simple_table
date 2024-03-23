<template lang="pug">
    div.input-wrapper
        div.top
            slot(name='top_slot')
        input(v-model='input_value' type='text' :placeholder='placeholder' @change="handleInput")
        div.bottom
            slot(name='bottom_slot')

</template>

<script lang="ts">
export default {
    name: "base_input",
    props: {
        wh: {
            type: String,
            required: true,
        },
        he: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            input_value: "",
        }
    },
    methods: {
        handleInput() {
            this.$emit("base_input", this.input_value)
        },
    },
    computed: {},
}
</script>

<style scoped lang="scss">
.input-wrapper {
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr;
    width: 100%;
    input {
        width: v-bind(wh);
        height: v-bind(he);
        border-radius: 6px;
        box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
        background: rgb(242, 241, 243);
        border: none;
        padding-left: 20px;
        &::placeholder {
            color: var(--gray);
        }
        &:focus {
            box-sizing: border-box;
            border: 1px solid rgb(19, 38, 57);
        }
        &:focus-visible {
            outline: none;
        }
    }
}
</style>
