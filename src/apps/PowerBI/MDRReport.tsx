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
    {
        values: ['JCA'],
        target: {
            column: 'FACILITY',
            table: 'Commpkg',
        },
        operator: 'In',
    },
];

export function setup(appApi: ClientApi): void {
    appApi.createPowerBiViewer().registerFusionPowerBi({
        reportURI: 'pp-mdr',
        loadPagesInDev: true,
        filter,
        pages: [{ pageTitle: 'Home', pageId: 'ReportSection', default: true }],
    });
}
