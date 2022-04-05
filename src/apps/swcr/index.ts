import { ClientApi, httpClient, isProduction } from '@equinor/portal-client';
import SwcrHeaderView from './CustomViews/SwcrGardenHeader';
import SwcrItemView from './CustomViews/SwcrGardenItem';
import { SwcrSideSheet } from './CustomViews/SwcrSideSheet';
import { SwcrPackage } from './models/SwcrPackage';
import {
    customDescription,
    fieldSettings,
    getHighlighColumn,
    getItemWidth,
} from './utilities/gardenSetup';
import { statusBarData } from './utilities/getStatusBarData';
import { sortPackagesByStatusAndNumber } from './utilities/sortFunctions';
import { SwcrGraph } from './CustomViews/Graph';
import { columns, tableConfig } from './utilities/tableSetup';
enum Tabs {
    TABLE = 0,
    GARDEN = 1,
}
export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<SwcrPackage>({
            CustomSidesheet: SwcrSideSheet,
            objectIdentifier: 'swcrNo',
            defaultTab: Tabs.GARDEN,
        })
        .registerDataSource({ responseAsync: responseAsync, responseParser: responseParser })
        .registerFilterOptions([
            {
                name: 'Status',
                valueFormatter: ({ status }) => status,
            },
            {
                name: 'Project identifier',
                valueFormatter: ({ projectIdentifier }) => projectIdentifier,
            },
            {
                name: 'Contract',
                valueFormatter: ({ contract }) => contract,
            },
            {
                name: 'Supplier',
                valueFormatter: ({ supplier }) => supplier,
            },
            {
                name: 'System',
                valueFormatter: ({ system }) => system,
            },
            {
                name: 'Types',
                valueFormatter: ({ types }) => (types.length > 0 ? types.split(',') : []),
            },
            {
                name: 'Plant',
                valueFormatter: ({ siteCode }) => siteCode,
                defaultHidden: true,
            },
            {
                name: 'Priority',
                valueFormatter: ({ priority }) => priority,
                defaultHidden: true,
            },
            {
                name: 'Control system',
                valueFormatter: ({ controlSystem }) => controlSystem,
                defaultHidden: true,
            },
            {
                name: 'Next signature by',
                valueFormatter: ({ nextsToSign }) => nextsToSign,
                defaultHidden: true,
            },
            {
                name: 'Last signed ranking',
                valueFormatter: ({ latestSignRanking }) => latestSignRanking,
                defaultHidden: true,
            },
            {
                name: 'Action',
                valueFormatter: ({ action }) => action,
                defaultHidden: true,
            },
            {
                name: 'Node',
                valueFormatter: ({ node }) => node,
                defaultHidden: true,
            },
            {
                name: 'Estimated manhours',
                valueFormatter: ({ estimatedManhours }) => estimatedManhours,
                defaultHidden: true,
            },
            {
                name: 'COMMPK no',
                valueFormatter: ({ cpkgNo }) => cpkgNo,
                defaultHidden: true,
            },
            {
                name: 'COMM phase',
                valueFormatter: ({ cpkgPhase }) => cpkgPhase,
                defaultHidden: true,
            },
            {
                name: 'Other references',
                valueFormatter: ({ referenceTypes }) => referenceTypes,
                defaultHidden: true,
            },
            {
                name: 'Due date',
                valueFormatter: ({ dueAtDate }) => dueAtDate,
                defaultHidden: true,
            },
        ])
        .registerTableOptions(tableConfig)
        .registerGardenOptions({
            gardenKey: 'dueAtDate',
            itemKey: 'swcrNo',
            type: 'virtual',
            fieldSettings,
            customViews: {
                customItemView: SwcrItemView,
                customHeaderView: SwcrHeaderView,
            },
            itemWidth: getItemWidth,
            rowHeight: 25,
            highlightColumn: getHighlighColumn,
            customDescription: customDescription,
        })
        .registerAnalyticsOptions({
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
        })
        .registerStatusItems(statusBarData);
}

async function responseAsync(signal?: AbortSignal) {
    const { fusion } = httpClient();
    fusion.setBaseUrl(
        `https://pro-s-dataproxy-${isProduction() ? 'fprd' : 'ci'}.azurewebsites.net/api/contexts/`
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
