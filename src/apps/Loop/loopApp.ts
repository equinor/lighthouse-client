import { baseClient } from '@equinor/http-client';
import { createDataViewer } from '../../components/CompletionView/src/DataViewerApi/DataViewerApi';
import { AppApi } from '../apps';
import { analyticsOptions, statusBarData } from './Sections/AnalycticsConfig';

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
    // commPkg.registerDataValidator()

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

    commPkg.registerTableOptions({ objectIdentifierKey: 'tagNo' });
    commPkg.registerGardenOptions({
        groupeKey: 'phase',
        itemKey: 'tagNo',
    });
    commPkg.registerAnalyticsOptions(analyticsOptions);
    commPkg.registerTreeOptions({
        groupByKeys: ['status', 'responsible', 'tagNo'],
        rootNode: 'phase',
    });
    commPkg.registerStatusItems(statusBarData);
    // console.info(`Config for ${appManifest.shortName} done! `);
}
