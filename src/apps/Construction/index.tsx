import { AnalyticsOptions } from '@equinor/Diagrams';
import { baseClient } from '../../../packages/httpClient/src';
import { createPageViewer } from '../../Core/PageViewer/Api/pageViewerApi';
import { AppApi } from '../apps';
import { cols } from './DetailsPage/tableConfig';
import { Job, mockData } from './mocData/mockData';
import { newMock } from './mocData/newMock';

const analyticsOptions: AnalyticsOptions<Job> = {
    section1: {
        // chart1: {
        //     type: 'horizontalBarChart',
        //     options: {
        //         nameKey: 'disciplineDescription',
        //         categoryKey: 'disciplineDescription',
        //     } as HorizontalBarChartOptions<Job>,
        // },
        chart1: {
            type: 'timeBarChart',
            options: {
                timeChartOptions: {
                    categoriesKey: 'jobStatuses',
                    title: 'Job Statuses',
                    type: 'column',
                },
                dateAccessor: 'weekUpdated',
                title: 'Job Statuses',
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

export function setup(appApi: AppApi): void {
    const api = baseClient(appApi.authProvider, [appApi.appConfig.fusion]);
    const construction = createPageViewer({
        viewerId: appApi.shortName,
        title: appApi.title,
    });

    /** 
    Remove SWCR analytics, since its not relevant for Construction
    */

    const workPreparation = construction.registerDashboard<Job>('work-preparation', {
        title: 'Work Preparation',
    });

    // Loop Data Test for testing system..
    workPreparation.registerDataSource(async () => {
        const plantId = 'PCS$JOHAN_CASTBERG';
        const project = 'L.O532C.002';
        const response = await api.fetch(
            `https://pro-s-dataproxy-ci.azurewebsites.net/api/contexts/71db33bb-cb1b-42cf-b5bf-969c77e40931/work-orders`
        );

        return JSON.parse(await response.text());
        // const data = newMock().filter((j) => j.jobStatus.startsWith('E'));
        // return newMock();
    });

    const excludeKeys: (keyof Job)[] = ['job', 'jobName', 'jobEstimatedHours'];

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

    // workPreparation.registerPage({
    //     title: 'Jobcards',
    //     pageId: 'workPreparationJobCards',
    //     type: 'AnalyticsPage',
    //     ...analyticsOptions,
    // });

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
    //     ...analyticsOptions,
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
