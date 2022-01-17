import { crypt } from './crypt';
import { fetchClientConfig } from './envConfig';

let isProductionEnv = "";

export function isProduction(): boolean {
    return isProductionEnv === 'prod';
}


export async function fetchConfig(): Promise<AppConfig> {
    const config = await fetchClientConfig();
    isProductionEnv = config.CLIENT_ENV;
    console.log("clientConfig:", config)
    const response = await fetch(getEnvironmentUri(config.ENV_CONFIG_URI, config.CLIENT_ENV));
    return await response.json();
}


export interface Scope {
    fusion: string;
    procosys: string;
    echoModelDistClient: string;
    scopeChange: string;
    constructionProgress: string;
    pipeTest?: string;
    FAM?: string;
    STID?: string;
}
export interface AppConfig {
    settings: {
        clientId: string;
        tenantId: string;
    };
    scope: Scope;
    urls: {
        echoModelDistUrl: string;
    };
}

function getEnvironmentUri(baseUri: string, env: string): string {
    return `https://${baseUri}.azurewebsites.net/api/clientConfig?environmentId=${crypt(
        'environmentId',
        env
    )}`;
}
