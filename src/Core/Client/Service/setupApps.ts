import { openSidesheet } from '@equinor/sidesheet';
import { AppConfigResult } from '../Types/AppConfig';
import { ClientRegistry } from '../Types/ClientRegistry';
import { clientApiBuilder } from './ClientBuilder';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

export function setupApps(
    registry: ClientRegistry,
    appConfig: AppConfigResult,
    client: IHttpClient
): ClientRegistry {
    registry.apps.forEach((manifest) => {
        manifest.app?.setup &&
            manifest.app.setup(
                clientApiBuilder({
                    ...manifest,
                    isProduction: appConfig.isProduction,
                    appConfig,
                    openSidesheet,
                    client,
                })
            );
    });
    return registry;
}
