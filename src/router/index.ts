import { createRouter, createWebHistory } from "vue-router"
import login_page from "../views/login_page.vue"
import dashboard from "@/views/dashboard_page.vue"
import { table_store } from "@/store/table_store"

const routes = [
    { path: "/", redirect: "/login" },
    { path: "/login", component: login_page },
    { path: "/dashboard", component: dashboard, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = table_store.state.isAuthenticated
    if (to.meta.requiresAuth && !isAuthenticated) {
        next("/login")
    } else {
        next()
    }
})

export default router
