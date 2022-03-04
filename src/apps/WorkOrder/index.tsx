import { baseClient } from '@equinor/http-client';
import { ClientApi, httpClient } from '@equinor/portal-client';
import { WorkOrderItem } from './Garden/components';
import { WorkOrder } from './Garden/models';
import { fieldSettings } from './Garden/utility/gardenSetup';
import { sortPackages } from './Garden/utility/sortPackages';

const excludeKeys: (keyof WorkOrder)[] = [
    'description',
    'commpkgNumber',
    'proCoSysSiteName',
    'responsibleCode',
];

export function setup(appApi: ClientApi): void {
    const commPkg = appApi.createWorkSpace<WorkOrder>({
        objectIdentifier: 'workOrderId',
    });

    const contextId = '71db33bb-cb1b-42cf-b5bf-969c77e40931';
    commPkg.registerDataSource(async () => {
        const { fusion } = httpClient();
        fusion.setBaseUrl('https://pro-s-dataproxy-ci.azurewebsites.net/api/contexts/');
        const response = await fusion.fetch(`${contextId}/work-orders`);

        const parsedResponse = JSON.parse(await response.text()) as WorkOrder[];
        return parsedResponse.slice(0, 100);
    });

    commPkg.registerFilterOptions({
        excludeKeys,
    });

    commPkg.registerTableOptions({
        objectIdentifierKey: 'mcPkgNo',
    });
    commPkg.registerGardenOptions({
        gardenKey: 'fwp' as keyof WorkOrder,
        itemKey: 'workOrderNumber',
        fieldSettings: fieldSettings,
        customViews: {
            customItemView: WorkOrderItem,
        },
        sortData: sortPackages,

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
