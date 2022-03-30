import { ClientApi } from '@equinor/portal-client';

export function setup(appApi: ClientApi): void {
    appApi
        .createPowerBiViewer()
        .registerFusionPowerBi({
            reportURI: 'pp-installation-activities',
            pages: [
                { pageTitle: 'Activities', pageId: 'ReportSection', default: true },
                { pageTitle: 'Progress Status', pageId: 'ReportSection1bfb8548a2e154dc3640' },
                // { pageTitle: 'Plan', pageId: 'ReportSection5b84ed4e7bba01fc9a74' }, May come in the future!
            ],
        })
        .registerFusionPowerBi({
            reportURI: 'pp-installation-wo',
            pages: [
                { pageTitle: 'Work Orders', pageId: 'ReportSectiondfe074970b1393336062' },
                { pageTitle: '6 Weeks look ahead', pageId: 'ReportSection7a57e8ada89d00923d89' },
            ],
        })
        .registerFusionPowerBi({
            reportURI: 'pp-installation-objects',
            pages: [
                { pageTitle: 'Objects', pageId: 'ReportSection841454822b1bc9b95dc3' },
                { pageTitle: 'Cable', pageId: 'ReportSection1d9a32816d55fefe1921' },
                { pageTitle: 'Spools', pageId: 'ReportSectionb4b0b670d66fe872d75d' },
                { pageTitle: 'ISO', pageId: 'ReportSection01bfbe9f4adb75281239' },
            ],
        });
}
