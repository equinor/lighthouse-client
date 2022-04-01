import { ClientApi, httpClient, isProduction } from '@equinor/portal-client';
import { SwcrHeaderView } from './CustomViews/SwcrGardenHeader';
import { SwcrItemView } from './CustomViews/SwcrGardenItem';
import { SwcrGroupView } from './CustomViews/SwcrGroupView';
import { SwcrSideSheet } from './CustomViews/SwcrSideSheet';
import { SwcrPackage } from './models/SwcrPackage';
import { fieldSettings } from './utilities/gardenSetup';
import { statusBarData } from './utilities/getStatusBarData';
import { sortPackagesByStatusAndNumber } from './utilities/sortFunctions';
import { SwcrGraph } from './CustomViews/Graph';
import { columns } from './utilities/tableSetup';
export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<SwcrPackage>({
            CustomSidesheet: SwcrSideSheet,
            objectIdentifier: 'swcrNo',
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
                valueFormatter: ({ types }) => types.split(','),
            },
        ])
        .registerTableOptions({ objectIdentifierKey: 'swcrId', columnOrder: ['system', 'types'] })
        .registerGardenOptions({
            gardenKey: 'dueAtDate',
            itemKey: 'swcrNo',
            type: 'normal',
            fieldSettings,
            customViews: {
                customItemView: SwcrItemView,
                customGroupView: SwcrGroupView,
                customHeaderView: SwcrHeaderView,
            },
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
