import { baseClient } from '@equinor/http-client';
import { ClientApi } from '@equinor/portal-client';

export interface WorkOrder {
    plant: string;
    projectName: string;
    commPkgNo: string;
    mcPkgNo: string;
    description: string;
    plantName: string;
    remark: string;
    responsibleCode: string;
    responsibleDescription: string;
    areaCode: string;
    areaDescription: string;
    discipline: string;
    lastUpdated: string;
}

const excludeKeys: (keyof WorkOrder)[] = [
    'description',
    'mcPkgNo',
    'lastUpdated',
    'projectName',
    'plantName',
    'plant',
    'responsibleDescription',
    'remark',
    'areaDescription',
];

export function setup(appApi: ClientApi): void {
    const api = baseClient(appApi.authProvider, [
        'api://460842ad-e295-4449-a96a-362b1e46ce45/.default',
    ]);
    const commPkg = appApi.createWorkSpace<WorkOrder>({
        objectIdentifier: 'mcPkgNo',
    });

    commPkg.registerDataSource(async () => {
        const response = await api.fetch(
            `https://app-ppo-construction-progress-api-dev.azurewebsites.net/McPkg`
        );

        return JSON.parse(await response.text()).items;
    });

    commPkg.registerFilterOptions({
        excludeKeys,
    });

    commPkg.registerTableOptions({
        objectIdentifierKey: 'mcPkgNo',
    });
    commPkg.registerGardenOptions({
        gardenKey: 'discipline',
        itemKey: 'mcPkgNo',
        groupByKeys: ['commPkgNo'],
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
