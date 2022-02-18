import { HttpClient } from '@equinor/http-client';
import { Document } from '../../Types/STID/Document';

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
    stidClient: HttpClient
    //TODO:
    //docCategory?: string
): Promise<Document[]> {
    const uri = `${instCode}/tag/document-refs`;
    const queryParameters = `tagNo=${encodeURIComponent(tagNo)}&noContentAs200=true`;
    const url = `${uri}?${queryParameters}`;
    return await stidClient.fetch(url).then((response) => response.json());
}
