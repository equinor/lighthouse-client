import { ClientApi, httpClient } from '@equinor/portal-client';
import { HandoverGardenItem, HandoverGroupByView, HandoverSideSheet } from './Garden/CustomViews';
import { HandoverCustomGroupByKeys, HandoverPackage } from './Garden/models';
import { fieldSettings, getMaxVolumeFromData, sortPackagesByStatus } from './Garden/utility';

export function setup(appApi: ClientApi): void {
    const handover = appApi.createWorkSpace<HandoverPackage>({
        CustomSidesheet: HandoverSideSheet,
    });

    handover.registerDataSource(async () => {
        const { fusion } = httpClient();
        const response = await fusion.fetch(
            `https://pro-s-dataproxy-fprd.azurewebsites.net/api/contexts/3380fe7d-e5b7-441f-8ce9-a8c3133ee499/handover/`
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
    handover.registerTableOptions({
        objectIdentifierKey: 'commpkgNo',
    });
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

    handover.registerPowerBIOptions({
        reportId: 'jca-handover-analytics',
    });
}
