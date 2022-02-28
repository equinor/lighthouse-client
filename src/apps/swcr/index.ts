import { ClientApi, httpClient } from '@equinor/portal-client';
import { SwcrHeaderView } from './CustomViews/SwcrGardenHeader';
import { SwcrItemView } from './CustomViews/SwcrGardenItem';
import { SwcrGroupView } from './CustomViews/SwcrGroupView';
import { SwcrSideSheet } from './CustomViews/SwcrSideSheet';
import { SwcrPackage } from './models/SwcrPackage';
import { fieldSettings } from './utilities/gardenSetup';
import { sortPackagesByStatusAndNumber } from './utilities/sortFunctions';

export function setup(appApi: ClientApi): void {
    const swcr = appApi.createWorkSpace<SwcrPackage>({
        CustomSidesheet: SwcrSideSheet,
    });

    swcr.registerDataSource(async () => {
        const { fusion } = httpClient();
        const response = await fusion.fetch(
            `https://pro-s-dataproxy-fprd.azurewebsites.net/api/contexts/65728fee-185d-4a0c-a91d-8e3f3781dad8/swcr`
        );

        //pro-s-dataproxy-ci.azurewebsites.net/api/contexts/b9a3246a-ddb5-4086-b4ec-dd4b0e88b700/swcr

        const swcrPackages = JSON.parse(await response.text()) as SwcrPackage[];

        return swcrPackages.sort(sortPackagesByStatusAndNumber);
    });

    swcr.registerFilterOptions({
        typeMap: { siteCode: 'Site Code' },
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
        fieldSettings,
        customViews: {
            customItemView: SwcrItemView,
            customGroupView: SwcrGroupView,
            customHeaderView: SwcrHeaderView,
        },
    });
}
