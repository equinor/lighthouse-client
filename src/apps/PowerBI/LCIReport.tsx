import { ClientApi } from '@equinor/portal-client';

export function setup(appApi: ClientApi): void {
    appApi.createPowerBiViewer().registerFusionPowerBi({
        reportURI: 'pp-lci-hanging-garden',
        loadPagesInDev: true,
        pages: [{ pageTitle: 'Home', pageId: 'ReportSection', default: true }],
    });
}
