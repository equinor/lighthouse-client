import { baseClient } from '@equinor/http-client';
import styled from 'styled-components';
import { createDataViewer } from '../../components/CompletionView/src/DataViewerApi/DataViewerApi';
import { Status } from '../../components/CompletionView/src/DataViewerApi/DataViewState';
import { createDataFactory } from '../../Core/DataFactory';
import { AppApi } from '../apps';
import { analyticsOptions, statusBarData } from './Sections/AnalyticsConfig';

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
    // createDataFactory({
    //     factoryId: 'loop',
    //     tile: 'Creat Loop',
    //     component: (scope: any) => <div>Creat Loop {scope.test}</div>,
    // });
    // createDataFactory({
    //     factoryId: 'swcr',
    //     tile: 'Create SWCR',
    //     component: (scope: any) => <div>Create SWCR {scope.test}</div>,
    // });

    const api = baseClient(appApi.authProvider, [appApi.appConfig.procosys]);
    const commPkg = createDataViewer<Loop>({
        initialState: [],
        primaryViewKey: 'tagNo',
        viewerId: appApi.shortName,
    });

    commPkg.registerDataSource(async () => {
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
        // hiddenColumns: ['functionTags', 'signedAt', 'commPk'],
        // headers: [
        //     { key: 'formType', title: 'Form' },
        //     { key: 'createdAt', title: 'Created Date' },
        // ],
        // customCellView: [
        //     {
        //         key: 'createdAt',
        //         type: 'Date',
        //     },
        //     {
        //         key: 'description',
        //         type: 'Description',
        //     },

        //     {
        //         key: 'status',
        //         type: 'Status',
        //         cellAttributeFn: (content) => {
        //             let bgcolor = '';

        //             if (content.status === 'OK') {
        //                 bgcolor = 'green';
        //             } else if (content.status === 'OS') {
        //                 bgcolor = 'blue';
        //             } else if (content.status === 'PA') {
        //                 bgcolor = 'red';
        //             } else {
        //                 bgcolor = 'yellow';
        //             }

        //             return {
        //                 style: {
        //                     backgroundColor: bgcolor,
        //                     color: bgcolor === 'blue' ? 'white' : 'black',
        //                 },
        //             };
        //         },
        //     },
        //     {
        //         key: 'formType',
        //         type: {
        //             Cell: ({ cell }) => {
        //                 return (
        //                     <div style={{ fontWeight: 500 }}>
        //                         {cell.row.original.formType as string}
        //                     </div>
        //                 );
        //             },
        //         },
        //     },
        // ],
        // customColumns: [
        //     {
        //         Header: 'Custom',
        //         accessor: (row) => {
        //             return row['contentChecklists'].length + 1;
        //         },
        //         aggregate: 'count',
        //         Aggregated: (cell) => {
        //             return <div>{cell.value}</div>;
        //         },
        //     },
        // ],
    });
    commPkg.registerGardenOptions({
        gardenKey: 'phase',
        itemKey: 'tagNo',
        groupByKeys: ['commPk'],
        status: { statusItemFunc, shouldAggregate: true },
        //options: { groupDescriptionFunc },
        excludeKeys: [],
    });
    commPkg.registerAnalyticsOptions(analyticsOptions);
    commPkg.registerTreeOptions({
        groupByKeys: ['status', 'responsible', 'tagNo'],
        itemKey: 'tagNo',
    });
    commPkg.registerStatusItems(statusBarData);
    // console.info(`Config for ${appManifest.shortName} done! `);
}

function statusItemFunc<T>(data: T): Status {
    switch (data['status']) {
        case 'OK':
            return { rating: 4, status: 'Good', statusElement: <StatusDot color={'green'} /> };

        case 'OS':
            return { rating: 3, status: 'Medium', statusElement: <StatusDot color={'blue'} /> };

        case 'PB':
            return { rating: 2, status: 'Bad', statusElement: <StatusDot color={'yellow'} /> };

        case 'PA':
            return { rating: 1, status: 'Bad', statusElement: <StatusDot color={'red'} /> };

        default:
            return {
                status: 'Default',
                rating: 0,
                statusElement: <StatusDot color={'black'} />,
            };
    }
}

interface DotProps {
    color: string;
}

export const StatusDot = styled.span`
    height: 1rem;
    width: 1rem;
    background-color: ${(p: DotProps) => p.color};
    border-radius: 50%;
    margin-right: 1em;
`;
