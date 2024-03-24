import axios from "axios"
import { table_store } from "@/store/table_store"

interface ApiFunctionArgs {
    url: string
    query?: Record<string, any>
    body?: Record<string, any>
    headers?: Record<string, any>
}

const api = axios.create({
    baseURL: "https://dev-ar.zonesmart.com/api/",
    timeout: 5000,
})

let counter = 0

export const apiGet = async ({ url, query, headers }: ApiFunctionArgs) => {
    try {
        const response = await api.get(url + `?${setQuery(query)}`, {
            headers: {
                ...headers,
                Accept: "application/json",
                authorization: `JWT ${table_store.state.tokens_access}`,
            },
        })

        const data = response.data

        return { data }
    } catch (error: any) {
        console.error(error)
        counter = counter + 1
        if (error.response.status === 401 && counter < 5) {
            try {
                await refreshAccessToken()
                const response = await apiGet({
                    url: url,
                    query: query,
                    headers: headers,
                })

                const data: any = response.data
                return { data }
            } catch (refreshError) {
                console.error(refreshError)
                throw refreshError
            }
        } else {
            throw error
        }
    }
}

export const apiPost = async ({
    url,
    query,
    body,
    headers,
}: ApiFunctionArgs) => {
    let res = null
    let errors = null
    try {
        const response = await api.post(url + `?${setQuery(query)}`, body, {
            headers: {
                ...headers,
                Accept: "application/json",
            },
        })

        res = response.data
    } catch (error: any) {
        console.log(error)
        errors = error
    } finally {
        return { res, errors }
    }
}

const refreshAccessToken = async () => {
    try {
        const { res, errors } = await apiPost({
            url: "/user/jwt/refresh/",
            body: { refresh: table_store.state.tokens_refresh },
        })
        if (!res) return
        table_store.state.tokens_access = res.access
    } catch (error) {
        console.error(error)
    }
}

const setQuery = (query: Record<string, any>) => {
    if (!query) return ""

    let query_strings: string[] | string = ""

    query_strings = Object.entries(query).map(([key, value]) => {
        if (Array.isArray(value)) {
            return value
                .map((item) => `${key}[]=${encodeURIComponent(item)}`)
                .join("&")
        } else {
            return `${key}=${encodeURIComponent(value)}`
        }
    })

    const query_string = query_strings.join("&")

    return query_string
}
