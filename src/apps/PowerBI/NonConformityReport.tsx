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

// Todo: get globalIdentifier from Jone
export function setup(appApi: ClientApi): void {
    appApi.createPowerBiViewer().registerFusionPowerBi({
        reportURI: '43116078-6fc0-47c4-8f3b-880faacf5ea0',
        loadPagesInDev: true,
        filter,
        pages: [{ pageTitle: 'Home', pageId: 'ReportSection', default: true }],
    });
}
