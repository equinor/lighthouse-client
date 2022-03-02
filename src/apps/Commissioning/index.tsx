import { AnalyticsOptions } from '@equinor/Diagrams';
import { ClientApi } from '@equinor/portal-client';

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
    //const api = baseClient(appApi.authProvider, [appApi.appConfig.procosys]);
    const pages = appApi.createPageViewer();

    pages.registerFusionPowerBi('pp-swcr-analytics', {
        title: 'SWCR Analytics',
        reportURI: 'pp-swcr-analytics',
    });

    pages.registerFusionPowerBi('pp-installation', {
        title: 'Installation',
        reportURI: 'pp-installation',
    });
    pages.registerFusionPowerBi('jca-handover-analytics', {
        title: 'Handover',
        reportURI: 'jca-handover-analytics',
    });
    pages.registerFusionPowerBi('pp-checklist-analytics', {
        title: 'Checklist Analytics',
        reportURI: 'pp-checklist-analytics',
    });
    pages.registerFusionPowerBi('pp-punch-analytics', {
        title: 'Punch',
        reportURI: 'pp-punch-analytics',
    });

    /** 
    Remove LCI hanging garden, since its not relevant for Commissioning
    */
    // construction.registerFusionPowerBi('fd4052a9-641b-47b4-92d6-4876ecb8cdba', {
    //     title: 'WO Analytics',
    //     reportURI: 'wo-analytics-rls',
    // });
}
