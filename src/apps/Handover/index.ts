import { baseClient } from '@equinor/http-client';
import { ClientApi, httpClient } from '@equinor/portal-client';
import { HandoverGardenItem, HandoverGroupByView, HandoverSideSheet } from './Garden/CustomViews';
import { HandoverCustomGroupByKeys, HandoverPackage } from './Garden/models';
import { fieldSettings, getMaxVolumeFromData, sortPackagesByStatus } from './Garden/utility';

export function setup(appApi: ClientApi): void {
    const api = baseClient(appApi.authProvider, [appApi.appConfig.scope.fusion]);
    const handover = appApi.createWorkSpace<HandoverPackage>({
        CustomSidesheet: HandoverSideSheet,
    });

    handover.registerDataSource(async () => {
        const { fusion } = httpClient();
        const response = await api.fetch(
            `https://pro-s-dataproxy-ci.azurewebsites.net/api/contexts/71db33bb-cb1b-42cf-b5bf-969c77e40931/handover/`
        );
        const parsedResponse = JSON.parse(await response.text()) as HandoverPackage[];
        [];

        return parsedResponse.sort(sortPackagesByStatus);
    });

    // handover.registerFilterOptions({});

    //  handover.registerTableOptions({ objectIdentifierKey: '' });

    const initialCustomGroupByKeys: HandoverCustomGroupByKeys = {
        weeklyDaily: 'Weekly',
        plannedForecast: 'Planned',
    };

    handover.registerGardenOptions({
        gardenKey: 'RFCC' as keyof HandoverPackage, // HOW to handled this ????
        itemKey: 'commpkgNo',
        fieldSettings: fieldSettings,
        customGroupByKeys: initialCustomGroupByKeys,
        customViews: {
            customGroupByView: HandoverGroupByView,
            customItemView: HandoverGardenItem,
        },
        customStateFunction: (data) => ({ maxVolume: getMaxVolumeFromData(data) }),
    });
}
