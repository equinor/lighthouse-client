import { ClientApi } from '@equinor/lighthouse-portal-client';
import { generateCommaSeperatedStringArrayColumn } from '@equinor/Table';
import { htSidesheetCreator, rcSidesheetCreator } from './DisciplineReleaseControlWidgets';
import { Pipetest } from './Types/pipetest';
import {
  filterConfig,
  gardenConfig,
  presetConfig,
  responseAsync,
  responseParser,
  statusBarConfig,
  tableConfig,
} from './utils/config';

export function setup(appApi: ClientApi): void {
  appApi
    .createWorkSpace<Pipetest, 'pt'>({
      customSidesheetOptions: rcSidesheetCreator('WorkspaceSideSheet') as any,
      customGroupeSidesheet: htSidesheetCreator('WorkspaceSideSheet') as any,
      objectIdentifier: 'name',
      defaultTab: 'garden',
    })
    .registerDataSource({
      responseAsync: responseAsync,
      responseParser: responseParser,
    })
    .registerFilterOptions(filterConfig)
    .registerTableOptions(tableConfig)
    .registerGardenOptions(gardenConfig)
    .registerPresets(presetConfig)
    .registerSearchOptions([
      { name: 'Id', valueFormatter: ({ name }) => name },
      {
        name: 'Description',
        valueFormatter: ({ description }) => description,
      },
      {
        name: 'HT cable',
        valueFormatter: ({ heatTraces }) =>
          generateCommaSeperatedStringArrayColumn(heatTraces.map((x) => x.tagNo)),
      },
    ])
    .registerStatusItems(statusBarConfig)
    .registerPowerBIOptions({
      reportURI: 'pp-pipetest-analytics',
    });
}
