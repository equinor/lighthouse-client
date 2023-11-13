import { AuthenticationProvider } from '@equinor/authentication';
import { openSidesheet } from '@equinor/sidesheet';
import { AppConfigResult } from '../Types/AppConfig';
import { ClientRegistry } from '../Types/ClientRegistry';
import { clientApiBuilder } from './ClientBuilder';

export function setupApps(
    registry: ClientRegistry,
    appConfig: AppConfigResult,
    authProvider: AuthenticationProvider,
    isProduction: boolean
): ClientRegistry {
    registry.apps.forEach((manifest) => {
        manifest.app?.setup &&
            manifest.app.setup(
                clientApiBuilder({
                    ...manifest,
                    isProduction,
                    appConfig,
                    authProvider,
                    openSidesheet,
                })
            );
    });
    return registry;
}
