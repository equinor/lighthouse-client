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

    if (!window.JC_CONFIG) {
        throw 'No JC config set';
    }
    try {
        return JSON.parse(window.JC_CONFIG);
    } catch (e) {
        console.error(e);
        throw new Error('Failed to parse JC config');
    }
}
