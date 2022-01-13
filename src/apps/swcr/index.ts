import { AppApi } from '../apps';
import { baseClient } from '../../../packages/httpClient/src';
import { SwcrPackage } from './models/SwcrPackage';
import { createWorkSpace } from '../../Core/WorkSpace/src/WorkSpaceApi/Api';
import { sortColumnByDefault } from './utilities/packages';
import { SwcrHeaderView } from './CustomViews/SwcrGardenHeader';
import { SwcrItemView } from './CustomViews/SwcrGardenItem';
import { SwcrGroupView } from './CustomViews/SwcrGroupView';
import { fieldSettings } from './utilities/gardenSetup';

export function setup(appApi: AppApi): void {
    const api = baseClient(appApi.authProvider, [appApi.appConfig.fusion]);

    const swcr = createWorkSpace<SwcrPackage>({
        initialState: [],
        primaryViewKey: 'swcrId',
        viewerId: appApi.shortName,
    });

    swcr.registerDataSource(async () => {
        const response = await api.fetch(
            `https://pro-s-dataproxy-fprd.azurewebsites.net/api/contexts/3380fe7d-e5b7-441f-8ce9-a8c3133ee499/swcr`
        );
        const swcrPackages = JSON.parse(await response.text()) as SwcrPackage[];

        return swcrPackages.sort(sortColumnByDefault);
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
        groupByKeys: [],
        fieldSettings,
        excludeKeys: [
            'projectDescription',
            'description',
            'modification',
            'rowKey',
            'url',
            'updatedAtDate',
            'cntAttachments',
            'title',
            'swcrId',
        ],
        customViews: {
            customItemView: SwcrItemView,
            customGroupView: SwcrGroupView,
            customHeaderView: SwcrHeaderView,
        },
        options: { groupDescriptionFunc: (data) => data.title },
    });
}
