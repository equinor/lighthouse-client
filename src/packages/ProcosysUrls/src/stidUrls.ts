//TODO: No alias import because it will break tests
import { isProduction } from '../../../Core/Client/Functions/Settings';

interface StidUrls {
  getTagUrl: (tagId: string) => string;
  getDocUrl: (docNo: string) => string;
}

const getBaseUrl = () => `https://${isProduction() ? 'stid' : 'stidtest'}.equinor.com`;

export const stidUrls: StidUrls = {
  getTagUrl: (tagId: string) => `${getBaseUrl()}/JCA/tag?tagNo=${tagId}`,
  getDocUrl: (docNo: string) => `${getBaseUrl()}/JCA/doc?docNo=${docNo}`,
};
