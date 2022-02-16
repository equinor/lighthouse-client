import { httpClient } from '../../../../Core/Client/Functions/HttpClient';
import { Discipline } from './Types/discipline';

export async function getDisciplineByCode(discCode: string): Promise<Discipline> {
    const { procosys } = httpClient();

    const responseData: Discipline = await procosys
        .fetch(
            `api/Library/Discipline?plantId=PCS%24JOHAN_CASTBERG&code=${discCode}&api-version=4.1`
        )
        .then((x) => x.json());

    return responseData;
}
