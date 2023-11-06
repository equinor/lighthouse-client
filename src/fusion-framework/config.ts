import { enableAppModule } from '@equinor/fusion-framework-module-app';
import { FrameworkConfigurator } from '@equinor/fusion-framework';
import { enableServices } from '@equinor/fusion-framework-module-services';
import { AppConfigResult } from '../Core/Client/Types/AppConfig';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';
import { enableContext } from '@equinor/fusion-framework-module-context';
import { enableBookmark } from '@equinor/fusion-framework-module-bookmark';
import { isProduction } from '../Core/Client/Functions';

export const createConfig = (appSettings: AppConfigResult) => {
    return async (config: FrameworkConfigurator) => {
        config.configureServiceDiscovery({
            client: {
                baseUri: appSettings.urls.fusion,
                defaultScopes: [appSettings.scope.fusion],
            },
        });

        enableBookmark(config, (builder) => {
            builder.setSourceSystem({
                identifier: 'cst-portal',
                name: 'Castberg-portal',
                subSystem: 'ProjectControl',
            });
        });

        config.configureMsal(
            {
                tenantId: appSettings.settings.tenantId,
                clientId: appSettings.settings.clientId,
                redirectUri: window.location.origin,
            },
            { requiresAuth: true }
        );

        enableAppModule(config);

        enableContext(config, (builder) => {
            builder.setResolveInitialContext(async (a) => {
                isProduction()
                    ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
                    : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
                // a.modules.context.setCurrentContextByIdAsync('94dd5f4d-17f1-4312-bf75-ad75f4d9572c')
            });
        });

        enableNavigation(config);

        enableServices(config);
    };
};
