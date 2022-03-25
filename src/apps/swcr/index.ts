import { ClientApi, httpClient, isProduction } from '@equinor/portal-client';
import { weekDiff } from '../Construction/Utils';
import { SwcrHeaderView } from './CustomViews/SwcrGardenHeader';
import { SwcrItemView } from './CustomViews/SwcrGardenItem';
import { SwcrGroupView } from './CustomViews/SwcrGroupView';
import { SwcrSideSheet } from './CustomViews/SwcrSideSheet';
import { SwcrPackage } from './models/SwcrPackage';
import { fieldSettings } from './utilities/gardenSetup';
import { statusBarData } from './utilities/getStatusBarData';
import { sortPackagesByStatusAndNumber } from './utilities/sortFunctions';
import { SwcrGraph } from './CustomViews/Graph';
export function setup(appApi: ClientApi): void {
    const swcr = appApi.createWorkSpace<SwcrPackage>({
        CustomSidesheet: SwcrSideSheet,
        objectIdentifier: 'swcrNo',
    });

    async function responseAsync(signal?: AbortSignal) {
        const { fusion } = httpClient();
        fusion.setBaseUrl(
            `https://pro-s-dataproxy-${
                isProduction() ? 'fprd' : 'ci'
            }.azurewebsites.net/api/contexts/`
        );
        const contextId = isProduction()
            ? '65728fee-185d-4a0c-a91d-8e3f3781dad8'
            : '71db33bb-cb1b-42cf-b5bf-969c77e40931';
        return await fusion.fetch(`${contextId}/swcr`, { signal: signal });
    }

    async function responseParser(res: Response) {
        const swcrPackages = JSON.parse(await res.text()) as SwcrPackage[];
        const temp = swcrPackages.filter(
            (swcr) => weekDiff(new Date(swcr.updatedAtDate)).weeks >= -60
        );
        console.log(temp);

        return swcrPackages.sort(sortPackagesByStatusAndNumber);
    }

    swcr.registerDataSource({ responseAsync: responseAsync, responseParser: responseParser });

    swcr.registerFilterOptions({
        defaultActiveFilters: [
            'status',
            'projectIdentifier',
            'contract',
            'supplier',
            'system',
            'types',
        ],
        excludeKeys: [
            'description',
            'nextsToSign',
            'projectDescription',
            'modification',
            'rowKey',
            'url',
            'updatedAtDate',
            'cntAttachments',
            'title',
            'swcrId',
        ],
    });

    swcr.registerTableOptions({ objectIdentifierKey: 'swcrId' });

    swcr.registerGardenOptions({
        gardenKey: 'dueAtDate',
        itemKey: 'swcrNo',
        type: 'normal',
        fieldSettings,
        customViews: {
            customItemView: SwcrItemView,
            customGroupView: SwcrGroupView,
            customHeaderView: SwcrHeaderView,
        },
    });

    swcr.registerAnalyticsOptions({
        section1: {
            // chart1: {
            //     type: 'barChart',
            //     options: {
            //         categoryKey: 'createdAtDate',
            //         nameKey: 'closedAtDate',
            //     },
            // },
            chart2: {
                type: 'customVisual',
                options: {
                    component: SwcrGraph,
                },
            },
        },
    });

    swcr.registerStatusItems(statusBarData);
}
