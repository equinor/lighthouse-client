import { ClientApi, getFusionContextId, httpClient } from '@equinor/lighthouse-portal-client';
import { setupWorkspaceSidesheet } from '@equinor/WorkSpace';
import { HandoverSideSheet } from './Garden/components/HandoverSidesheet';
import { HandoverGroupByView } from './Garden/CustomViews';
import HandoverGardenHeader from './Garden/CustomViews/HandoverGardenHeader';
import HandoverGardenItem from './Garden/CustomViews/HandoverGardenItem/HandoverGardenItem';
import { HandoverCustomGroupByKeys, HandoverPackage } from './Garden/models';
import {
  fieldSettings,
  getHighlightedColumn,
  getItemWidth,
  getMaxVolumeFromData,
  sortPackagesByStatus,
} from './Garden/utility';
import { filterConfig } from './utility/config/filterSetup';
import { statusBarConfig } from './utility/config/statusBarConfig';
import { tableConfig } from './utility/config/tableConfig';

const creator = setupWorkspaceSidesheet<HandoverPackage, 'handoverDetails'>({
  id: 'handoverDetails',
  color: '#0084C4',
  component: HandoverSideSheet,
  props: {
    objectIdentifier: 'id',
    parentApp: 'handover',
    function: async (id: string) => {
      const items = await responseParser(await responseAsync());
      const result = items.find((item) => item.id === id);
      return result ? result : items.find((item) => item.commpkgNo === id);
    },
  },
});

export const handoverCreatorManifest = creator('SidesheetManifest');
export const handoverCreatorComponent = creator('SidesheetComponentManifest');
export const handoverResolverFunction = creator('ResolverFunction');

export function setup(appApi: ClientApi): void {
  const initialCustomGroupByKeys: HandoverCustomGroupByKeys = {
    weeklyDaily: 'Weekly',
    plannedForecast: 'Forecast',
  };
  appApi
    .createWorkSpace<HandoverPackage>({
      customSidesheetOptions: creator('WorkspaceSideSheet'),
      objectIdentifier: 'id',
      defaultTab: 'garden',
    })
    .registerDataSource({
      responseAsync,
      responseParser,
    })
    .registerFilterOptions(filterConfig)
    .registerTableOptions(tableConfig)
    .registerGardenOptions({
      gardenKey: 'RFCC' as keyof HandoverPackage, // HOW to handled this ????
      itemKey: 'commpkgNo',
      objectIdentifier: 'id',
      fieldSettings: fieldSettings,
      customGroupByKeys: initialCustomGroupByKeys,
      customViews: {
        customGroupByView: HandoverGroupByView,
        customItemView: HandoverGardenItem,
        customHeaderView: HandoverGardenHeader,
      },
      rowHeight: 30,
      itemWidth: getItemWidth,
      highlightColumn: getHighlightedColumn,
      customStateFunction: (data) => ({ maxVolume: getMaxVolumeFromData(data) }),
    })
    .registerSearchOptions([
      { name: 'Id', valueFormatter: ({ commpkgNo }) => commpkgNo },
      { name: 'Title', valueFormatter: ({ description }) => description },
    ])
    .registerStatusItems(statusBarConfig)
    .registerPowerBIOptions({
      reportURI: 'pp-handover-analytics',
    });
}

async function responseParser(response: Response) {
  const parsedResponse = JSON.parse(await response.text()) as HandoverPackage[];
  return parsedResponse.sort(sortPackagesByStatus);
}

async function responseAsync(signal?: AbortSignal): Promise<Response> {
  const { fusionDataproxy } = httpClient();
  const contextId = getFusionContextId();
  return await fusionDataproxy.fetch(`/api/contexts/${contextId}/handover/`, { signal: signal });
}
