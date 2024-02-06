export interface EnvConfig {
    readonly CLIENT_ENV: string;
    readonly ENV_CONFIG_URI: string;
}

export async function fetchClientConfig(): Promise<EnvConfig> {
    if (!process.env.AUTH_CONFIG) {
        throw new Error('Missing auth config.');
    }
    return JSON.parse(process.env.AUTH_CONFIG);
}
