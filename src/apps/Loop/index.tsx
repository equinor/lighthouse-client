import { ClientApi, httpClient } from '@equinor/lighthouse-portal-client';
import { Loop } from './types/loop';
import { filterConfig, gardenConfig, sidesheetConfig, tableConfig } from './utility/config';

async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
    const { FAM } = httpClient();
    return await FAM.post('v0.1/dynamic/completion/custom_loopmccr/JCA', {
        body: JSON.stringify({}),
        signal,
    });
}

export function setup(addApi: ClientApi): void {
    addApi
        .createWorkSpace<Loop>({
            customSidesheetOptions: sidesheetConfig('WorkspaceSideSheet'),
            objectIdentifier: 'checklistId',
        })
        .registerDataSource({ responseAsync: responseAsync })
        .registerSearchOptions([
            { name: 'Checklist ID', valueFormatter: (pkg) => pkg.checklistId },
            { name: 'Cmpkg', valueFormatter: (pkg) => pkg.commissioningPackageNo ?? '' },
            { name: 'MCpkg', valueFormatter: (pkg) => pkg.mechanicalCompletionPackageNo ?? '' },
        ])
        .registerTableOptions(tableConfig)
        .registerGardenOptions(gardenConfig)
        .registerFilterOptions(filterConfig)
        .registerPowerBIOptions({
            reportURI: 'pp-loop-analytics',
            pages: [
                {
                    pageTitle: 'MCCR overview',
                    pageId: 'ReportSection32a24477ad9f4a9aaa2f',
                    default: true,
                },
                {
                    pageTitle: 'History',
                    pageId: 'ReportSection80f235578613a69873e1',
                },
            ],
        });
}
