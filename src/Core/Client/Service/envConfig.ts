
export interface EnvConfig {
    readonly CLIENT_ENV: string;
    readonly ENV_CONFIG_URI: string;

}

export async function fetchClientConfig(): Promise<EnvConfig> {
    const configResponse = await fetch("/client-config.json");
    return await  await configResponse.json();
}
