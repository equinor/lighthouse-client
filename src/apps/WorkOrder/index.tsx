import { ClientApi, httpClient, isProduction } from '@equinor/lighthouse-portal-client';
import WorkOrderHeader from './Garden/components/WorkOrderHeader/WorkOrderHeader';
import WorkOrderItem from './Garden/components/WorkOrderItem/WorkOrderItem';
import { WorkOrder } from './Garden/models';
import { fieldSettings, getHighlightedColumn, getItemWidth } from './Garden/utility/gardenSetup';
import { sortPackages } from './Garden/utility/sortPackages';
import { filterConfig } from './utility/filterConfig';
import { analyticsConfig } from './utility/analyticsConfig';
import { statusBarConfig } from './utility/statusBarConfig';
import { tableConfig } from './utility/tableConfig';
import { creator } from './utility/sidesheetConfig';

async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
    const { FAM } = httpClient();
    return await FAM.post(`v1/typed/completion/customapi_workorders/facility/JCA?view-version=v1`, {
        signal: signal,
        body: JSON.stringify({}),
    });
}

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
