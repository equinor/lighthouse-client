import { AppConfig } from '../Types/Settings';
import { crypt } from '../Utils/crypt';

import { fetchClientConfig } from './envConfig';

let isProductionEnv = "";

export function isProduction(): boolean {
    return isProductionEnv === 'prod';
}

export async function fetchConfig(): Promise<AppConfig> {
    const config = await fetchClientConfig();
    isProductionEnv = config.CLIENT_ENV;

    const response = await fetch(getEnvironmentUri(config.ENV_CONFIG_URI, config.CLIENT_ENV));
    return await response.json();
}

function getEnvironmentUri(baseUri: string, env: string): string {
    return `https://${baseUri}.azurewebsites.net/api/clientConfig?environmentId=${crypt(
        'environmentId',
        env
    )}`;
}
