import { ClientApi } from '../../Core/Client/Types';

export function setup(appApi: ClientApi): void {
    appApi.createPowerBiViewer().registerFusionPowerBi({
        reportURI: 'pp-safety-performance-dashboard',
        loadPagesInDev: true,
        pages: [
            {
                pageTitle: 'Lagging indicators',
                pageId: 'ReportSectionae3c58778bdf1763035e',
                default: true,
            },
            { pageTitle: 'SI', pageId: 'ReportSection797a09f1a5be0ed1c3d9' },
            { pageTitle: 'TRI', pageId: 'ReportSection8c62261345fb4f715666' },
            { pageTitle: 'FO', pageId: 'ReportSectioneb3faa5fe8c76f38e5be' },
            { pageTitle: 'WCI', pageId: 'ReportSection37780c9d81bf0fd3e90a' },
            { pageTitle: 'Overdue actions', pageId: 'ReportSection74ad364f0413fa24c8aa' },
            { pageTitle: 'Perfect HSE calendar', pageId: 'ReportSectionb3201e3d8e3b8c339836' },
            { pageTitle: 'Working Hours', pageId: 'ReportSectionfaff284ae5fcaf6772ba' },
            { pageTitle: 'WRI', pageId: 'ReportSection0e02d7e255a9c27e7572' },
            { pageTitle: 'LSR', pageId: 'ReportSectione599871e7ea06ac79f65' },
        ],
    });
}
