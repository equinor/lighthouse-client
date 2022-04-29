import { FieldSettings } from '../../../../components/ParkView/Models/fieldSettings';
import { getYearAndWeekFromDate, getYearAndWeekFromString } from '../../Functions/statusHelpers';

import { Pipetest } from '../../Types/pipetest';
import {
    getStatusKey,
    getSystemKey,
    groupBySystem,
    sortByNumber,
    sortByPipetestStatus,
} from './gardenFunctions';

export type ExtendedGardenFields = 'system' | 'dueAtDate' | 'priority';

export const fieldSettings: FieldSettings<Pipetest, ExtendedGardenFields> = {
    step: { label: 'Current step', getKey: getStatusKey, getColumnSort: sortByPipetestStatus },
    system: { label: 'System', getKey: getSystemKey, getColumnSort: groupBySystem },
    heatTraces: {
        label: 'HT cable',
        key: 'tagNo',
    },
    dueAtDate: {
        label: 'Piping RFC',
        getKey: (item) => getYearAndWeekFromString(item.rfccPlanned),
        getColumnSort: sortByNumber,
    },
    priority: { label: 'Priority', getKey: (item) => item.commPkPriority1 },
    dueDateTimePeriod: { label: 'Time period', getKey: (item) => item.dueDateTimePeriod },
    pipingRfcUniqueHT: {
        label: 'Piping RFC (Unique HT)',
        getKey: (item) => getYearAndWeekFromString(item.pipingRfcUniqueHT),
    },
};

export const getHighlightedColumn = (groupByKey: string) => {
    switch (groupByKey) {
        case 'dueAtDate':
            return getYearAndWeekFromDate(new Date());
        default:
            return undefined;
    }
};
