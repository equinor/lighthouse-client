import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { Area } from './Types/area';

export async function getAreaByCode(areaCode: string): Promise<Area> {
    const { procosys } = httpClient();

    const responseData: Area = await procosys
        .fetch(`api/Library/Area?plantId=PCS%24JOHAN_CASTBERG&code=${areaCode}&api-version=4.1`)
        .then((x) => x.json());

    return responseData;
}
