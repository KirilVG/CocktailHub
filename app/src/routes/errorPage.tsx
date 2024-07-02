import getTranslation from "@/utils/transtationUtil"

const ErrorPage = () => {
    return (
        <span className="text-xl">{getTranslation("form.responseMessages.unknownError")}</span>
    )
}

export default ErrorPage;