<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script lang="ts">
import { RouterView } from "vue-router"
import { getLocalStorage } from "@/services/localStorage"
import { table_store } from "@/store/table_store"

export default {
    name: "default",
    data() {
        return {}
    },
    methods: {
        isSignedIn() {
            return (
                getLocalStorage("tokens_access") &&
                getLocalStorage("tokens_refresh")
            )
        },
    },
    mounted() {
        // localStorage.clear()
        if (this.isSignedIn()) {
            const auth = {
                access: getLocalStorage("tokens_access"),
                refresh: getLocalStorage("tokens_refresh"),
            }
            table_store.commit("SET_AUTH", auth)
            table_store.commit("SET_USERNAME", getLocalStorage("user_name"))
            this.$router.push("/dashboard")
        }
    },
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}


</style>
