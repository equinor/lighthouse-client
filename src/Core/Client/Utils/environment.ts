import { readClientSettings } from '../Functions/Readers';
import { setClientEnv } from '../Functions/Settings';
import { AppManifest } from '../Types/AppManifest';

export function isAppActive(manifest: AppManifest): boolean {
    const { clientEnv } = readClientSettings();
    if (clientEnv === 'prod') {
        return manifest.appEnv === 'prod';
    } else if (clientEnv === 'test') {
        return manifest.appEnv === 'prod' || manifest.appEnv === 'test';
    } else {
        return manifest.appEnv !== undefined;
    }
}

window['setEnv'] = function setEnv(env: string) {
    setClientEnv(env);
};
