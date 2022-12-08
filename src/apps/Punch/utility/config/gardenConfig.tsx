import { getYearAndWeekFromDate } from '@equinor/GardenUtils';
import { FieldSettings, GardenOptions } from '@equinor/ParkView';
import PunchGardenItem from '../../components/PunchGardenItem/PunchGardenItem';

import { Punch } from '../../types/punch';
import { getDateKey } from '../helpers/getKey';
import { sortByDate } from '../helpers/sortPackages';
export type ExtendedGardenFields = 'RFC' | 'RFO';

export const fieldSettings: FieldSettings<Punch, ExtendedGardenFields> = {
    handoverPlan: {
        label: 'Handover plan',
        getKey: (item) => getDateKey(item.handoverPlan),
        getColumnSort: sortByDate,
    },
    rfC_PlannedForecastDate: {
        label: 'RFC plan',
        getKey: (item) => getDateKey(item.rfC_PlannedForecastDate),
        getColumnSort: sortByDate,
    },
    rfO_PlannedForecastDate: {
        label: 'RFO plan',
        getKey: (item) => getDateKey(item.rfO_PlannedForecastDate),
        getColumnSort: sortByDate,
    },
    dueDate: {
        label: 'Due date',
        getKey: (item) => getDateKey(item.dueDate),
        getColumnSort: sortByDate,
    },
    createdDate: {
        label: 'Created date',
        getKey: (item) => getDateKey(item.createdDate),
        getColumnSort: sortByDate,
    },
    clearedAtDate: {
        label: 'Cleared date',
        getKey: (item) => getDateKey(item.clearedAtDate),
        getColumnSort: sortByDate,
    },
    verifiedAtDate: {
        label: 'Verified date',
        getKey: (item) => getDateKey(item.verifiedAtDate),
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
    switch (groupByKey) {
        case 'dueDate':
        case 'handoverPlan':
        case 'rfC_PlannedForecastDate':
        case 'rfO_PlannedForecastDate':
        case 'createdDate':
        case 'clearedAtDate':
        case 'verifiedAtDate':
            return getYearAndWeekFromDate(new Date());

        default:
            return undefined;
    }
};

export const gardenConfig: GardenOptions<Punch> = {
    gardenKey: 'handoverPlan' as keyof Punch,
    itemKey: 'punchItemNo',
    objectIdentifier: 'punchItemNo',
    itemWidth: () => 150,
    rowHeight: 25,
    customViews: {
        customItemView: PunchGardenItem,
    },
    fieldSettings,
    highlightColumn: getHighlightedColumn,
};
