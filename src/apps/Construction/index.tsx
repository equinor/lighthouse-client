import { AnalyticsOptions } from '@equinor/Diagrams';
import { baseClient } from '@equinor/http-client';
import { ClientApi } from '@equinor/portal-client';
import { openSidesheet } from '@equinor/sidesheet';
import {
    cols,
    ConstructionVisual,
    CriticalWoTable,
    SidesheetContent,
    themeColors,
} from './Components';
import { WorkOrder } from './Types';
import { weekDiff } from './Utils';

const analyticsOptions: AnalyticsOptions<WorkOrder> = {
    section1: {
        chart1: {
            type: 'customVisual',
            options: {
                component: ConstructionVisual,
                componentProps: { title: 'Job Statuses' },
            },
        },
    },
    section2: {
        chart1: {
            type: 'horizontalBarChart',
            options: {
                categoryKey: 'discipline',
                nameKey: 'discipline',
                title: 'Grouped job cards',
                enableGroupBy: true,
                onClick: (data, graphData, groupByKey) => {
                    const labelClicked = graphData.globals.labels[graphData.dataPointIndex];
                    const tableData: WorkOrder[] = [];
                    data.forEach((wo) => {
                        wo[groupByKey] === labelClicked && tableData.push(wo);
                    });

                    tableData.length > 0 && openSidesheet(SidesheetContent, { data: tableData });
                },
                colors: [...themeColors.bar],
            },
        },
        chart2: {
            type: 'customVisual',
            options: {
                component: CriticalWoTable,
                componentProps: { enableGrouping: true, initialGroupBy: 'discipline' },
            },
        },
        // chart3: {
        //     type: 'customVisual',
        //     options: {
        //         component: CriticalWoTable,
        //         componentProps: { enableGrouping: true, initialGroupBy: 'discipline' },
        //     },
        // },
    },
};
const detailsPage: AnalyticsOptions<WorkOrder> = {
    section1: {
        chart1: {
            type: 'table',
            options: {
                initialGroupBy: 'discipline',
                columns: cols,
            },
        },
    },
};

export function setup(appApi: ClientApi): void {
    const api = baseClient(appApi.authProvider, [appApi.appConfig.scope.FAM]);
    const construction = appApi.createPageViewer();

    /** 
    Remove SWCR analytics, since its not relevant for Construction
    */

    const workPreparation = construction.registerDashboard<WorkOrder>('work-preparation', {
        title: 'Work Preparation',
    });

    // Loop Data Test for testing system..
    workPreparation.registerDataSource(async () => {
        // const plantId = 'PCS$JOHAN_CASTBERG';
        // const project = 'L.O532C.002';
        const response: WorkOrder[] = await api
            .fetch(
                `https://fam-synapse-api-dev.azurewebsites.net/v0.1/procosys/completionworkorderswithcutoff/JCA`,
                {
                    method: 'POST',
                    body: JSON.stringify({}),
                }
            )
            .then((res) => res.json());

        return response;
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
                tooltipContent:
                    'Workorders that have status W01, W02 or W03 and it is six weeks or less until planned start date',
                value: () => {
                    // critical WO: Workorder which havent reached status W04
                    // and 1 week left until plannedStartAtDate

                    //Find all workorders that have status W01, W02 or W03

                    const filter = ['W01', 'W02', 'W03'];
                    const firstFiltered = data.filter((wo) => filter.includes(wo.jobStatus ?? ''));

                    // Find all the first filtered WOs that are due in one week or less

                    const secondFiltered = firstFiltered.filter(
                        (wo) => weekDiff(new Date(wo.plannedStartupDate ?? new Date())).days <= 42
                    );

                    return secondFiltered.length.toString();
                },
            },
            {
                status: 'ok',
                title: 'Job cards in W04',
                value: () => {
                    return data.filter((wo) => wo.jobStatus === 'W04').length.toString();
                },
            },
        ];
    });

    // const excludeKeys: (keyof WorkOrder)[] = [];

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

    workPreparation.registerPage({
        title: 'Details',
        pageId: 'workPreparationDetails',
        type: 'AnalyticsPage',
        ...detailsPage,
    });

    /** 
    Remove LCI hanging garden, since its not relevant for Construction
    */
    // construction.registerFusionPowerBi('lci-hanging-gardens', {
    //     title: 'LCI Hanging Garden',
    //     reportURI: 'lci-hanging-gardens',
    // });
    construction.registerFusionPowerBi('jca-installation', {
        title: 'Installation',
        reportURI: 'jca-installation',
        options: {
            showFilter: true,
            enablePageNavigation: false,
        },
    });
    construction.registerFusionPowerBi('jca-checklist', {
        title: 'Checklists',
        reportURI: 'jca-checklist',
    });
    construction.registerFusionPowerBi('jca-punch-analytics', {
        title: 'Punch',
        reportURI: 'jca-punch-analytics',
    });
    construction.registerFusionPowerBi('jca-handover-analytics', {
        title: 'Handover',
        reportURI: 'jca-handover-analytics',
    });

    /**
     * Does not contain JC data yet.
     */
    // construction.registerFusionPowerBi('fd4052a9-641b-47b4-92d6-4876ecb8cdba', {
    //     title: 'WO Analytics',
    //     reportURI: 'wo-analytics-rls',
    // });
}
