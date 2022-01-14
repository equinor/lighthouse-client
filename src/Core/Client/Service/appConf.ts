import { crypt } from './crypt';

export async function fetchConfig(): Promise<AppConfig> {
    const response = await fetch(getEnvironmentUri(process.env.environment || ''));
    return await response.json();
}

export interface AppConfig {
    settings: {
        clientId: string;
        tenantId: string;
    };
    scope: {
        fusion: string;
        procosys: string;
        echoModelDistClient: string;
        scopeChange: string;
        constructionProgress?: string;
        pipeTest?: string;
        FAM?: string;
        STID?: string;
    };
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
