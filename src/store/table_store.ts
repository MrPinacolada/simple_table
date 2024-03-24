import { createStore } from "vuex"
import { writePersistentLocalStorage } from "@/services/localStorage"

export const table_store = createStore({
    state() {
        return {
            isAuthenticated: false,
            user_name: "",
            tokens_access: null,
            tokens_refresh: null,
        }
    },
    mutations: {
        SET_AUTH(state:any, data: { access: string; refresh: string }) {
            state.isAuthenticated = true
            state.tokens_access = data.access
            state.tokens_refresh = data.refresh
            writePersistentLocalStorage("tokens_access", data.access)
            writePersistentLocalStorage("tokens_refresh", data.refresh)
        },
        SET_USERNAME(state:any, user_name: string) {
            state.user_name = user_name
            writePersistentLocalStorage("user_name", user_name)
        },
    },
    actions: {},
})
