import { baseClient } from '@equinor/http-client';
import { createDataViewer } from '../components/CompletionView/src/DataViewerApi/DataViewerApi';
import { AppApi } from './apps';

type LoopStatus = 'OK' | 'PA' | 'PB' | 'OS';

interface LoopContentChecklist {
    loopTag: string;
    tagNo: string;
    description: string;
    register: string;
    commPk: string;
    mcPk: string;
    responsible: string;
    type: string;
    status: LoopStatus;
    phase: string;
    createdAt: string;
    signedAt: string;
}

export interface Loop {
    tagNo: string;
    commPk: string;
    mcPk: string;
    description: string;
    responsible: string;
    formType: string;
    status: LoopStatus;
    phase: string;
    createdAt: string;
    signedAt: string;
    contentChecklists: LoopContentChecklist[];
    functionTags: string[];
}

const loopKeys: (keyof Loop)[] = [
    'tagNo',
    'functionTags',
    'contentChecklists',
    'description',
    'commPk',
    'mcPk',
    'signedAt',
    'createdAt',
];

export function setup(appApi: AppApi) {
    const api = baseClient(appApi.authProvider, [appApi.appConfig.procosys]);
    const commPkg = createDataViewer<Loop>({
        initialState: [],
        primaryViewKey: 'tagNo',
        viewerId: appApi.shortName,
    });

    commPkg.registerDataFetcher(async () => {
        const plantId = 'PCS$JOHAN_CASTBERG';
        const project = 'L.O532C.002';
        const response = await api.fetch(
            `https://api-lighthouse-production.playground.radix.equinor.com/loops/${plantId}/${project}`
        );

        return JSON.parse(await response.text());
    });

    commPkg.registerFilterOptions({
        excludeKeys: loopKeys,
        typeMap: {},
        groupValue: {
            signedAtDate: (item: Loop): string => {
                if (item.signedAt === '') return 'unknown';
                switch (new Date(item.signedAt).getMonth()) {
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
            },
            createdAtDate: (item: Loop): string => {
                if (item.createdAt === '') return 'unknown';
                const itemDate = new Date(item.createdAt).getDate();
                if (itemDate < new Date(955).getDate()) return 'This week';

                return 'Other';
            },
        },
    });

    commPkg.registerViewOptions({
        objectIdentifierKey: 'tagNo',
        title: {
            key: 'tagNo',
            label: 'Tag No',
        },
        description: {
            key: 'description',
            label: 'Description',
        },
    });

    commPkg.registerTableOptions({
        objectIdentifierKey: 'tagNo',
        enableSelectRows: true,
        onCellClick: (cell) => {
            console.log(cell.value);
        },
        hiddenColumns: ['functionTags', 'signedAt', 'commPk', 'description'],
        customColumns: [
            {
                Header: 'Test',
                accessor: (row) => row.status,

                Aggregated: (cell) => {
                    return 'hoi';
                },
            },
            {
                Header: 'Foo',
                accessor: (row) => {
                    return 1 + 1;
                },
            },
        ],
    });
    commPkg.registerGardenOptions({
        groupeKey: 'phase',
        itemKey: 'tagNo',
        groupByKeys: ['commPk'],
        statusFunc: statusFunc,
        //customItemView: CustomItemsView,
        //excludeKeys: [],
        //customGroupView: CustomGroupView,
    });

    commPkg.registerAnalyticsOptions({});
    commPkg.registerTreeOptions({
        groupByKeys: ['status', 'responsible', 'tagNo'],
        rootNode: 'phase',
    });
    // console.info(`Config for ${appManifest.shortName} done! `);
}

function statusFunc<T>(data: T) {
    switch (data['status']) {
        case 'OS':
            return 'yellow';

        case 'OK':
            return 'green';

        case 'PB':
            return 'pink';

        default:
            return 'black';
    }
}
