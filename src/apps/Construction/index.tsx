import { ClientApi } from '@equinor/app-builder';
import { AnalyticsOptions } from '@equinor/Diagrams';
import { baseClient } from '../../../packages/httpClient/src';
import { createPageViewer } from '../../Core/PageViewer/Api/pageViewerApi';
import { CriticalWoTable, weekDiff } from '../../packages/Diagrams/src/Visuals/CriticalWoTable';
import { HorizontalBarChartOptions } from '../../packages/Diagrams/src/Visuals/HorizontalBarVisual';
import { tableColumns } from './DetailsPage/components/temp/old';
import { cols } from './DetailsPage/tableConfig';
import { Job, mockData, WorkOrder, WorkOrderApi } from './mocData/mockData';
import { mock } from './mocData/newMockData';

const analyticsOptions: AnalyticsOptions<WorkOrder> = {
    section1: {
        chart1: {
            type: 'constructionChart',
            options: {
                timeChartOptions: {
                    categoriesKey: 'jobStatusCutoffs',
                    title: 'Job Statuses',
                    type: 'column',
                },
                title: 'Job Statuses',
            },
        },
        // chart2: {
        //     type: 'timeBarChart',
        //     options: {
        //         accumulative: true,
        //         timeChartOptions: {
        //             categoriesKey: 'jobStatusCutoffs',
        //             title: 'Job Statuses accumulated',
        //             type: 'column',
        //         },
        //         title: 'Job Statuses accumulated',
        //     },
        // },
    },
    section2: {
        chart1: {
            type: 'horizontalBarChart',
            options: {
                categoryKey: 'disciplineDescription',
                nameKey: 'disciplineDescription',
            },
        },
        chart3: {
            type: 'customVisual',
            options: {
                component: CriticalWoTable,
            },
        },
    },
};
const detailsPage: AnalyticsOptions<WorkOrder> = {
    section1: {
        chart1: {
            type: 'table',
            options: {
                initialGroupBy: 'responsibleCode',
                columns: cols,
            },
        },
        // chart2: {
        //     type: 'timeBarChart',
        //     options: {
        //         title: 'Punch A',
        //         defaultTime: 'quarter',
        //         timeChartOptions: {
        //             categoriesKey: 'createdAt',
        //             title: 'PB',
        //             type: 'bar',
        //             key: 'status',
        //             value: 'PB',
        //         },
        //     },
        // },
    },
};

export function setup(appApi: ClientApi): void {
    const api = baseClient(appApi.authProvider, [
        'api://460842ad-e295-4449-a96a-362b1e46ce45/.default',
    ]);
    const construction = createPageViewer({
        viewerId: appApi.shortName,
        title: appApi.title,
        openSidesheet: () => {},
    });

    /** 
    Remove SWCR analytics, since its not relevant for Construction
    */

    const workPreparation = construction.registerDashboard<WorkOrder>('work-preparation', {
        title: 'Work Preparation',
    });

    // Loop Data Test for testing system..
    workPreparation.registerDataSource(async () => {
        const plantId = 'PCS$JOHAN_CASTBERG';
        const project = 'L.O532C.002';
        const response: WorkOrderApi = await api
            .fetch(`https://app-ppo-construction-progress-api-dev.azurewebsites.net/WorkOrders`)
            .then((res) => res.json());

        const blah: WorkOrder[] = response.items.flatMap((j) => j);
        return blah;
        // return JSON.parse(await response.text());
        //  const data = newMock().filter((j) => j.jobStatus.startsWith('E'));
        return mock();
    });
    workPreparation.registerKpi((data) => {
        return [
            {
                status: 'ok',
                title: 'Job cards created',
                value: () => data.length.toString(),
            },
            {
                status: 'waring',
                title: 'Critical status',
                value: () => {
                    // critical WO: Workorder which havent reached status W04
                    // and 1 week left until plannedStartAtDate

                    //Find all workorders that have status W01, W02 or W03

                    const filter = ['W01', 'W02', 'W03'];
                    const firstFiltered = data.filter((wo) => filter.includes(wo.jobStatusCode));

                    // Find all the first filtered WOs that are due in one week or less

                    const secondFiltered = firstFiltered.filter(
                        (wo) =>
                            weekDiff(new Date(wo.plannedStartAtDate)).days <= 7 &&
                            weekDiff(new Date(wo.plannedStartAtDate)).days > 0
                    );

                    return secondFiltered.length.toString();
                },
            },
            {
                status: 'ok',
                title: 'Job cards in W04',
                value: () => {
                    return data.filter((wo) => wo.jobStatusCode === 'W04').length.toString();
                },
            },
        ];
    });

    const excludeKeys: (keyof WorkOrder)[] = [];

    // const excludeKeys: (keyof WP)[] = [
    //     'tagNo',
    //     'functionTags',
    //     'contentChecklists',
    //     'description',
    //     'commPk',
    //     'mcPk',
    //     'signedAt',
    //     'createdAt',
    // ];

    // workPreparation.registerFilterOptions({ excludeKeys });

    workPreparation.registerPage({
        title: 'Jobcards',
        pageId: 'workPreparationJobCards',
        type: 'AnalyticsPage',
        ...analyticsOptions,
    });

    // workPreparation.registerPage({
    //     title: 'Hours',
    //     pageId: 'workPreparationHours',
    //     type: 'AnalyticsPage',
    //     ...analyticsOptions2,
    // });
    // workPreparation.registerPage({
    //     title: 'Details',
    //     pageId: 'workPreparationDetails',
    //     type: 'AnalyticsPage',
    //     ...detailsPage,
    // });

    // workPreparation.registerPage({
    //     title: 'Hold',
    //     pageId: 'workPreparationDetailsHold',
    //     type: 'AnalyticsPage',
    //     ...analyticsOptions2,
    // });

    /** 
    Remove LCI hanging garden, since its not relevant for Construction
    */
    // construction.registerFusionPowerBi('lci-hanging-gardens', {
    //     title: 'LCI Hanging Garden',
    //     reportURI: 'lci-hanging-gardens',
    // });
    construction.registerFusionPowerBi('jca-checklist', {
        title: 'Checklist Analytics',
        reportURI: 'jca-checklist',
    });
    construction.registerFusionPowerBi('ec2496e8-e440-441c-8e20-73d3a9d56f74', {
        title: 'Punch Analytics',
        reportURI: 'punch-analytics-rls',
    });
    construction.registerFusionPowerBi('fd4052a9-641b-47b4-92d6-4876ecb8cdba', {
        title: 'WO Analytics',
        reportURI: 'wo-analytics-rls',
    });
}
