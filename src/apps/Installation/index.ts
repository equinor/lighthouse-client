import { ClientApi } from '@equinor/portal-client';

export function setup(appApi: ClientApi): void {
        appApi.createPowerBiViewer().registerFusionPowerBi({
            reportURI: 'pp-installation',
            pages: [
                {
                    pageTitle: 'Activities',
                    pageId: 'ReportSection5c5045fd15e060150c0c',
                    default: true,
                },
                { pageTitle: 'Progress status', pageId: 'ReportSection2b14a391a5753045d445' },
                { pageTitle: 'Live vs Baseline', pageId: 'ReportSection4d3221e819e1828e24a0' },
                { pageTitle: 'Work Orders', pageId: 'ReportSection6fc486f6b9cc85714c69' },
                { pageTitle: '6 weeks look ahead', pageId: 'ReportSectionadfc6ba1044c3639ee9e' },
                { pageTitle: 'Objects', pageId: 'ReportSection841454822b1bc9b95dc3' },
                { pageTitle: 'Cable', pageId: 'ReportSection1d9a32816d55fefe1921' },
                { pageTitle: 'Spools', pageId: 'ReportSectionb4b0b670d66fe872d75d' },
                { pageTitle: 'Insulation', pageId: 'ReportSection01bfbe9f4adb75281239' },
            ],
        });
}
