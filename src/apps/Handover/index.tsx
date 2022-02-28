import { ClientApi, httpClient } from '@equinor/portal-client';
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
import { Status } from './Garden/components/commonStyles';
import { statusBarData } from './Garden/components/statusItems';
export function setup(appApi: ClientApi): void {
    const handover = appApi.createWorkSpace<HandoverPackage>({
        CustomSidesheet: HandoverSideSheet,
    });

    handover.registerDataSource(async () => {
        const { fusion } = httpClient();
        const response = await fusion.fetch(
            `https://pro-s-dataproxy-fprd.azurewebsites.net/api/contexts/65728fee-185d-4a0c-a91d-8e3f3781dad8/handover/`
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
