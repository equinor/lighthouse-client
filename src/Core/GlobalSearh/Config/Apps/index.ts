import { appsSearchMapper } from './appsSearchMapper';
import { appsSearchRequest } from './appsSearchRequest';

export const appsConfig = {
    type: 'apps',
    searchRequest: appsSearchRequest,
    searchMapper: appsSearchMapper,
};
