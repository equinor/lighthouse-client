import { baseClient } from '@equinor/http-client';
import { ClientApi } from '@equinor/portal-client';

interface CommPkg {
    Area__Id: string;
    CommPhase__Id: string;
    CommPkgNo: string;
    CommPriority1__Id: string;
    CommPriority2__Id: string;
    CommPriority3__Id: string;
    CommissioningHandoverStatus: number;
    Description: string;
    Id: number;
    McStatus__Id: string;
    OperationHandoverStatus: string;
    PlannedCompleted: string;
    PlannedStartup: string;
    Responsible__Id: string;
    Status__Id: string;
}

const commPkgKeys: (keyof CommPkg)[] = [
    'Id',
    'CommPriority1__Id',
    'CommPkgNo',
    'Description',
    'PlannedStartup',
];

function start(item: CommPkg): string {
    switch (new Date(item.PlannedStartup).getMonth()) {
        case 0:
            return 'January';
        case 1:
            return 'February';
        case 2:
            return 'March';
        case 3:
            return 'April';
        case 4:
            return 'May';
        case 5:
            return 'June';
        case 6:
            return 'July';
        case 7:
            return 'August';
        case 8:
            return 'September';
        case 9:
            return 'October';
        case 10:
            return 'November';
        case 11:
            return 'December';
        default:
            return 'Unknown';
    }
}

export function setup(appApi: ClientApi): void {
    const api = baseClient(appApi.authProvider, [appApi.appConfig.scope.procosys]);
    //TODO: Extract config to consts
    appApi
        .createWorkSpace<CommPkg>({ objectIdentifier: 'Id' })
        .registerDataSource({
            responseAsync: responseAsync,
        })
        .registerTableOptions({ objectIdentifierKey: 'CommPkgNo' })
        .registerGardenOptions({
            gardenKey: 'Responsible__Id',
            itemKey: 'CommPkgNo',
        })
        .registerFilterOptions({
            excludeKeys: commPkgKeys,
            headerNames: {
                Responsible__Id: 'Responsible Id',
                Area__Id: 'Area',
                McStatus__Id: 'Mc Status',
            },
            valueFormatter: {
                start,
            },
        });

    async function responseAsync(signal?: AbortSignal) {
        const plantId = 'PCS$JOHAN_CASTBERG';
        // const project = 'L.O532C.002';
        return await api.fetch(
            // `https://api-lighthouse-production.playground..equinor.com/commpks/${plantId}/${project}`
            `https://procosyswebapi.equinor.com/api/Search?plantId=${plantId}&savedSearchId=96128&itemsPerPage=10&paging=false&sortColumns=false&api-version=4.1`,
            { body: JSON.stringify([]), method: 'POST', signal: signal }
        );
    }

    // commPkg.registerTreeOptions({
    //     groupByKeys: ['Status__Id', 'CommPkgNo'],
    //     rootNode: 'Responsible__Id'
    // });
    // console.info(`Config for ${appManifest.shortName} done! `);
}
