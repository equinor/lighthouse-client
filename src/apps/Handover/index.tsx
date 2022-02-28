import { ClientApi, httpClient } from '@equinor/portal-client';
import {
    HandoverGardenHeader,
    HandoverGardenItem,
    HandoverGroupByView,
    HandoverSideSheet,
} from './Garden/CustomViews';
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

    handover.registerFilterOptions({
        excludeKeys: [
            'siteCode',
            'projectIdentifier',
            'projectDescription',
            'commpkgNo',
            'description',
            'progress',
            'mcStatus',
            'priority1Description',
            'priority2Description',
            'priority3Description',
            'plannedStartDate',
            'actualStartDate',
            'plannedFinishDate',
            'actualFinishDate',
            'url',
            'id',
            'hasUnsignedActions',
            'forecastFinishDate',
            'volume',
            'forecastTacDate',
            'mcPkgsCount',
            'mcPkgsRFCCShippedCount',
            'mcPkgsRFCCSigned',
            'mcPkgsRFOCShipped',
            'mcPkgsRFOCSigned',
            'tacIsAccepted',
            'tacIsShipped',
            'tacIsRejected',
            'plannedTacDate',
            'forecastStartDate',
            'isSubsea',
            'isDemolition',
            'demolitionPlannedStartDate',
            'demolitionForecastStartDate',
            'demolitionActualStartDate',
            'demolitionPlannedFinishDate',
            'demolitionForecastFinishDate',
            'demolitionActualFinishDate',
            'createdDate',
            'remark',
            'rfocIsShipped',
            'rfocIsAccepted',
            'rfocIsRejected',
            'rfccIsShipped',
            'rfccIsAccepted',
            'rfccIsRejected',
            'subSystem',
            'isReadyForStartup',
            'isInOperation',
            'hasMaintenanceProgram',
            'hasYellowLineMarkup',
            'hasBlueLineMarkup',
            'hasOperationAgreement',
            'demolitionDCCAcceptedDate',
            'demolitionRFRCShippedDate',
            'tacActualDate',
            'rfccShippedDate',
            'rfocPlannedDate',
            'rfocForecastDate',
            'rfocActualDate',
            'rfocShippedDate',
            'rowKey',
        ],
    });
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
            customHeaderView: HandoverGardenHeader,
        },
        customStateFunction: (data) => ({ maxVolume: getMaxVolumeFromData(data) }),
    });
}
