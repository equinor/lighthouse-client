import { FieldSettings } from '../../../../components/ParkView/Models/fieldSettings';
import { getYearAndWeekFromString } from '../../Functions/statusHelpers';

import { Pipetest } from '../../Types/pipetest';
import { getStatusKey, getSystemKey, groupBySystem, sortByPipetestStatus } from './gardenFunctions';

export type ExtendedGardenFields = 'system' | 'dueAtDate' | 'priority';

export const fieldSettings: FieldSettings<Pipetest, ExtendedGardenFields> = {
    status: { label: 'Status', getKey: getStatusKey, getColumnSort: sortByPipetestStatus },
    system: { label: 'System', getKey: getSystemKey, getColumnSort: groupBySystem },
    checkLists: {
        label: 'Checklists',
        key: 'tagNo',
    },
    heatTraces: {
        label: 'HeatTraces',
        key: 'tagNo',
    },
    dueAtDate: {
        label: 'Due date',
        getKey: (item) => getYearAndWeekFromString(item.rfccPlanned),
    },
    priority: { label: 'Priority', getKey: (item) => item.commPkPriority1 },
    dueDateTimePeriod: { label: 'Time period', getKey: (item) => item.dueDateTimePeriod },
};
