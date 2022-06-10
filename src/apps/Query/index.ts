import { ClientApi } from '@equinor/lighthouse-portal-client';

export function setup(appApi: ClientApi): void {
    appApi.createPowerBiViewer().registerFusionPowerBi({
        reportURI: 'pp-query-analytics',
        pages: [
            {
                pageTitle: 'Overview',
                pageId: 'ReportSectionb937310a77e18f67ff37',
                default: true,
            },
            {
                pageTitle: 'Browser',
                pageId: 'ReportSection272f7d54d84d16689496',
            },
            {
                pageTitle: 'History',
                pageId: 'ReportSection0cb62244235c033e5151',
            },
        ],
    });
}
