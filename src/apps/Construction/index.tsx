import { AnalyticsOptions } from '@equinor/Diagrams';
import { createPageViewer } from '../../Core/PageViwer/Api/pageViewerApi';
import { AppApi } from '../apps';
import { tableColumns } from './DetailsPage/tableConfig';
import { Job, mockData } from './mocData/mockData';

const analyticsOptions: AnalyticsOptions<Job> = {
    section2: {
        chart1: {
            type: 'timeBarChart',
            options: {
                title: 'Job Cards',
                defaultTime: 'year',
                timeChartOptions: {
                    categoriesKey: 'jobStatus',
                    title: 'Job Cards',
                    type: 'bar',
                },
            },
        },
    },
};
const detailsPage: AnalyticsOptions<Job> = {
    section1: {
        chart1: {
            type: 'table',
            options: {
                initialGroupBy: 'disciplineDescription',
                columns: tableColumns,
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

export function setup(appApi: AppApi): void {
    // const api = baseClient(appApi.authProvider, [appApi.appConfig.procosys]);
    const construction = createPageViewer({
        viewerId: appApi.shortName,
        title: appApi.title,
    });

    construction.registerFusionPowerBi('swcr-analytics-rls', {
        title: 'SWCR Analytics',
        reportURI: 'swcr-analytics-rls',
    });

    const workPreparation = construction.registerDashboard<Job>('work-preparation', {
        title: 'Work Preparation',
    });

    // Loop Data Test for testing system..
    workPreparation.registerDataSource(async () => {
        // const plantId = 'PCS$JOHAN_CASTBERG';
        // const project = 'L.O532C.002';
        // const response = await api.fetch(
        //     `https://api-lighthouse-production.playground.radix.equinor.com/loops/${plantId}/${project}`
        // );

        // return JSON.parse(await response.text());
        const data = mockData().filter((j) => j.jobStatus.startsWith('E'));
        return data;
    });

    const excludeKeys: (keyof Job)[] = ['job', 'jobName', 'jobEstimatedHours'];

    workPreparation.registerFilterOptions({ excludeKeys });

    workPreparation.registerPage({
        title: 'Jobcards',
        pageId: 'workPreparationJobCards',
        type: 'AnalyticsPage',
        ...analyticsOptions,
    });

    workPreparation.registerPage({
        title: 'Hours',
        pageId: 'workPreparationHours',
        type: 'AnalyticsPage',
        ...analyticsOptions,
    });
    workPreparation.registerPage({
        title: 'Details',
        pageId: 'workPreparationDetails',
        type: 'AnalyticsPage',
        ...detailsPage,
    });
    workPreparation.registerPage({
        title: 'Hold',
        pageId: 'workPreparationDetailsHold',
        type: 'AnalyticsPage',
        ...analyticsOptions,
    });

    construction.registerFusionPowerBi('lci-hanging-gardens', {
        title: 'LCI Hanging Garden',
        reportURI: 'lci-hanging-gardens',
    });
    construction.registerFusionPowerBi('checklist-analytics-rls', {
        title: 'Checklist Analytics',
        reportURI: 'checklist-analytics-rls',
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
