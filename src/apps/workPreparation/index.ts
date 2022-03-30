import { ClientApi } from '@equinor/portal-client';

export function setup(appApi: ClientApi): void {
    appApi.createPowerBiViewer().registerFusionPowerBi({
        reportURI: 'pp-work-preparation',
        loadPagesInDev: true,
        pages: [
            {
                pageTitle: 'Work Orders',
                pageId: 'ReportSection38b3cbde944b8fbd8957',
                default: true,
            },
            { pageTitle: 'Details', pageId: 'ReportSectionafbe7fe1c26d05481055' },
            { pageTitle: 'MIPS vs Procosys', pageId: 'ReportSection59811ef626a9b5b03b1d' },
        ],
    });
}
