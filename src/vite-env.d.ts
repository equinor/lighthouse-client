/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly CLIENT_ENV: string;
    readonly ENV_LOGIN: string;
    readonly ENV_CONFIG_URI: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
