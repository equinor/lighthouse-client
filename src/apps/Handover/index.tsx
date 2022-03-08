import { ClientApi, httpClient, isProduction } from '@equinor/portal-client';
import {
    HandoverGardenHeader,
    HandoverGardenItem,
    HandoverGroupByView,
    HandoverSideSheet,
} from './Garden/CustomViews';
import { HandoverCustomGroupByKeys, HandoverPackage } from './Garden/models';
import {
    fieldSettings,
    getDotsColor,
    getMaxVolumeFromData,
    sortPackagesByStatus,
} from './Garden/utility';
import { PopoverStatus as Status } from '@equinor/GardenUtils';
import { statusBarData } from './Garden/components/statusItems';
export function setup(appApi: ClientApi): void {
    const handover = appApi.createWorkSpace<HandoverPackage>({
        CustomSidesheet: HandoverSideSheet,
        objectIdentifier: 'id',
    });

    handover.registerDataSource(async () => {
        const { fusion } = httpClient();
        fusion.setBaseUrl(
            `https://pro-s-dataproxy-${
                isProduction() ? 'fprd' : 'ci'
            }.azurewebsites.net/api/contexts/`
        );
        const contextId = isProduction()
            ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
            : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
        const response = await fusion.fetch(`${contextId}/handover/`);
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
        hiddenColumns: [
            'siteCode',
            'projectIdentifier',
            'projectDescription',
            'priority1',
            'priority2',
            'priority3',
            'description',
            'url',
            'id',
            'forecastTacDate',
        ],
        customCellView: [
            {
                key: 'commpkgStatus',
                type: {
                    Cell: ({ cell }) => {
                        const commStatus = cell.value.content.commpkgStatus;
                        const commStatusColor = getDotsColor(commStatus);
                        return <Status color={commStatusColor}>{commStatus}</Status>;
                    },
                },
            },
            {
                key: 'mcStatus',
                type: {
                    Cell: ({ cell }) => {
                        const mcStatus = cell.value.content.mcStatus;
                        const mcStatusColor = getDotsColor(mcStatus);
                        return <Status color={mcStatusColor}>{mcStatus}</Status>;
                    },
                },
            },
            {
                key: 'progress',
                type: 'Number',
            },
            {
                key: 'volume',
                type: 'Number',
            },
            {
                key: 'mcPkgsCount',
                type: 'Number',
            },
            {
                key: 'mcPkgsRFCCShippedCount',
                type: 'Number',
            },
            {
                key: 'mcPkgsRFCCSigned',
                type: 'Number',
            },
            {
                key: 'mcPkgsRFOCShipped',
                type: 'Number',
            },
            {
                key: 'mcPkgsRFOCSigned',
                type: 'Number',
            },
            {
                key: 'createdDate',
                type: 'Date',
            },
        ],
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

    handover.registerStatusItems(statusBarData);
}
