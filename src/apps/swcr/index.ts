import { baseClient } from '../../../packages/httpClient/src';
import { SwcrPackage } from './models/SwcrPackage';
import { SwcrHeaderView } from './CustomViews/SwcrGardenHeader';
import { SwcrItemView } from './CustomViews/SwcrGardenItem';
import { SwcrGroupView } from './CustomViews/SwcrGroupView';
import { SwcrSideSheet } from './CustomViews/SwcrSideSheet';
import { fieldSettings } from './utilities/gardenSetup';
import { sortPackagesByStatusAndNumber } from './utilities/sortFunctions';
import { ClientApi } from '@equinor/app-builder';

export function setup(appApi: ClientApi): void {
    const api = baseClient(appApi.authProvider, [appApi.appConfig.scope.fusion]);

    const swcr = appApi.createWorkSpace<SwcrPackage>({
        CustomSidesheet: SwcrSideSheet,
    });

    swcr.registerDataSource(async () => {
        const response = await api.fetch(
            `https://pro-s-dataproxy-fprd.azurewebsites.net/api/contexts/3380fe7d-e5b7-441f-8ce9-a8c3133ee499/swcr`
        );
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

    //swcr.registerDataViewSideSheetOptions({ CustomComponent: SwcrSideSheet });
}
