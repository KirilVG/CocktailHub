import i18next from "../i18"

const getTranslation = (key: string, placeholders?: any) => {
    return (
        placeholders ? i18next.t(key, placeholders).toString() : i18next.t(key).toString()
    )
}

export default getTranslation;