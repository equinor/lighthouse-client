import {
    getYearAndWeekAndDayFromString,
    getYearAndWeekFromDate,
    sortByNumber,
} from '@equinor/GardenUtils';
import { FieldSettings, GardenOptions } from '@equinor/ParkView';
import { PunchGroupBySelect } from '../../components';
import { CustomGroupByKeys } from '../../types';
import { Punch } from '../../types/punch';
import { getDateKey } from '../helpers';
export type ExtendedGardenFields = 'RFC' | 'RFO';

export const fieldSettings: FieldSettings<Punch, ExtendedGardenFields> = {
    responsible: {
        label: 'Responsible',
    },
    functionalSystem: {
        label: 'System',
    },
    formularType: {
        label: 'Form type',
    },
    RFC: {
        label: 'RFC',
        getKey: getDateKey,
        getColumnSort: sortByNumber,
    },
    RFO: {
        label: 'RFO',
        getKey: getDateKey,
        getColumnSort: sortByNumber,
    },
    punchListSorting: {
        label: 'PL Sorting',
    },
    punchListType: {
        label: 'PL Type',
    },
};

const customGroupByKeys: CustomGroupByKeys = {
    plannedForecast: 'Planned',
    weeklyDaily: 'Weekly',
};

const getHighlightedColumn = (groupByKey, customGroupByKeys) => {
    const { weeklyDaily } = customGroupByKeys as CustomGroupByKeys;

    switch (groupByKey) {
        case 'RFO':
        case 'RFC':
            return weeklyDaily === 'Daily'
                ? getYearAndWeekAndDayFromString(new Date().toString())
                : getYearAndWeekFromDate(new Date());

        default:
            return undefined;
    }
};
export const gardenConfig: GardenOptions<Punch> = {
    gardenKey: 'RFC' as keyof Punch,
    itemKey: 'punchItemNo',
    objectIdentifier: 'punchItemNo',
    customGroupByKeys,
    customViews: {
        customGroupByView: PunchGroupBySelect,
    },
    fieldSettings,
    highlightColumn: getHighlightedColumn,
};
