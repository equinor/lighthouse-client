import { enableAppModule } from '@equinor/fusion-framework-module-app';
import { FrameworkConfigurator } from '@equinor/fusion-framework';
import { enableServices } from '@equinor/fusion-framework-module-services';
import { AppConfigResult } from '../Core/Client/Types/AppConfig';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';
import { enableContext } from '@equinor/fusion-framework-module-context';
import { enableBookmark } from '@equinor/fusion-framework-module-bookmark';
import { isProduction } from '../Core/Client/Functions';
import buildQuery from 'odata-query';

export const createConfig = (appSettings: AppConfigResult) => {
    return async (config: FrameworkConfigurator) => {
        config.configureMsal(
            {
                tenantId: appSettings.settings.tenantId,
                clientId: appSettings.settings.clientId,
                redirectUri: '/authentication/login-callback',
            },
            { requiresAuth: true }
        );

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
                subSystem: 'Castberg Portal',
            });
        });

        enableAppModule(config);

        enableContext(config, (builder) => {
            builder.setContextType(['ProjectMaster']);
            builder.setContextParameterFn(({ search, type }) => {
                return buildQuery({
                    search,
                    filter: {
                        type: {
                            in: type,
                        },
                    },
                });
            });

            builder.setResolveInitialContext(async (a) => {
                isProduction()
                    ? '3380fe7d-e5b7-441f-8ce9-a8c3133ee499'
                    : '94dd5f4d-17f1-4312-bf75-ad75f4d9572c';
            });
        });

        enableNavigation(config);

        enableServices(config);

        if (!appSettings.isProduction) {
            config.configureHttpClient('pcs-search', {
                baseUri: 'https://search-test.pcs-dev.net',
                defaultScopes: ['api://195ed58a-9cb8-4d93-9e37-9ad315032baf/ReadWrite'],
            });
        }
        Object.entries(appSettings.urls).forEach(([a, b]) => {
            if (a == 'scopeChange' && true) {
                config.configureHttpClient(a, {
                    baseUri: 'https://localhost:50435',
                    defaultScopes: [appSettings.scope[a]],
                });
            } else {
                config.configureHttpClient(a, {
                    baseUri: b,
                    defaultScopes: [appSettings.scope[a]],
                });
            }
        });
    };
};
