import { proCoSysSearchMapper } from './proCoSysSearchMapper';
import { proCoSysSearchRequest } from './proCoSysSearchRequest';

export const procosysConfig = {
    type: 'procosys',
    searchRequest: proCoSysSearchRequest,
    searchMapper: proCoSysSearchMapper,
};
