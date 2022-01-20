import { BaseClient } from '../../../../../packages/httpClient/src';
import { Document } from './Types/Document';

/**
 * Returns all stid documents related to a given tag
 * @param instCode
 * @param tagNo
 * @param stidClient
 * @param docCategory
 */
export async function getDocumentsByTag(
    instCode: string,
    tagNo: string,
    stidClient: BaseClient
    //TODO:
    //docCategory?: string
): Promise<Document[]> {
    const baseUrl = 'https://stidapi.equinor.com';
    const uri = `${instCode}/tag/document-refs`;
    const queryParameters = `tagNo=${encodeURIComponent(tagNo)}&noContentAs200=true`;
    const url = `${baseUrl}/${uri}?${queryParameters}`;
    return await stidClient.fetch(url).then((response) => response.json());
}
