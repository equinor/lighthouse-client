import { ClientApi } from '@equinor/portal-client';

export function setup(appApi: ClientApi): void {
    //const api = baseClient(appApi.authProvider, [appApi.appConfig.procosys]);
    const pbiViewer = appApi.createPowerBiViewer();

    pbiViewer.registerFusionPowerBi({
        reportURI: 'pp-swcr-analytics',
        pages: [
            {
                pageId: 'ReportSectionb937310a77e18f67ff37',
                pageTitle: 'Overview',
                default: true,
            },
            {
                pageId: 'ReportSection272f7d54d84d16689496',
                pageTitle: 'Browser',
            },
            {
                pageId: 'ReportSection0cb62244235c033e5151',
                pageTitle: 'History',
            },
        ],
    });
}
