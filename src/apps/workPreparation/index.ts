import { ClientApi } from '@equinor/lighthouse-portal-client';

export function setup(appApi: ClientApi): void {
    appApi.createPowerBiViewer().registerFusionPowerBi({
        reportURI: 'pp-work-preparation',
        pages: [
            {
                pageTitle: 'Work Orders',
                pageId: 'ReportSection38b3cbde944b8fbd8957',
                default: true,
            },
            { pageTitle: 'Details', pageId: 'ReportSectionafbe7fe1c26d05481055' },
            { pageTitle: 'Scope change development', pageId: 'ReportSection14d3bd99db2c220090b5' },
            { pageTitle: 'Data quality', pageId: 'ReportSection016b4d6cc8e64de1fc56' },
            { pageTitle: 'MIPS vs Procosys', pageId: 'ReportSection59811ef626a9b5b03b1d' },
        ],
    });
}
