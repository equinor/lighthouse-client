import { ClientApi } from '@equinor/lighthouse-portal-client';

export function setup(appApi: ClientApi): void {
    appApi.createPowerBiViewer().registerFusionPowerBi({
        reportURI: 'pp-installation',
        pages: [
            {
                pageTitle: 'Activities',
                pageId: 'ReportSection7fa1104dd57538080e7d',
                default: true,
            },
            {
                pageTitle: 'Progress status',
                pageId: 'ReportSection2b14a391a5753045d445',
            },
            {
                pageTitle: 'Live vs Baseline',
                pageId: 'ReportSection4d3221e819e1828e24a0',
            },
            {
                pageTitle: 'Work Orders',
                pageId: 'ReportSection491eb607dd807d75ee09',
            },
            {
                pageTitle: '6 weeks look ahead',
                pageId: 'ReportSectionadfc6ba1044c3639ee9e',
            },
            {
                pageTitle: 'Objects',
                pageId: 'ReportSection841454822b1bc9b95dc3',
            },
            {
                pageTitle: 'Cable',
                pageId: 'ReportSection1d9a32816d55fefe1921',
            },
            {
                pageTitle: 'Spools',
                pageId: 'ReportSectionb4b0b670d66fe872d75d',
            },
            {
                pageTitle: 'Insulation',
                pageId: 'ReportSection01bfbe9f4adb75281239',
            },
        ],
    });
}
