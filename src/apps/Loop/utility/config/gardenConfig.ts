import { getYearAndWeekFromDate, sortByNumber } from '@equinor/GardenUtils';
import { FieldSettings, GardenOptions } from '@equinor/ParkView';
import { CustomGroupByKeys } from '../../types';
import { Loop } from '../../types/loop';
import { getDateKey } from '../helpers/getGroupByKey';
export type ExtendedGardenFields = 'RFC' | 'RFO';
export const fieldSettings: FieldSettings<Loop, ExtendedGardenFields> = {
    responsible: {
        label: 'Reponsible',
    },
    functionalSystem: {
        label: 'Functional system',
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
};
const customGroupByKeys: CustomGroupByKeys = {
    plannedForecast: 'Planned',
    weeklyDaily: 'Weekly',
};

const getGroupBy = (groupBy: keyof Loop & ExtendedGardenFields): keyof Loop => {
    switch (groupBy) {
        case 'RFC':
            return 'rfC_Planned_Forecast_Date';
        case 'RFO':
            return 'rfO_Planned_Forecast_Date';
        default:
            return groupBy;
    }
};
const getHighlightedColumn = (groupByKey) => {
    const groupBy = getGroupBy(groupByKey as keyof Loop & ExtendedGardenFields);
    switch (groupBy) {
        case 'rfC_Planned_Forecast_Date':
        case 'rfO_Planned_Forecast_Date':
            return getYearAndWeekFromDate(new Date());

        default:
            return undefined;
    }
};
export const gardenConfig: GardenOptions<Loop> = {
    gardenKey: 'RFC' as keyof Loop,
    itemKey: 'tagNo',
    objectIdentifier: 'checklistId',
    customGroupByKeys,
    fieldSettings,
    highlightColumn: getHighlightedColumn,
    // customViews: {
    //     customGroupByView: LoopGroupBySelect,
    // },
};
