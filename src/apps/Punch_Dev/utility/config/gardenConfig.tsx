import { FieldSettings, GardenOptions } from '@equinor/ParkView';
import PunchGardenItem from '../../components/PunchGardenItem/PunchGardenItem';
import {
    getYearAndWeekFromString,
    getYearAndWeekFromDate,
    sortByDate,
} from '../../components/PunchGardenItem/utils';
import { Punch } from '../../types/punch';
export type ExtendedGardenFields = 'RFC' | 'RFO';

export const fieldSettings: FieldSettings<Punch, ExtendedGardenFields> = {
    handoverPlan: {
        label: 'Handover plan',
        getKey: (item) => [getYearAndWeekFromString(item.handoverPlan)],
        getColumnSort: sortByDate,
    },
    dueDate: {
        label: 'Due date',
        getKey: (item) => [getYearAndWeekFromString(item.dueDate)],
        getColumnSort: sortByDate,
    },
    createdDate: {
        label: 'Created date',
        getKey: (item) => [getYearAndWeekFromString(item.createdDate)],
        getColumnSort: sortByDate,
    },
    clearedAtDate: {
        label: 'Cleared date',
        getKey: (item) => [getYearAndWeekFromString(item.clearedAtDate)],
        getColumnSort: sortByDate,
    },
    verifiedAtDate: {
        label: 'Verified date',
        getKey: (item) => [getYearAndWeekFromString(item.verifiedAtDate)],
        getColumnSort: sortByDate,
    },
    cleardBy: {
        label: 'Clearing by',
    },
    commissioningPackageNo: {
        label: 'Commpkg',
    },
    system: {
        label: 'System',
    },
};

export const getHighlightedColumn = (groupByKey: string): string | undefined => {
    return groupByKey === 'handoverPlan' || groupByKey === 'dueDate'
        ? getYearAndWeekFromDate(new Date())
        : undefined;
};

export const gardenConfig: GardenOptions<Punch> = {
    gardenKey: 'handoverPlan' as keyof Punch,
    itemKey: 'punchItemNo',
    objectIdentifier: 'punchItemNo',
    itemWidth: () => 200,
    rowHeight: 25,
    customViews: {
        customItemView: PunchGardenItem,
    },
    fieldSettings,
    highlightColumn: getHighlightedColumn,
};
