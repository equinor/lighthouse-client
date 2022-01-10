import { ClientApi } from '@equinor/app-builder';
import { AnalyticsOptions } from '@equinor/Diagrams';
import { baseClient } from '../../../packages/httpClient/src';
import { createPageViewer } from '../../Core/PageViewer/Api/pageViewerApi';

type LoopStatus = 'OK' | 'PA' | 'PB' | 'OS';
interface Checklist {
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

export interface WP {
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
    contentChecklists: Checklist[];
    functionTags: string[];
}

const analyticsOptions: AnalyticsOptions<WP> = {
    section2: {
        chart1: {
            type: 'timeBarChart',
            options: {
                title: 'Loops Created',
                defaultTime: 'year',
                timeChartOptions: {
                    categoriesKey: 'createdAt',
                    title: 'Created',
                    type: 'bar',
                },
            },
        },
    },
};
const analyticsOptions2: AnalyticsOptions<WP> = {
    section2: {
        chart1: {
            type: 'barChart',
            options: {
                stacked: true,
                nameKey: 'status',
                categoryKey: 'responsible',
                colors: ['#F44336', '#E91E63', '#9C27B0'],
            },
        },
        chart2: {
            type: 'timeBarChart',
            options: {
                title: 'Punch A',
                defaultTime: 'quarter',
                timeChartOptions: {
                    categoriesKey: 'createdAt',
                    title: 'PB',
                    type: 'bar',
                    key: 'status',
                    value: 'PB',
                },
            },
        },
    },
};

export function setup(appApi: ClientApi): void {
    const api = baseClient(appApi.authProvider, [appApi.appConfig.procosys]);
    const commissioning = createPageViewer({
        viewerId: appApi.shortName,
        title: appApi.title,
    });

    commissioning.registerFusionPowerBi('swcr-analytics-rls', {
        title: 'SWCR Analytics',
        reportURI: 'swcr-analytics-rls',
    });

    // const workPreparation = commissioning.registerDashboard<WP>('work-preparation', {
    //     title: 'Work Preparation',
    // });

    // // Loop Data Test for testing system..
    // workPreparation.registerDataSource(async () => {
    //     const plantId = 'PCS$JOHAN_CASTBERG';
    //     const project = 'L.O532C.002';
    //     const response = await api.fetch(
    //         `https://api-lighthouse-production.playground.radix.equinor.com/loops/${plantId}/${project}`
    //     );

    //     return JSON.parse(await response.text());
    // });

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
    Remove LCI hanging garden, since its not relevant for Commissioning
    */
    // construction.registerFusionPowerBi('lci-hanging-gardens', {
    //     title: 'LCI Hanging Garden',
    //     reportURI: 'lci-hanging-gardens',
    // });
    commissioning.registerFusionPowerBi('jca-checklist', {
        title: 'Checklist Analytics',
        reportURI: 'jca-checklist',
    });
    commissioning.registerFusionPowerBi('ec2496e8-e440-441c-8e20-73d3a9d56f74', {
        title: 'Punch Analytics',
        reportURI: 'punch-analytics-rls',
    });

    /** 
    Remove LCI hanging garden, since its not relevant for Commissioning
    */
    // construction.registerFusionPowerBi('fd4052a9-641b-47b4-92d6-4876ecb8cdba', {
    //     title: 'WO Analytics',
    //     reportURI: 'wo-analytics-rls',
    // });
}
