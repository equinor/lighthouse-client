import { ClientApi } from '@equinor/app-builder';
import { HandoverPackage } from './models/HandoverPackage';
import { baseClient } from '../../../packages/httpClient/src';
import { fieldSettings } from './utility/gardenSetup';
import { HandoverGroupByView } from './CustomViews/HandoverGroupByView';
import { HandoverGardenItem } from './CustomViews/HandoverGardenItem';
import { HandoverSideSheet } from './CustomViews/HandoverSideSheet';
import { sortPackagesByStatus } from './utility/sortFunctions';

export type HandoverCustomGroupByKeys = {
    weeklyDaily: 'Weekly' | 'Daily';
    plannedForecast: 'Planned' | 'Forecast';
};

export function setup(appApi: ClientApi): void {
    const api = baseClient(appApi.authProvider, [appApi.appConfig.scope.fusion]);
    const handover = appApi.createWorkSpace<HandoverPackage>({
        CustomSidesheet: HandoverSideSheet,
    });

    handover.registerDataSource(async () => {
        const response = await api.fetch(
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

    handover.registerGardenOptions({
        gardenKey: 'RFCC' as keyof HandoverPackage, // HOW to handled this ????
        itemKey: 'commpkgNo',
        fieldSettings: fieldSettings,
        customGroupByKeys: initialCustomGroupByKeys,
        customViews: {
            customGroupByView: HandoverGroupByView,
            customItemView: HandoverGardenItem,
        },
    });
}
