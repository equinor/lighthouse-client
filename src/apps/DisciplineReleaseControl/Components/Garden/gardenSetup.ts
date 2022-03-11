import { FieldSettings } from '../../../../components/ParkView/Models/fieldSettings';

import { Pipetest } from '../../Types/pipetest';
import { getStatusKey, getSystemKey, groupBySystem, sortByPipetestStatus } from './gardenFunctions';

export type ExtendedGardenFields = 'system';

export const fieldSettings: FieldSettings<Pipetest, ExtendedGardenFields> = {
    status: { label: 'Status', getKey: getStatusKey, getColumnSort: sortByPipetestStatus },
    system: { label: 'System', getKey: getSystemKey, getColumnSort: groupBySystem },
};
