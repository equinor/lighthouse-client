import { ClientApi, httpClient } from '@equinor/lighthouse-portal-client';
import { Loop } from './types/loop';
import {
  filterConfig,
  gardenConfig,
  sidesheetConfig,
  statusBarConfig,
  tableConfig,
} from './utility/config';

async function responseAsync(signal?: AbortSignal | undefined): Promise<Response> {
  const { FAM } = httpClient();
  return await FAM.fetchAsync(
    'v1/typed/Completion/Custom_LoopMCCRv1/facility/JCA?view-version=v1',
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
      signal,
    }
  );
}

export function setup(addApi: ClientApi): void {
  addApi
    .createWorkSpace<Loop>({
      customSidesheetOptions: sidesheetConfig('WorkspaceSideSheet'),
      objectIdentifier: 'checklistId',
    })
    .registerDataSource({
      responseAsync: responseAsync,
    })
    .registerSearchOptions([
      { name: 'Loop tag', valueFormatter: (pkg) => pkg.loopNo },
      { name: 'Cmpkg', valueFormatter: (pkg) => pkg.commissioningPackageNo ?? '' },
      { name: 'MCpkg', valueFormatter: (pkg) => pkg.mechanicalCompletionPackageNo ?? '' },
      { name: 'Description', valueFormatter: (pkg) => pkg.description ?? '' },
    ])
    .registerTableOptions(tableConfig)
    .registerGardenOptions(gardenConfig)
    .registerFilterOptions(filterConfig)
    .registerStatusItems(statusBarConfig)
    .registerPowerBIOptions({
      reportURI: 'pp-loop-analytics',
    });
}
