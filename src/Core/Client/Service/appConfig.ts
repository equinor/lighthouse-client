import { setEnv } from '../Functions/Settings';
import { AppConfigResult } from '../Types/AppConfig';
import { crypt } from '../Utils/crypt';
import { fetchClientConfig } from './envConfig';

export async function fetchConfig(): Promise<AppConfigResult> {
    const config = await fetchClientConfig();
    const isProduction = config.CLIENT_ENV === 'prod';

    setEnv(isProduction, config.CLIENT_ENV);

    const response = await fetch(getEnvironmentUri(config.ENV_CONFIG_URI, config.CLIENT_ENV));
    return { ...(await response.json()), isProduction };
}

function getEnvironmentUri(baseUri: string, env: string): string {
    return `https://${baseUri}.azurewebsites.net/api/clientConfig?environmentId=${crypt(
        'environmentId',
        env
    )}`;
}
