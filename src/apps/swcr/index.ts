import { ClientApi, httpClient, isProduction } from '@equinor/portal-client';
import SwcrHeaderView from './CustomViews/SwcrGardenHeader';
import SwcrItemView from './CustomViews/SwcrGardenItem';
import { SwcrGroupView } from './CustomViews/SwcrGroupView';
import { SwcrSideSheet } from './CustomViews/SwcrSideSheet';
import { SwcrPackage } from './models/SwcrPackage';
import { fieldSettings } from './utilities/gardenSetup';
import { statusBarData } from './utilities/getStatusBarData';
import { sortPackagesByStatusAndNumber } from './utilities/sortFunctions';
import { SwcrGraph } from './CustomViews/Graph';
import { columns } from './utilities/tableSetup';
import { getYearAndWeekFromDate } from './utilities/packages';
import { GardenGroups } from '../../components/ParkView/Models/data';
import { getGardenItemCompletionColor } from '../DisciplineReleaseControl/Components/Garden/gardenFunctions';
import { getGardenItems } from '../../components/ParkView/Components/VirtualGarden/utils';
enum Tabs {
    TABLE,
    GARDEN,
}
export function setup(appApi: ClientApi): void {
    const swcr = appApi.createWorkSpace<SwcrPackage>({
        CustomSidesheet: SwcrSideSheet,
        objectIdentifier: 'swcrNo',
        defaultTab: Tabs.GARDEN,
    });

    async function responseAsync(signal?: AbortSignal) {
        const { fusion } = httpClient();
        fusion.setBaseUrl(
            `https://pro-s-dataproxy-${
                isProduction() ? 'fprd' : 'ci'
            }.azurewebsites.net/api/contexts/`
        );
        const contextId = isProduction()
            ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
            : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
        return await fusion.fetch(`${contextId}/swcr`, { signal: signal });
    }

    async function responseParser(res: Response) {
        const swcrPackages = JSON.parse(await res.text()) as SwcrPackage[];
        return swcrPackages.sort(sortPackagesByStatusAndNumber);
    }

    swcr.registerDataSource({ responseAsync: responseAsync, responseParser: responseParser });

    swcr.registerFilterOptions({
        defaultActiveFilters: [
            'status',
            'projectIdentifier',
            'contract',
            'supplier',
            'system',
            'types',
        ],
        excludeKeys: [
            'description',
            'nextsToSign',
            'projectDescription',
            'modification',
            'rowKey',
            'url',
            'updatedAtDate',
            'cntAttachments',
            'title',
            'swcrId',
        ],
    });

    swcr.registerTableOptions({
        objectIdentifierKey: 'swcrId',
        columnOrder: [
            'swcrNo',
            'title',
            'system',
            'controlSystem',
            'priority',
            'supplier',
            'action',
            'contract',
        ],
        headers: [
            {
                key: 'swcrNo',
                title: 'Swcr',
            },
            {
                key: 'title',
                title: 'Title',
            },
            {
                key: 'priority',
                title: 'Priority',
            },
            {
                key: 'system',
                title: 'System',
            },
            {
                key: 'controlSystem',
                title: 'Control System',
            },
            {
                key: 'action',
                title: 'Action',
            },
            {
                key: 'supplier',
                title: 'Supplier',
            },
        ],
        hiddenColumns: [
            'siteCode',
            'projectIdentifier',
            'projectDescription',
            'description',
            'modification',
        ],
    });
    swcr.registerGardenOptions({
        gardenKey: 'dueAtDate',
        itemKey: 'swcrNo',
        type: 'virtual',
        fieldSettings,
        customViews: {
            customItemView: SwcrItemView,
            customGroupView: SwcrGroupView,
            customHeaderView: SwcrHeaderView,
        },
        itemWidth: (garden: GardenGroups<SwcrPackage>, groupByKey: string) => {
            const gardenItemList: SwcrPackage[] = [];
            const columnName = groupByKey.replace('nextSignatureBy', 'nextToSign');
            debugger;
            garden.forEach((column) => {
                const gardenItems = getGardenItems(column);
                debugger;
                gardenItems && gardenItemList.push(...(gardenItems as SwcrPackage[]));
            });
            const longestKey = Math.max.apply(
                Math,
                gardenItemList.map((item) => {
                    const titleLength = item?.[columnName] ? item[columnName].length : 0;
                    return titleLength >= item.swcrNo.length ? titleLength : item.swcrNo.length;
                })
            );
            return Math.max(longestKey * 8 + 80, 120);
        },
        rowHeight: 20,
        highlightColumn: (groupByKey: string) => {
            return Boolean(groupByKey === 'createdAtDate' || groupByKey === 'dueAtDate')
                ? getYearAndWeekFromDate(new Date())
                : undefined;
        },
    });

    swcr.registerAnalyticsOptions({
        section1: {
            chart1: {
                type: 'customVisual',
                options: {
                    component: SwcrGraph,
                    componentProps: {
                        graphType: 'created-closed',
                    },
                },
            },
            chart2: {
                type: 'customVisual',
                options: {
                    component: SwcrGraph,
                    componentProps: {
                        graphType: 'open',
                    },
                },
            },
        },
        section2: {
            chart1: {
                type: 'customVisual',
                options: {
                    component: SwcrGraph,
                    componentProps: {
                        graphType: 'acc',
                    },
                },
            },
        },

        section3: {
            chart2: {
                type: 'table',
                options: {
                    initialGroupBy: 'priority',
                    groupBy: [
                        {
                            key: 'controlSystem',
                            title: 'Control System',
                        },
                        {
                            key: 'priority',
                            title: 'Priority',
                        },
                        {
                            key: 'system',
                            title: 'System',
                        },
                        {
                            key: 'types',
                            title: 'HW/SW',
                        },
                    ],

                    columns: columns,
                },
            },
        },
    });

    swcr.registerStatusItems(statusBarData);
}
