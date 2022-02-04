import { AuthenticationProvider } from '@equinor/authentication';
import initFusion, { Fusion } from '@equinor/fusion-framework';
import {
    registerAppConfig,
    registerClientRegistry,
    registerInternalState,
} from '../Functions/RegisterActions';
import FusionAuthContainer from '../Fusion/core/FusionAuthContainer';
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
    fusion: Fusion;
    authContainer: FusionAuthContainer;
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

    const { tenantId, clientId } = appConfig.settings;
    // const clientId = '9b707e3a-3e90-41ed-a47e-652a1e3b53d0';
    const fusion = await initFusion(async (config) => {
        console.debug('configuring fusion framework');
        config.auth.configureDefault({
            tenantId,
            clientId,
        });

        config.http.configureClient('service_discovery', {
            // baseUri: 'https://pro-s-portal-fprd.azurewebsites.net/',
            onCreate: (client) => {
                client.defaultScopes = ['97978493-9777-4d48-b38a-67b0b9cd88d2/.default'];
            },
        });

        config.onAfterConfiguration(async () => {
            console.debug('framework fusion config done');
        });
    });

    const authContainer = new FusionAuthContainer(authProvider);

    return { authProvider, registry, appConfig, fusion, authContainer };
}
