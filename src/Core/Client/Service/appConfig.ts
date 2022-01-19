import { AppConfigResult } from '../Types/AppConfig';
import { crypt } from '../Utils/crypt';
import { fetchClientConfig } from './envConfig';

let isProductionEnv = '';

export function isProduction(): boolean {
    return isProductionEnv === 'prod';
}

export async function fetchConfig(): Promise<AppConfigResult> {
    const config = await fetchClientConfig();
    isProductionEnv = config.CLIENT_ENV;

    const response = await fetch(getEnvironmentUri(config.ENV_CONFIG_URI, config.CLIENT_ENV));
    return { ...(await response.json()), isProduction: isProductionEnv };
}

function getEnvironmentUri(baseUri: string, env: string): string {
    return `https://${baseUri}.azurewebsites.net/api/clientConfig?environmentId=${crypt(
        'environmentId',
        env
    )}`;
}
