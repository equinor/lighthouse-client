import { crypt } from './crypt';

export async function fetchConfig(): Promise<AppConfig> {
    const config = await fetchClientConfig();
    console.log("clientConfig:", config)
    const response = await fetch(getEnvironmentUri("func-ppo-web-client", config.CLIENT_ENV));
    return await response.json();
}

async function fetchClientConfig() {
    const configResponse = await fetch("/client-config.json");
    return await  await configResponse.json();
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
    return `https://${baseUri}-${env}.azurewebsites.net/api/clientConfig?environmentId=${crypt(
        'environmentId',
        env
    )}`;
}
