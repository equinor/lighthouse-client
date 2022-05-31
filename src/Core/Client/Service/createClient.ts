import { AuthenticationProvider } from '@equinor/authentication';
import initLighthouse, {
    GetAccessFunction,
    GetCreatorComponent,
    GetCreatorFunction,
    IDataCreationProvider
} from '@equinor/lighthouse-fusion-modules';
import { fetchFunction } from '../../../apps/functions';
import {
    registerAppConfig,
    registerClientRegistry,
    registerInternalState
} from '../Functions/RegisterActions';
import { setClientEnv } from '../Functions/Settings';
import { AppConfigSettings } from '../Types/AppConfig';
import { AppGroups } from '../Types/AppGroupe';
import { AppManifest } from '../Types/AppManifest';
import { fetchConfig } from './appConfig';
import { appsProvider } from './appsProvider';
import { setupApps } from './setupApps';
import { setupAuthProvider } from './setupAuthProvider';
import { setupContext } from './setupContext';
import { setupUserData } from './setupUserData';

interface ClientOptions {
    getApps(): AppManifest[];
    getAppGroups(): AppGroups;
    getCreators: GetCreatorFunction;
    getCreatorComponent: GetCreatorComponent;
}

export interface Client {
    authProvider: AuthenticationProvider;
    dataCreator: IDataCreationProvider;
}

export async function createClient(clientOptions: ClientOptions): Promise<Client> {
    const config = await fetchConfig();
    const appConfig = registerAppConfig(config);
    const authProvider = await handleLogin(appConfig.settings);

    // New Lighthouse setup with Fusion Modules Style

    const { lighthouseModules } = await initLighthouse(async (continuator) => {
        const getAccessFunction: GetAccessFunction = async (functionId: string) => {
            const result = await fetchFunction(functionId);
            return result.function as () => Promise<boolean>;
        };

        continuator.dataCreator.configure({
            getAccessFunction,
            getCreatorComponent: clientOptions.getCreatorComponent,
            getCreators: clientOptions.getCreators,
        });
        continuator.onAfterInit(async ({ dataCreator }) => {
            await dataCreator.setup(continuator.dataCreator.configuration);
        });
    });

    if (authProvider.isAuthenticated()) {
        try {
            registerClientRegistry(
                setupApps(
                    appsProvider(clientOptions.getApps, clientOptions.getAppGroups, false),
                    appConfig,
                    authProvider,
                    config.isProduction
                )
            );
        } catch (e) {
            throw 'Failed to setup apps';
        }

        try {
            await setupContext();
        } catch (e) {
            throw 'Failed to set fusion context';
        }

        if (!appConfig.isProduction) {
            window['setEnv'] = function setEnv(env: string) {
                setClientEnv(env);
            };
        }

        setupUserData(authProvider);
    }

    return { authProvider, dataCreator: lighthouseModules.dataCreator };
}

async function handleLogin(settings: AppConfigSettings): Promise<AuthenticationProvider> {
    const { authProvider } = registerInternalState(setupAuthProvider(settings));
    if (!authProvider.isAuthenticated()) {
        try {
            await authProvider.handleLogin();
        } catch (e) {
            throw 'Failed to log in';
        }
    }

    return authProvider;
}
