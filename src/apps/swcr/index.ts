import { ClientApi, getFusionContextId, httpClient } from '@equinor/lighthouse-portal-client';
import SwcrHeaderView from './CustomViews/SwcrGardenHeader';
import SwcrItemView from './CustomViews/SwcrGardenItem';
import { SwcrSideSheet } from './CustomViews/SwcrSideSheet';
import { SwcrPackage } from './models/SwcrPackage';
import { filterSetup } from './utilities/filterSetup';
import {
    customDescription,
    fieldSettings,
    getHighlighColumn,
    getItemWidth
} from './utilities/gardenSetup';
import { statusBarData } from './utilities/getStatusBarData';
import { sortPackagesByStatusAndNumber } from './utilities/sortFunctions';
import { tableConfig } from './utilities/tableSetup';

export function setup(appApi: ClientApi): void {
    appApi
        .createWorkSpace<SwcrPackage>({
            CustomSidesheet: SwcrSideSheet,
            objectIdentifier: 'swcrNo',
            defaultTab: 'garden',
        })
        .registerDataSource({ responseAsync: responseAsync, responseParser: responseParser })
        .registerFilterOptions(filterSetup)
        .registerTableOptions(tableConfig)
        .registerGardenOptions({
            gardenKey: 'dueAtDate',
            itemKey: 'swcrNo',
            type: 'virtual',
            fieldSettings,
            customViews: {
                customItemView: SwcrItemView,
                customHeaderView: SwcrHeaderView,
            },
            itemWidth: getItemWidth,
            rowHeight: 25,
            highlightColumn: getHighlighColumn,
            customDescription: customDescription,
        })
        .registerStatusItems(statusBarData)
        .registerPowerBIOptions({
            reportURI: 'pp-swcr-analytics',
            pages: [
                {
                    pageTitle: 'Overview',
                    pageId: 'ReportSectionb937310a77e18f67ff37',
                    default: true,
                },
                { pageTitle: 'History', pageId: 'ReportSection0cb62244235c033e5151' },
            ],
        });
}

async function responseAsync(signal?: AbortSignal) {
    const { fusionDataproxy } = httpClient();
    const contextId = getFusionContextId();
    return await fusionDataproxy.fetch(`/api/contexts/${contextId}/swcr`, { signal: signal });
}

async function responseParser(res: Response) {
    const swcrPackages = JSON.parse(await res.text()) as SwcrPackage[];
    return swcrPackages.sort(sortPackagesByStatusAndNumber);
}

export const swcrSideSheetWidget = {
    widget: SwcrSideSheet,
    manifest: {
        widgetId: 'swcr',
        widgetType: 'sidesheet',
    },
};
