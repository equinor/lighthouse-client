import { ClientApi, httpClient } from '@equinor/portal-client';
import { WorkorderSideSheet } from './Garden/components';
import WorkOrderHeader from './Garden/components/WorkOrderHeader/WorkOrderHeader';
import WorkOrderItem from './Garden/components/WorkOrderItem/WorkOrderItem';
import { WorkOrder } from './Garden/models';
import { fieldSettings, getHighlightedColumn, getItemWidth } from './Garden/utility/gardenSetup';
import { sortPackages } from './Garden/utility/sortPackages';
import { filterConfig } from './utility/filterConfig';
import { tableConfig } from './utility/tableConfig';

enum Tabs {
    TABLE,
    GARDEN,
}
export function setup(appApi: ClientApi): void {
    async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
        const { FAM } = httpClient();
        return await FAM.fetch(`v0.1/procosys/workorder/JCA`, { signal: signal });
    }

    async function responseParser(response: Response) {
        const parsedResponse = JSON.parse(await response.text()) as WorkOrder[];
        return parsedResponse;
    }

    appApi
        .createWorkSpace<WorkOrder>({
            objectIdentifier: 'workOrderId',
            CustomSidesheet: WorkorderSideSheet,
            defaultTab: Tabs.GARDEN,
        })
        .registerDataSource({
            responseAsync: responseAsync,
            responseParser: responseParser,
        })
        .registerFilterOptions(filterConfig)
        .registerTableOptions(tableConfig)
        .registerGardenOptions({
            gardenKey: 'fwp' as keyof WorkOrder,
            itemKey: 'workOrderNumber',
            fieldSettings: fieldSettings,

            type: 'virtual',
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
