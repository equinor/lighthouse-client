import { ClientApi } from '@equinor/lighthouse-portal-client';

export function setup(appApi: ClientApi): void {
    appApi.createPowerBiViewer().registerFusionPowerBi({
        reportURI: 'pp-checklist-analytics',
        pages: [
            {
                pageTitle: 'Overview',
                pageId: 'ReportSection',
                default: true,
            },
            {
                pageTitle: 'Details',
                pageId: 'ReportSection7d89d280053cabea0305',
            },
            {
                pageTitle: 'Browser',
                pageId: 'ReportSectionc240c3a6d43e1c6eaa5d',
            },
            {
                pageTitle: 'History',
                pageId: 'ReportSection9a767f5a55081a56cd35',
            },
            {
                pageTitle: 'Countdown',
                pageId: 'ReportSection618c15d65d0023b3d0da',
            },
            {
                pageTitle: 'Look ahead',
                pageId: 'ReportSection7b04540d120b303d280e',
            },
        ],
    });
}
