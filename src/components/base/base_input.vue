<template lang="pug">
    div.input-wrapper
        div.top
            slot(name='top_slot')
        input(v-model='input_value' @update:model-value="maskInput()"  type='text' :placeholder='placeholder' @input="handleInput")
        div.bottom
            slot(name='bottom_slot')

</template>

<script lang="ts">
import { onlyNumbers } from "@/helpers/onlyNumbers"

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
        value: {
            type: String,
            required: false,
        },
        mask: {
            type: Boolean,
            required: false,
        },
    },
    data() {
        return {
            input_value: this.value ?? "",
        }
    },
    methods: {
        handleInput() {
            this.$emit("base_input", this.input_value)
        },

        maskInput() {
            if (this.mask && this.input_value) {
                this.$nextTick(() => {
                    this.input_value = Number(
                        onlyNumbers(this.input_value)
                    ).toLocaleString()
                })
            }
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
    width: v-bind(wh);
    .top,
    .bottom {
        width: fit-content;
    }
    input {
        width: 100%;
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
