import { httpClient } from '../../../../Core/Client/Functions';
import { Document } from '../../Types/STID/Document';

/**
 * Resolves document by document number
 * @param instCode
 * @param docNo
 * @param stidClient
 * @returns
 */
export async function getDocumentById(docNo: string, instCode: string): Promise<Document> {
    const { STID } = httpClient();

    const uri = `${instCode}/document`;
    const queryParameters = `docNo=${encodeURIComponent(docNo)}`;
    const url = `/${uri}?${queryParameters}`;

    const res = await STID.fetch(url);

    if (!res.ok) {
        throw 'Failed to get document from STID';
    }
    return await res.json();
}
