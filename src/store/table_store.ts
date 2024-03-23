import { createStore } from "vuex"

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
            data: { tokens_access: string; tokens_refresh: string }
        ) {
            state.isAuthenticated = true
            console.log('state.isAuthenticated: ', state.isAuthenticated);
            state.tokens_access = data.tokens_access
            state.tokens_refresh = data.tokens_refresh
        },
        SET_USERNAME(state, username) {
            state.username = username
        },
    },
    actions: {},
})
