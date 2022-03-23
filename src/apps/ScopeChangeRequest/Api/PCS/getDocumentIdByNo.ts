import { httpClient } from '../../../../Core/Client/Functions/HttpClient';

export async function getDocumentIdByNo(documentId: string): Promise<number> {
    const { procosys } = httpClient();

    const res = await procosys.fetch(
        `api/Documents/ByDocumentNo?plantId=PCS%24JOHAN_CASTBERG&projectId=177433&documentNo=${documentId}&api-version=4.1`
    );

    if (!res.ok) {
        throw 'Failed to get document';
    }
    return await res.json()['Id'];
}
