import { httpClient, isProduction } from '@equinor/lighthouse-portal-client';
import { Tag } from '../../../types/ProCoSys/Tag';

const savedSearchIdDev = 105236;
const savedSearchIdProd = 110005;
export async function getAllTagsFromMcPkg(mcPkgNo: string): Promise<Tag> {
    const { procosys } = httpClient();

    const tags = await procosys.fetch(
        `api/Search?plantId=PCS%24JOHAN_CASTBERG&savedSearchId=${isProduction() ? savedSearchIdProd : savedSearchIdDev
        }&sortColumns=false&api-version=4.1`,
        {
            method: 'POST',
            body: JSON.stringify([{ Key: 'McPkgMcPkgNo', Value: mcPkgNo }]),
        }
    );

    return await tags.json();
}
