/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CLIENT_ENV: string;
    readonly CLIENT_ENV: string;
    readonly ENV_LOGIN: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
