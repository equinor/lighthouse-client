import { setEnv } from '../Functions/Settings';
import { AppConfigResult } from '../Types/AppConfig';
import { fetchClientConfig } from './envConfig';

export async function fetchConfig(): Promise<AppConfigResult> {
    //When running locally
    if (import.meta.env.DEV === true) {
        window.AUTH_CONFIG = import.meta.env.VITE_AUTH_CONFIG;
        window.JC_CONFIG = import.meta.env.VITE_JC_CONFIG;
    }

    const config = await fetchClientConfig();

    const isProduction = config.CLIENT_ENV === 'prod';
    if (!isProduction) {
        document.title = `${config.CLIENT_ENV.toUpperCase()} | Johan Castberg Project Portal | Fusion`;
    }

    setEnv(isProduction, config.CLIENT_ENV);
    //When running locally
    // if (import.meta.env.DEV === true) {
    //     return JSON.parse(import.meta.env.VITE_JC_CONFIG);
    // }
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
