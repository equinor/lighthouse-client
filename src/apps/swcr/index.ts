import { ClientApi, httpClient, isProduction } from '@equinor/portal-client';
import { SwcrGraph } from './CustomViews/Graph';
import SwcrHeaderView from './CustomViews/SwcrGardenHeader';
import SwcrItemView from './CustomViews/SwcrGardenItem';
import { SwcrSideSheet } from './CustomViews/SwcrSideSheet';
import { SwcrPackage } from './models/SwcrPackage';
import { filterSetup } from './utilities/filterSetup';
import {
    customDescription,
    fieldSettings,
    getHighlighColumn,
    getItemWidth
} from './utilities/gardenSetup';
import { statusBarData } from './utilities/getStatusBarData';
import { sortPackagesByStatusAndNumber } from './utilities/sortFunctions';
import { columns, tableConfig } from './utilities/tableSetup';

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<SwcrPackage>({
            CustomSidesheet: SwcrSideSheet,
            objectIdentifier: 'swcrNo',
            defaultTab: 'garden',
        })
        .registerDataSource({ responseAsync: responseAsync, responseParser: responseParser })
        .registerFilterOptions(filterSetup)
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
        .registerStatusItems(statusBarData)
        .registerPowerBIOptions({
            reportURI: 'pp-swcr-analytics',
            pages: [
                {
                    pageTitle: 'Overview',
                    pageId: 'ReportSectionb937310a77e18f67ff37',
                    default: true,
                },
                { pageTitle: 'Browser', pageId: 'ReportSection272f7d54d84d16689496' },
                { pageTitle: 'History', pageId: 'ReportSection0cb62244235c033e5151' },
            ],
        });
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
