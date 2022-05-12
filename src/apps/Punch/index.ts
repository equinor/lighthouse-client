import { ClientApi } from '@equinor/lighthouse-portal-client';

export function setup(appApi: ClientApi): void {
    appApi.createPowerBiViewer().registerFusionPowerBi({
        reportURI: 'pp-punch-analytics',
        pages: [
            { pageTitle: 'Overview', pageId: 'ReportSectionb937310a77e18f67ff37', default: true },
            { pageTitle: 'Details', pageId: 'ReportSectiond274d4c19774cb67678e' },
            { pageTitle: 'Browser', pageId: 'ReportSection324db9254a87a5d98229' },
            { pageTitle: 'History', pageId: 'ReportSection154e415914510b3eb1b1' },
        ],
    });
}
