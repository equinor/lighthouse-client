import { AuthenticationProvider } from '@equinor/authentication';
import { registerClientRegistry, registerInternalState } from '../Functions/RegisterActions';
import { AppConfigResult } from '../Types/AppConfig';
import { AppGroups } from '../Types/AppGroupe';
import { AppManifest } from '../Types/AppManifest';
import { ClientRegistry } from '../Types/ClientRegistry';
import { fetchConfig } from './appConfig';
import { appsProvider } from './appsProvider';
import { setupApps } from './setupApps';
import { setupAuthProvider } from './setupAuthProvider';

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
    const appConfig = await fetchConfig();
    const { authProvider } = registerInternalState(setupAuthProvider(appConfig.settings));
    const registry = registerClientRegistry(
        setupApps(
            appsProvider(clientOptions.getApps, clientOptions.getAppGroups, false),
            appConfig,
            authProvider
        )
    );

    return { authProvider, registry, appConfig };
}
