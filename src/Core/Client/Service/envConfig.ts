export interface EnvConfig {
    readonly CLIENT_ENV: string;
    readonly ENV_CONFIG_URI: string;
}

export async function fetchClientConfig(): Promise<EnvConfig> {
    if (!import.meta.env.VITE_AUTH_CONFIG) {
        console.log(process.env.AUTH_CONFIG);
        console.log(import.meta.env);
        throw new Error('Missing auth config.');
    }
    return JSON.parse(import.meta.env.VITE_AUTH_CONFIG);
}
