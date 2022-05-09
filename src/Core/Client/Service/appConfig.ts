import { setEnv } from '../Functions/Settings';
import { AppConfigResult } from '../Types/AppConfig';
import { crypt } from '../Utils/crypt';
import { fetchClientConfig } from './envConfig';

export async function fetchConfig(): Promise<AppConfigResult> {
    const config = await fetchClientConfig();
    const isProduction = config.CLIENT_ENV === 'prod';
    document.title = `${config.CLIENT_ENV.toLocaleUpperCase()} | Fusion | Johan Castberg | Pilot`;
    setEnv(isProduction, config.CLIENT_ENV);

    const response = await fetch(getEnvironmentUri(config.ENV_CONFIG_URI, config.CLIENT_ENV));
    if (!response.ok) {
        throw 'Failed to get environment configuration';
    }
    return { ...(await response.json()), isProduction, env: config.CLIENT_ENV };
}

function getEnvironmentUri(baseUri: string, env: string): string {
    return `https://${baseUri}.azurewebsites.net/api/clientConfig?environmentId=${crypt(
        'environmentId',
        env
    )}`;
}
