import { crypt } from './crypt';

export async function fetchConfig(): Promise<AppConfig> {
    console.log(process.env.CLIENT_ENV || 'Env not defined :(');
    const response = await fetch(getEnvironmentUri(process.env.CLIENT_ENV || ''));
    return await response.json();
}

export interface Scope {
    fusion: string;
    procosys: string;
    echoModelDistClient: string;
    scopeChange: string;
    constructionProgress?: string;
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

function getEnvironmentUri(id: string): string {
    return `https://func-ppo-web-client-dev.azurewebsites.net/api/clientConfig?environmentId=${crypt(
        'environmentId',
        id
    )}`;
}
