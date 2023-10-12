import { enableAppModule } from '@equinor/fusion-framework-module-app';
import { FrameworkConfigurator } from '@equinor/fusion-framework';
import { enableServices } from '@equinor/fusion-framework-module-services';
import { AppConfigResult } from '../Core/Client/Types/AppConfig';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';
import { ContextItem, enableContext } from '@equinor/fusion-framework-module-context';

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
            builder.setResolveInitialContext(async () => {
                return {
                    id: '94dd5f4d-17f1-4312-bf75-ad75f4d9572c',
                    type: {
                        id: 'ProjectMaster',
                        isChildType: false,
                        parentTypeIds: [],
                    },
                    value: {
                        identity: 'fc5ffcbc-392f-4d7e-bb14-79a006579337',
                        description: 'Johan Castberg',
                        projectState: 'ACTIVE',
                        portfolioOrganizationalUnit: 'PDP PRD GGF',
                        organizationalUnit: 'PRD MP JC',
                        cvpid: '927',
                        phase: 'Execution',
                        country: 'NORWAY',
                        projectCategory: 'FPSO',
                        parentProjectCategory: 'OIL&GAS',
                        isValid: true,
                        facilities: ['JCA'],
                        alternateNames: undefined,
                        documentManagementId: 'PM050',
                    },
                    created: new Date('2020-02-24T09:15:47.1133333+00:00'),
                    externalId: 'fc5ffcbc-392f-4d7e-bb14-79a006579337',
                    isActive: true,
                    isDeleted: false,
                    source: undefined,
                    subTitle: '',
                    title: 'Johan Castberg',
                    updated: new Date('2023-06-05T06:53:30.3529303+00:00'),
                } as ContextItem;
            });
        });

        enableNavigation(config);

        enableServices(config);
    };
};
