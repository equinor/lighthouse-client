import { HttpClient } from '@equinor/http-client';
import { Document } from './Types/Document';

/**
 * Resolves document by document number
 * @param instCode
 * @param docNo
 * @param stidClient
 * @returns
 */
export async function getDocumentById(
    instCode: string,
    docNo: string,
    stidClient: HttpClient
): Promise<Document> {
    const baseUrl = 'https://stidapi.equinor.com';
    const uri = `${instCode}/document`;
    const queryParameters = `docNo=${encodeURIComponent(docNo)}`;
    const url = `${baseUrl}/${uri}?${queryParameters}`;
    return await stidClient.fetch(url).then((response) => response.json());
}
