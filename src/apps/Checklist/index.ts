import { ClientApi } from '@equinor/portal-client';

export function setup(appApi: ClientApi): void {
    appApi.createPowerBiViewer().registerFusionPowerBi({
        reportURI: 'pp-checklist-analytics',
        pages: [
            { pageTitle: 'Overview', pageId: 'ReportSection2e92f2b5eed237523256', default: true },
            { pageTitle: 'Details', pageId: 'ReportSection47ea3f4574446a5a73c9' },
            { pageTitle: 'Browser', pageId: 'ReportSection08bd3cdd956d8e1b1065' },
            { pageTitle: 'History', pageId: 'ReportSection1d9ec2a98c07f646086b' },
            { pageTitle: 'Countdown', pageId: 'ReportSection72f67800d1e526e323bb' },
        ],
    });
}
