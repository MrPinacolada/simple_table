import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        code: `@font-face {
            font-family: 'YourFontFamilyName';
            src: url('/path/to/your/font.woff2') format('woff2'),
                 url('/path/to/your/font.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }`,
    },
})
