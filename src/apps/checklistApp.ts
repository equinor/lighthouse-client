import { baseClient } from '@equinor/http-client';
import { createDataViewer } from '../components/CompletionView/src/DataViewerApi/DataViewerApi';
import useClientContext from '../context/clientContext';
import { AppManifest } from './apps';

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

export function setup(appManifest: AppManifest) {
    const { appConfig, authProvider } = useClientContext();
    const checklist = createDataViewer<CommPkg>({
        initialState: [],
        primaryViewKey: 'CommPkgNo',
        viewerId: appManifest.shortName
    });

    const api = baseClient(authProvider, [appConfig.procosys]);

    checklist.registerDataFetcher(async () => {
        const plantId = 'PCS$JOHAN_CASTBERG';
        const response = await api.fetch(
            `https://procosyswebapi.equinor.com/api/Search?plantId=${plantId}&savedSearchId=96128&itemsPerPage=10&paging=false&sortColumns=false&api-version=4.1`,
            { body: JSON.stringify([]), method: 'POST' }
        );

        return JSON.parse(await response.text());
    });
    const config = { test: '' };

    checklist.registerViewOptions({
        objectIdentifierKey: 'CommPkgNo',
        title: {
            key: 'CommPkgNo',
            label: 'Comm. Package:'
        },
        description: {
            key: 'Description',
            label: 'Description'
        }
    });
    checklist.registerTableOptions({ objectIdentifierKey: 'CommPkgNo' });
    checklist.registerGardenOptions({
        groupeKey: 'Responsible__Id',
        itemKey: 'CommPkgNo'
    });
    checklist.registerTreeOptions({
        groupByKeys: ['Status__Id', 'CommPkgNo'],
        rootNode: 'Responsible__Id'
    });
    console.info(`Config for ${appManifest.shortName} done! `);
}
