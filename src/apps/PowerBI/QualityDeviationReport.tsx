import { Filter } from '@equinor/lighthouse-powerbi';
import { ClientApi } from '@equinor/portal-client';

const filter: Filter[] = [
    {
        values: ['Johan Castberg'],
        target: {
            table: 'Dim_MasterProject',
            column: 'Project',
        },
        operator: 'In',
    },
];

export function setup(appApi: ClientApi): void {
    appApi.createPowerBiViewer().registerFusionPowerBi({
        reportURI: 'pp-quality-deviation',
        filter,
        pages: [
            { pageTitle: 'Overview', pageId: 'ReportSection0dc37ca61f11571959bb', default: true },
            { pageTitle: 'Case status', pageId: 'ReportSectionf598b19fc043be197b5a' },
            { pageTitle: 'Action overivew', pageId: 'ReportSection8032b2e09554085cbece' },
            { pageTitle: 'Overdue action ', pageId: 'ReportSectiond03fbcb3a1e91b9829e1' },
        ],
    });
}
