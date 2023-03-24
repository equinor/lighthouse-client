import { ClientApi, httpClient } from '@equinor/lighthouse-portal-client';
import { setupWorkspaceSidesheet } from '@equinor/WorkSpace';
import { WorkorderSideSheet } from './Garden/components';
import WorkOrderHeader from './Garden/components/WorkOrderHeader/WorkOrderHeader';
import WorkOrderItem from './Garden/components/WorkOrderItem/WorkOrderItem';
import { WorkOrder } from './Garden/models';
import { fieldSettings, getHighlightedColumn, getItemWidth } from './Garden/utility/gardenSetup';
import { sortPackages } from './Garden/utility/sortPackages';
import { filterConfig } from './utility/filterConfig';
import { analyticsConfig } from './utility/analyticsConfig';
import { statusBarConfig } from './utility/statusBarConfig';
import { tableConfig } from './utility/tableConfig';

async function responseParser(response: Response) {
    const parsedResponse = JSON.parse(await response.text()) as WorkOrder[];
    return parsedResponse;
}

async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
    const { FAM } = httpClient();
    return await FAM.fetch(`v0.1/procosys/workorder/JCA`, { signal: signal });
}

const creator = setupWorkspaceSidesheet<WorkOrder, 'work-orderDetails'>({
    id: 'work-orderDetails',
    color: '#0364B8',
    component: WorkorderSideSheet,
    props: {
        objectIdentifier: 'workOrderUrlId',
        parentApp: 'work-order',
        function: async (id: string) => {
            // TODO: Add Proper resolver function
            const items = await responseParser(await responseAsync());
            return items.find((item) => item.workOrderUrlId === id);
        },
    },
});

export const workOrderCreatorManifest = creator('SidesheetManifest');
export const workOrderCreatorComponent = creator('SidesheetComponentManifest');
export const workOrderResolverFunction = creator('ResolverFunction');

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<WorkOrder>({
            objectIdentifier: 'workOrderUrlId',
            customSidesheetOptions: creator('WorkspaceSideSheet'),
            defaultTab: 'garden',
        })
        .registerDataSource({
            responseAsync: responseAsync,
        })
        .registerFilterOptions(filterConfig)
        .registerStatusItems(statusBarConfig)
        .registerPowerBIOptions(analyticsConfig)
        .registerSearchOptions([
            { name: 'Id', valueFormatter: ({ workOrderNumber }) => workOrderNumber },
            { name: 'Description', valueFormatter: ({ description }) => description ?? '' },
        ])
        .registerTableOptions(tableConfig)
        .registerGardenOptions({
            gardenKey: 'fwp' as keyof WorkOrder,
            itemKey: 'workOrderNumber',
            fieldSettings: fieldSettings,
            objectIdentifier: 'workOrderUrlId',
            customViews: {
                customItemView: WorkOrderItem,
                customHeaderView: WorkOrderHeader,
            },
            intercepters: {
                postGroupSorting: (data, keys) => {
                    data.forEach(({ items }) => {
                        items = sortPackages(items, ...keys);
                    });
                    return data;
                },
            },

            highlightColumn: getHighlightedColumn,
            itemWidth: getItemWidth,
            rowHeight: 30,
        });
}
