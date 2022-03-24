import { ClientApi } from '@equinor/portal-client';

export function setup(appApi: ClientApi): void {
    //const api = baseClient(appApi.authProvider, [appApi.appConfig.procosys]);
    const pbiViewer = appApi.createPowerBiViewer();

    pbiViewer.registerFusionPowerBi({
        reportURI: 'pp-swcr-analytics',
        pages: [
            {
                pageId: 'overview',
                pageTitle: 'Overview',
            },
            {
                pageId: 'browser',
                pageTitle: 'Browser',
            },
            {
                pageId: 'History',
                pageTitle: 'History',
            },
        ],
    });
}
