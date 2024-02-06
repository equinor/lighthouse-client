import { setEnv } from '../Functions/Settings';
import { AppConfigResult } from '../Types/AppConfig';
import { fetchClientConfig } from './envConfig';

export async function fetchConfig(): Promise<AppConfigResult> {
    const config = await fetchClientConfig();

    const isProduction = config.CLIENT_ENV === 'prod';
    if (!isProduction) {
        document.title = `${config.CLIENT_ENV.toUpperCase()} | Johan Castberg Project Portal | Fusion`;
    }

    setEnv(isProduction, config.CLIENT_ENV);

    if (!import.meta.env.VITE_JC_CONFIG) {
        throw 'No JC config set';
    }
    return JSON.parse(import.meta.env.VITE_JC_CONFIG);
}
