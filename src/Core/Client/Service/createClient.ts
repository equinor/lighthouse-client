import { AuthenticationProvider } from '@equinor/authentication';
import {
    registerAppConfig,
    registerClientRegistry,
    registerInternalState,
} from '../Functions/RegisterActions';
import { setClientEnv } from '../Functions/Settings';
import { AppConfigResult } from '../Types/AppConfig';
import { AppGroups } from '../Types/AppGroupe';
import { AppManifest } from '../Types/AppManifest';
import { ClientRegistry } from '../Types/ClientRegistry';
import { fetchConfig } from './appConfig';
import { appsProvider } from './appsProvider';
import { setupApps } from './setupApps';
import { setupAuthProvider } from './setupAuthProvider';
import { setupUserData } from './setupUserData';

interface ClientOptions {
    getApps(): AppManifest[];
    getAppGroups(): AppGroups;
}

export interface Client {
    authProvider: AuthenticationProvider;
    registry: ClientRegistry;
    appConfig: AppConfigResult;
}

export async function createClient(clientOptions: ClientOptions): Promise<Client> {
    const appConfig = registerAppConfig(await fetchConfig());
    const { authProvider } = registerInternalState(setupAuthProvider(appConfig.settings));
    setupUserData(authProvider);
    const registry = registerClientRegistry(
        setupApps(
            appsProvider(clientOptions.getApps, clientOptions.getAppGroups, false),
            appConfig,
            authProvider
        )
    );

    if (!appConfig.isProduction) {
        window['setEnv'] = function setEnv(env: string) {
            setClientEnv(env);
        };
    }

    return { authProvider, registry, appConfig };
}
