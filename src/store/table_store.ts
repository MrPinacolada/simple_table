import { createStore } from "vuex"
import { writePersistentLocalStorage } from "@/services/localStorage"

export const table_store = createStore({
    state() {
        return {
            isAuthenticated: false,
            username: "",
            tokens_access: null,
            tokens_refresh: null,
        }
    },
    mutations: {
        SET_AUTH(
            state,
            data: { access: string; refresh: string }
        ) {
            state.isAuthenticated = true
            state.tokens_access = data.access
            console.log('state.tokens_access: ', state.tokens_access);
            state.tokens_refresh = data.refresh
            console.log('state.tokens_refresh: ', state.tokens_refresh);
            writePersistentLocalStorage("tokens_access", data.access)
            writePersistentLocalStorage("tokens_refresh", data.refresh)
        },
        SET_USERNAME(state, username:string) {
            state.username = username
        },
    },
    actions: {},
})
