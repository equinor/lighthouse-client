import { AppApi } from '../apps';
import { baseClient } from '../../../packages/httpClient/src';
import { SwcrPackage } from './SwcrPackage';
import { createWorkSpace } from '../../Core/WorkSpace/src/WorkSpaceApi/Api';

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
        return JSON.parse(await response.text());
    });

    swcr.registerViewOptions({
        objectIdentifierKey: 'swcrId',
        title: {
            key: 'swcrId',
            label: 'Swcr Id',
        },
        description: {
            key: 'description',
            label: 'Description',
        },
    });

    swcr.registerFilterOptions({ excludeKeys: ['description', 'nextsToSign'] });
    swcr.registerTableOptions({ objectIdentifierKey: 'swcrId' });
    swcr.registerGardenOptions({
        gardenKey: 'swcrId',
        itemKey: 'swcrId',
        groupByKeys: ['dueAtDate'],
        excludeKeys: ['description', 'nextsToSign'],
    });
}
