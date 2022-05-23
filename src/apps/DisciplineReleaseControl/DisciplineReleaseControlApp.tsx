import { ClientApi } from '@equinor/lighthouse-portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
import { GatewaySidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { statusBarConfig } from './Components/StatusBar/statusBarConfig';
import {
    htResolverFunction,
    rcResolverFunction,
    ReleaseControlHTSidesheetWidgetComponent,
    ReleaseControlHTSidesheetWidgetManifest,
    ReleaseControlSidesheetWidgetComponent,
    ReleaseControlSidesheetWidgetManifest
} from './DisciplineReleaseControlWidgets';
import { chewPipetestDataFromApi } from './Functions/statusHelpers';
import { Pipetest } from './Types/pipetest';
import { filterConfig, gardenConfig, presetConfig, tableConfig } from './WorkspaceConfig';

export function setup({ createWorkSpace }: ClientApi): void {
    const responseAsync = async (signal?: AbortSignal): Promise<Response> => {
        const { FAM } = httpClient();
        return await FAM.fetch(`/v0.1/procosys/pipetest/JCA`, { signal: signal });
    };

    const responseParser = async (response: Response) => {
        let json = JSON.parse(await response.text());
        json = chewPipetestDataFromApi(json);
        return json;
    };

    createWorkSpace<Pipetest, 'rc'>({
        CustomSidesheet: GatewaySidesheet,
        customSidesheetOptions: {
            ...ReleaseControlSidesheetWidgetManifest,
            ...ReleaseControlSidesheetWidgetComponent,
            resolver: rcResolverFunction,
        },
        customGroupeSidesheet: {
            ...ReleaseControlHTSidesheetWidgetComponent,
            ...ReleaseControlHTSidesheetWidgetManifest,
            resolver: htResolverFunction,
        },
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
        .registerStatusItems(statusBarConfig);
}
