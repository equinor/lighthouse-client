import { ClientApi } from '@equinor/lighthouse-portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
import { PowerBiOptions } from '../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { statusBarConfig } from './Components/StatusBar/statusBarConfig';
import { htSidesheetCreator, rcSidesheetCreator } from './DisciplineReleaseControlWidgets';
import { chewPipetestDataFromApi } from './Functions/statusHelpers';
import { Pipetest } from './Types/pipetest';
import { filterConfig, gardenConfig, presetConfig, tableConfig } from './WorkspaceConfig';

export const responseAsync = async (signal?: AbortSignal): Promise<Response> => {
    const { FAM } = httpClient();
    return await FAM.fetch(`/v0.1/procosys/pipetest/JCA`, { signal });
};

export const responseParser = async (response: Response) => {
    let json = JSON.parse(await response.text());
    json = chewPipetestDataFromApi(json);
    return json;
};
export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<Pipetest, 'pt'>({
            customSidesheetOptions: rcSidesheetCreator('WorkspaceSideSheet'),
            customGroupeSidesheet: htSidesheetCreator('WorkspaceSideSheet'),
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
        .registerSearchOptions([{ name: 'Id', valueFormatter: ({ name }) => name }])
        .registerStatusItems(statusBarConfig)
        .registerPowerBIOptions(
            !appApi.isProduction
                ? {
                      reportURI: 'pp-pipetest-analytics',
                      pages: [
                          {
                              pageId: 'ReportSection',
                              pageTitle: 'Piping',
                              default: true,
                          },
                          {
                              pageId: 'ReportSectionc67bd7a96a9bd5b9c037',
                              pageTitle: 'Piping handover',
                          },
                          {
                              pageId: 'ReportSectionfea0083e762e0a19043e',
                              pageTitle: 'HT and insulation',
                          },
                          {
                              pageId: 'ReportSectionbe3007f9d330ed4572b0',
                              pageTitle: 'HT and insulation handover',
                          },
                          {
                              pageId: 'ReportSectionc4bf0e016576ca5eb4ac',
                              pageTitle: 'Boxes',
                          },
                      ],
                  }
                : (undefined as unknown as PowerBiOptions)
        );
}
