import { baseClient } from '@equinor/http-client';
import { createDataViewer } from '../components/CompletionView/src/DataViewerApi/DataViewerApi';
import { AppApi } from './apps';

export interface Checklist {
    Hyperlink_Status__Id: string;
    Hyperlink_TagFormularType__FormularType__Id: string;
    Hyperlink_TagFormularType__Tag__CallOff__PurchaseOrder__PackageNo: string;
    Hyperlink_TagFormularType__Tag__McPkg__CommPkg__CommPkgNo: string;
    Hyperlink_TagFormularType__Tag__TagNo: string;
    Id: number;
    McPhase__Id: string;
    Responsible__Id: string;
    SignedAt: string;
    Status__Id: string;
    TagFormularType__FormularType__Discipline__Description: string;
    TagFormularType__FormularType__Discipline__Id: string;
    TagFormularType__FormularType__FormularGroup__Description: string;
    TagFormularType__FormularType__Id: string;
    TagFormularType__SheetNo: number;
    TagFormularType__SubsheetNo: number;
    TagFormularType__Tag__CallOff__PurchaseOrder__PackageNo: string;
    TagFormularType__Tag__McPkg__CommPkg__Area__Id: string;
    TagFormularType__Tag__McPkg__CommPkg__CommPkgNo: string;
    TagFormularType__Tag__McPkg__CommPkg__CommPriority1__Id: string;
    TagFormularType__Tag__McPkg__CommPkg__CommissioningHandoverStatus: string;
    TagFormularType__Tag__McPkg__CommPkg__OperationHandoverStatus: string;
    TagFormularType__Tag__TagNo: string;
    VerifiedAt: string;
    WorkOrders__WoNo: string;
}

const commPkgKeys: (keyof Checklist)[] = [
    'Hyperlink_Status__Id',
    'Hyperlink_TagFormularType__FormularType__Id',
    'Hyperlink_TagFormularType__Tag__CallOff__PurchaseOrder__PackageNo',
    'Hyperlink_TagFormularType__Tag__McPkg__CommPkg__CommPkgNo',
    'Hyperlink_TagFormularType__Tag__TagNo',
    'Id',
    'McPhase__Id',
    // 'Responsible__Id',
    'SignedAt',
    //'Status__Id',
    //'TagFormularType__FormularType__Discipline__Description',
    'TagFormularType__FormularType__Discipline__Id',
    'TagFormularType__FormularType__FormularGroup__Description',
    //'TagFormularType__FormularType__Id',
    'TagFormularType__SheetNo',
    'TagFormularType__SubsheetNo',
    'TagFormularType__Tag__CallOff__PurchaseOrder__PackageNo',
    'TagFormularType__Tag__McPkg__CommPkg__Area__Id',
    'TagFormularType__Tag__McPkg__CommPkg__CommPkgNo',
    'TagFormularType__Tag__McPkg__CommPkg__CommPriority1__Id',
    // 'TagFormularType__Tag__McPkg__CommPkg__CommissioningHandoverStatus',
    'TagFormularType__Tag__McPkg__CommPkg__OperationHandoverStatus',
    'TagFormularType__Tag__TagNo',
    'VerifiedAt',
    'WorkOrders__WoNo'
];

export function setup(appApi: AppApi) {
    const api = baseClient(appApi.authProvider, [appApi.appConfig.procosys]);
    const checklist = createDataViewer<Checklist>({
        initialState: [],
        primaryViewKey: 'TagFormularType__Tag__TagNo',
        viewerId: appApi.shortName
    });

    checklist.registerDataFetcher(async () => {
        const plantId = 'PCS$JOHAN_CASTBERG';
        const project = 'L.O532C.002';
        const response = await api.fetch(
            `https://procosyswebapi.equinor.com/api/Search?plantId=${plantId}&savedSearchId=103425&itemsPerPage=10&paging=false&sortColumns=false&api-version=4.1`,
            { body: JSON.stringify([]), method: 'POST' }
        );
        // const response = await fetch('./checklist.json');

        const data = JSON.parse(await response.text());

        return data;
    });

    checklist.registerFilterOptions({
        excludeKeys: commPkgKeys,
        typeMap: {},
        groupValue: {}
    });

    checklist.registerViewOptions({
        objectIdentifierKey: 'Id',
        title: {
            key: 'TagFormularType__Tag__TagNo',
            label: 'TagNo:'
        },
        description: {
            key: 'TagFormularType__FormularType__FormularGroup__Description',
            label: 'Description'
        }
    });

    checklist.registerTableOptions({ objectIdentifierKey: 'Id' });
    checklist.registerGardenOptions({
        groupeKey: 'Responsible__Id',
        itemKey: 'TagFormularType__Tag__TagNo'
    });
    checklist.registerAnalyticsOptions({});
}
