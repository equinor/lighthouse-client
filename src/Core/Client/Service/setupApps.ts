import { createDataFactory } from '@equinor/DataFactory';
import { openSidesheet } from '@equinor/sidesheet';
import { AuthenticationProvider } from '../../../../packages/authentication/src';
import { AppConfigResult } from '../Types/AppConfig';
import { ClientRegistry } from '../Types/ClientRegistry';
import { clientApiBuilder } from './ClientBuilder';

export function setupApps(
    registry: ClientRegistry,
    appConfig: AppConfigResult,
    authProvider: AuthenticationProvider
): ClientRegistry {
    registry.apps.forEach((manifest) => {
        manifest.app?.setup &&
            manifest.app.setup(
                clientApiBuilder({
                    ...manifest,
                    appConfig,
                    authProvider,
                    openSidesheet,
                    createDataFactory,
                })
            );
    });
    return registry;
}
