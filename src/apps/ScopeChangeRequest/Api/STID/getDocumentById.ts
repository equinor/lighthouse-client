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
    return await STID.fetch(url).then((response) => response.json());
}
