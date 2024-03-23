<template lang="pug">
  login_layout
    div.container
        div.login-box
            div.login-box-wrapper
                div.titles
                    h1.font-h1 Вход
                    span.titles-flex
                        p.font-base Нет аккаунта?
                        p.font-link Зарегистрироватся
                div.inputs
                    base_input(he='50px' wh='100%' placeholder='youremail@mail.ru' @base_input='handleMailInput')
                        template(v-slot:top_slot)
                            p.font-caption Email
                    base_input(he='50px' wh='100%' placeholder='Ваш пароль' @base_input='handlePassInput' )
                        template(v-slot:top_slot)
                            p.font-caption Пароль
                        template(v-slot:bottom_slot)
                            p.font-link Забыли пароль?
                div.action-butt
                    base_button(placeholder='Вход' :is_disabled='disabled' @base_click='handleLogin')


</template>
<script lang="ts">
import login_layout from "@/layouts/login.vue"
import base_input from "@/components/base/base_input.vue"
import base_button from "@/components/base/base_button.vue"
import { cleanSpace } from "@/helpers/cleanSpace"
import { table_store } from "@/store/table_store"
import { apiPost } from "@/services/api"

export default {
    name: "login",

    components: {
        login_layout,
        base_input,
        base_button,
    },
    data() {
        return {
            login: "",
            password: "",
            disabled: true,
        }
    },
    watch: {},
    methods: {
        validateInput(login: string, password: string) {
            this.disabled = !(cleanSpace(login) && cleanSpace(password))
        },
        handlePassInput(data: string) {
            this.password = data
            this.validateInput(this.login, this.password)
        },
        handleMailInput(data: string) {
            this.login = data
            this.validateInput(this.login, this.password)
        },
        async handleLogin() {
            try {
                const data = await apiPost({
                    url: "user/jwt/create/",
                    body: {
                        email: this.login,
                        password: this.password,
                    },
                })
                table_store.commit("SET_AUTH", data)
                table_store.commit("SET_USERNAME", this.login)
            } catch (error) {
                console.log(error)
            }
        },
    },
    computed: {},
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
        padding-top: 40px;
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 40px;
        border-radius: 15px;
        box-shadow: 0px 6px 8px 0px #00000029;
        background: var(--white);
        &-wrapper {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            .titles {
                display: grid;
                gap: 5px;
                height: fit-content;
                &-flex {
                    display: flex;
                    gap: 5px;
                }
            }
            .inputs {
                display: grid;
                grid-template-columns: 1fr;
                gap: 20px;
            }
            .action-butt {
                margin-top: 20px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
        }
    }
}
</style>
