import {
    getYearAndWeekAndDayFromString,
    getYearAndWeekFromDate,
    sortByNumber,
} from '@equinor/GardenUtils';
import { FieldSettings, GardenOptions } from '@equinor/ParkView';
import { CustomGardenItem, PunchGroupBySelect } from '../../components';
import { CustomGroupByKeys } from '../../types';
import { Punch } from '../../types/punch';
import { getDate, getDateKey } from '../helpers';
export type ExtendedGardenFields = 'RFC' | 'RFO';

export const fieldSettings: FieldSettings<Punch, ExtendedGardenFields> = {
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
    verifiedAtDate: {
        label: 'Verified',
        getKey: getDate,
        getColumnSort: sortByNumber,
    },
    clearedAtDate: {
        label: 'Cleared',
        getKey: getDate,
        getColumnSort: sortByNumber,
    },
    clearingByOrganization: {
        label: 'Clearing by',
    },
    materialRequired: {
        label: 'Material required',
        getKey: (item) =>
            item.materialRequired === null
                ? '(Blank)'
                : item.materialRequired === false
                ? 'False'
                : 'True',
    },
    commissioningPackageNo: {
        label: 'Compack',
    },
    functionalSystem: {
        label: 'System',
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
        case 'clearedAtDate':
        case 'verifiedAtDate':
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
    itemWidth: () => 135,
    customGroupByKeys,
    customViews: {
        customGroupByView: PunchGroupBySelect,
        customItemView: CustomGardenItem,
    },
    fieldSettings,
    highlightColumn: getHighlightedColumn,
};
