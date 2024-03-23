import "./assets/main.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { table_store } from "@/store/table_store"

export const app = createApp(App)

app.use(router)
app.use(table_store)

app.mount("#app")
