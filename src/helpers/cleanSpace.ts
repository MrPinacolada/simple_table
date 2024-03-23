export const cleanSpace = (text: string) => {
    if (!text) return ""
    return text.toString().replace(/\s/g, "")
}
