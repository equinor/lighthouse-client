import { baseClient } from '@equinor/http-client';
import { createDataViewer } from '../components/CompletionView/src/DataViewerApi/DataViewerApi';
import { AppApi } from './apps';

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
    'Area__Id',
];

function start(item: CommPkg): string | null {
    if (item.PlannedCompleted === null) {
        return 'Null';
    }
    switch (new Date(item.PlannedCompleted).getMonth()) {
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

export function setup(appApi: AppApi) {
    const api = baseClient(appApi.authProvider, [appApi.appConfig.procosys]);
    const commPkg = createDataViewer<CommPkg>({
        initialState: [],
        primaryViewKey: 'CommPkgNo',
        viewerId: appApi.shortName,
    });

    commPkg.registerDataSource(async () => {
        const plantId = 'PCS$JOHAN_CASTBERG';
        //const project = 'L.O532C.002';
        const response = await api.fetch(
            // `https://api-lighthouse-production.playground..equinor.com/commpks/${plantId}/${project}`
            `https://procosyswebapi.equinor.com/api/Search?plantId=${plantId}&savedSearchId=96128&itemsPerPage=10&paging=false&sortColumns=false&api-version=4.1`,
            { body: JSON.stringify([]), method: 'POST' }
        );

        const data = JSON.parse(await response.text());
        return data;
    });

    commPkg.registerFilterOptions({
        excludeKeys: commPkgKeys,
        typeMap: {
            Responsible__Id: 'Responsible',
            Area__Id: 'Area',
            McStatus__Id: 'Mc Status',
            CommPriority3__Id: 'CommPriority 3',
            CommPriority2__Id: 'CommPriority 2',
            Status__Id: 'Status',
            CommPhase__Id: 'Comm phase',
        },
        groupValue: {
            PlannedCompleted: start,
        },
    });

    commPkg.registerViewOptions({
        objectIdentifierKey: 'CommPkgNo',
        title: {
            key: 'CommPkgNo',
            label: 'Comm. Package:',
        },
        description: {
            key: 'Description',
            label: 'Description',
        },
    });

    commPkg.registerTableOptions({ objectIdentifierKey: 'CommPkgNo' });
    commPkg.registerGardenOptions({
        gardenKey: 'Responsible__Id',
        itemKey: 'CommPkgNo',
    });
    // commPkg.registerTreeOptions({
    //     groupByKeys: ['Status__Id', 'CommPkgNo'],
    //     rootNode: 'Responsible__Id'
    // });
    // console.info(`Config for ${appManifest.shortName} done! `);
}
