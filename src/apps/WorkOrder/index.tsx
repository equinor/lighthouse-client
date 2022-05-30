import { ClientApi, getFusionContextId, httpClient } from '@equinor/lighthouse-portal-client';
import { setupWorkspaceSidesheet } from '../../Core/WorkSpace/src/WorkSpaceApi/Functions/setupWorkspaceSidesheet';
import { WorkorderSideSheet } from './Garden/components';
import WorkOrderHeader from './Garden/components/WorkOrderHeader/WorkOrderHeader';
import WorkOrderItem from './Garden/components/WorkOrderItem/WorkOrderItem';
import { WorkOrder } from './Garden/models';
import { fieldSettings, getHighlightedColumn, getItemWidth } from './Garden/utility/gardenSetup';
import { sortPackages } from './Garden/utility/sortPackages';
import { filterConfig } from './utility/filterConfig';
import { tableConfig } from './utility/tableConfig';

async function responseParser(response: Response) {
    const parsedResponse = JSON.parse(await response.text()) as WorkOrder[];
    return parsedResponse;
}

async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
    const { fusionDataproxy } = httpClient();
    const contextId = getFusionContextId();
    return await fusionDataproxy.fetch(`api/contexts/${contextId}/work-orders`, {
        signal: signal,
    });
}

const creator = setupWorkspaceSidesheet<WorkOrder, 'work-orderDetails'>({
    id: 'work-orderDetails',
    color: '#0364B8',
    component: WorkorderSideSheet,
    props: {
        objectIdentifier: 'workOrderId',
        parentApp: 'work-order',
        function: async (id: string) => {
            // TODO: Add Proper resolver function
            const items = await responseParser(await responseAsync());
            return items.find((item) => item.workOrderId === id);
        },
    },
});

export const workOrderCreatorManifest = creator('SidesheetManifest');
export const workOrderCreatorComponent = creator('SidesheetComponentManifest');
export const workOrderResolverFunction = creator('ResolverFunction');

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<WorkOrder>({
            objectIdentifier: 'workOrderId',
            customSidesheetOptions: creator('WorkspaceSideSheet'),
            defaultTab: 'garden',
        })
        .registerDataSource({
            responseAsync: responseAsync,
            responseParser: responseParser,
        })
        .registerFilterOptions(filterConfig)
        .registerSearchOptions([
            { name: 'Id', valueFormatter: ({ workOrderNumber }) => workOrderNumber },
        ])
        .registerTableOptions(tableConfig)
        .registerGardenOptions({
            gardenKey: 'fwp' as keyof WorkOrder,
            itemKey: 'workOrderNumber',
            fieldSettings: fieldSettings,
            objectIdentifier: 'workOrderId',
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

            // status: { statusItemFunc, shouldAggregate: true },
            //options: { groupDescriptionFunc },
        });

    // commPkg.registerAnalyticsOptions(analyticsOptions);
    // commPkg.registerTreeOptions({
    //     groupByKeys: ['status', 'responsible', 'tagNo'],
    //     itemKey: 'tagNo',
    // });
    // commPkg.registerStatusItems(statusBarData);
    // console.info(`Config for ${appManifest.shortName} done! `);
}

// function statusItemFunc<T>(data: T): Status {
//     switch (data['status']) {
//         case 'OK':
//             return { rating: 4, status: 'Good', statusElement: <StatusDot color={'green'} /> };

//         case 'OS':
//             return { rating: 3, status: 'Medium', statusElement: <StatusDot color={'blue'} /> };

//         case 'PB':
//             return { rating: 2, status: 'Bad', statusElement: <StatusDot color={'yellow'} /> };

//         case 'PA':
//             return { rating: 1, status: 'Bad', statusElement: <StatusDot color={'red'} /> };

//         default:
//             return {
//                 status: 'Default',
//                 rating: 0,
//                 statusElement: <StatusDot color={'black'} />,
//             };
//     }
// }

// interface DotProps {
//     color: string;
// }

// export const StatusDot = styled.span`
//     height: 1rem;
//     width: 1rem;
//     background-color: ${(p: DotProps) => p.color};
//     border-radius: 50%;
//     margin-right: 1em;
// `;
