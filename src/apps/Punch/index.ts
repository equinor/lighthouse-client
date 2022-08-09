import { ClientApi } from '@equinor/lighthouse-portal-client';

export function setup(appApi: ClientApi): void {
    appApi.createPowerBiViewer().registerFusionPowerBi({
        reportURI: 'pp-punch-analytics',
        pages: [
            {
                pageTitle: 'Overview',
                pageId: 'ReportSection',
                default: true,
            },
            {
                pageTitle: 'Details',
                pageId: 'ReportSection43401c24820f8881635c',
            },
            {
                pageTitle: 'Browser',
                pageId: 'ReportSection97c25bc44148e1cacb66',
            },
            {
                pageTitle: 'History',
                pageId: 'ReportSectionaba81600abac15ec319d',
            },
            {
                pageTitle: 'Look ahead',
                pageId: 'ReportSection4c3b20decb1700dd509b',
            },
        ],
    });
}
