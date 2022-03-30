import { ClientApi } from '@equinor/portal-client';

export function setup(appApi: ClientApi): void {
    appApi.createPowerBiViewer().registerFusionPowerBi({
        reportURI: 'pmt-non-confidential',
        pages: [{ pageTitle: 'Activities', pageId: 'ReportSection', default: true }],
    });
}
