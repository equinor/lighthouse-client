import { enableAppModule } from '@equinor/fusion-framework-module-app';
import { FrameworkConfigurator } from '@equinor/fusion-framework';
import { enableServices } from '@equinor/fusion-framework-module-services';
import { AppConfigResult } from '../Core/Client/Types/AppConfig';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';
import { enableContext } from '@equinor/fusion-framework-module-context';

export const createConfig = (appSettings: AppConfigResult) => {
    return async (config: FrameworkConfigurator) => {
        config.configureServiceDiscovery({
            client: {
                baseUri: appSettings.urls.fusion,
                defaultScopes: [appSettings.scope.fusion],
            },
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
            builder.setResolveInitialContext(async (a) =>
                a.modules.context.setCurrentContextByIdAsync('94dd5f4d-17f1-4312-bf75-ad75f4d9572c')
            );
        });

        enableNavigation(config);

        enableServices(config);
    };
};
