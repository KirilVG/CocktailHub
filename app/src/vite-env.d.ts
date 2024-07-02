/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_GYC_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
