import { ClientApi, httpClient, isProduction } from '@equinor/portal-client';
import { WorkorderSideSheet } from './Garden/components';
import WorkOrderItem from './Garden/components/WorkOrderItem/WorkOrderItem';
import { WorkOrder } from './Garden/models';
import { fieldSettings, getHighlightedColumn, getItemWidth } from './Garden/utility/gardenSetup';
import { sortPackages } from './Garden/utility/sortPackages';

export function setup(appApi: ClientApi): void {
    const contextId = isProduction()
        ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
        : '71db33bb-cb1b-42cf-b5bf-969c77e40931';

    async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
        const { fusionDataproxy } = httpClient();

        return await fusionDataproxy.fetch(`api/contexts/${contextId}/work-orders`, {
            signal: signal,
        });
    }

    async function responseParser(response: Response) {
        const parsedResponse = JSON.parse(await response.text()) as WorkOrder[];
        return parsedResponse;
    }

    appApi
        .createWorkSpace<WorkOrder>({
            objectIdentifier: 'workOrderId',
            CustomSidesheet: WorkorderSideSheet,
        })
        .registerDataSource({
            responseAsync: responseAsync,
            responseParser: responseParser,
        })
        .registerFilterOptions([
            {
                name: 'Discipline',
                valueFormatter: ({ disciplineCode }) => disciplineCode,
            },
            {
                name: 'Site codes',
                valueFormatter: ({ siteCodes }) => siteCodes,
            },
            {
                name: 'Responsible code',
                valueFormatter: ({ responsibleCode }) => responsibleCode,
            },
            {
                name: 'Job status',
                valueFormatter: ({ jobStatus }) => jobStatus,
            },
        ])
        .registerTableOptions({
            objectIdentifierKey: 'mcPkgNo',
        })
        .registerGardenOptions({
            gardenKey: 'fwp' as keyof WorkOrder,
            itemKey: 'workOrderNumber',
            fieldSettings: fieldSettings,

            type: 'virtual',
            customViews: {
                customItemView: WorkOrderItem,
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
