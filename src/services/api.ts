import axios from "axios"

interface ApiFunctionArgs {
    url: string
    query?: Record<string, any>
    body?: Record<string, any>
    headers?: Record<string, any>
}
//у вас не нужных заголовков, поэтому вот так(
const base_url =
    "https://cors-anywhere.herokuapp.com/https://dev-ar.zonesmart.com/api"

export const apiGet = async ({ url, query, headers }: ApiFunctionArgs) => {
    try {
        const set_url = base_url + "/" + url

        const response = await axios.get(set_url + `?${setQuery(query)}`, {
            headers: {
                ...headers,
                Accept: "application/json",
            },
        })

        const data = response.data

        return { data }
    } catch (error: any) {
        console.error(error)
    }
}

export const apiPost = async ({
    url,
    query,
    body,
    headers,
}: ApiFunctionArgs) => {
    try {
        const set_url = base_url + "/" + url
        const response = await axios.post(
            set_url + `?${setQuery(query)}`,
            body,
            {
                headers: {
                    ...headers,
                    Accept: "application/json",
                },
            }
        )

        const data = response.data

        return { data }
    } catch (error: any) {
        console.log(error)
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
