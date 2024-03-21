import { getYearAndWeekFromDate, sortByNumber } from '@equinor/GardenUtils';
import {
  FieldSettings,
  GardenGroups,
  GardenOptions,
  getGardenItems,
  isSubGroup,
} from '@equinor/ParkView';
import { CustomGardenView } from '../../components';
import { CustomGroupByKeys } from '../../types';
import { Loop } from '../../types/loop';
import { getDateKey, getFieldKeyBasedOnPlannedForecast } from '../helpers/getGroupByKey';
export type ExtendedGardenFields = 'RFC' | 'RFO' | 'MCComplete';
export const fieldSettings: FieldSettings<Loop, ExtendedGardenFields> = {
  responsible: {
    label: 'Reponsible',
  },
  functionalSystem: {
    label: 'Functional system',
  },
  commissioningPackageNo: {
    label: 'Comm pkg',
  },
  mechanicalCompletionPackageNo: {
    label: 'MC pkg',
  },
  priority1: {
    label: 'Priority',
  },
  MCComplete: {
    label: 'Planned MC complete',
    getKey: getDateKey,
    getColumnSort: sortByNumber,
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
  loopNo: {
    label: '@LOOP tag',
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
export const getItemWidth = (
  garden: GardenGroups<Loop>,
  groupByKey: string,
  customGroupByKeys: Record<string, unknown> | undefined
) => {
  const customKeys = customGroupByKeys as CustomGroupByKeys;
  const columnName = getFieldKeyBasedOnPlannedForecast(groupByKey, customKeys?.plannedForecast);
  const minWidth = 139;
  let gardenItemList: Loop[] = [];
  garden.forEach((column) => {
    const gardenItems = getGardenItems(column);
    gardenItems &&
      gardenItems.forEach((gardenItem) => {
        !isSubGroup(gardenItem) && gardenItemList.push(gardenItem.item);
      });
  });
  const longestKey = Math.max.apply(
    Math,
    gardenItemList.map((item) => {
      const itemColumnString = item[columnName] ? item[columnName]?.toString() : '';
      const titleLength = itemColumnString ? itemColumnString.replace('@LOOP-', '').length : 0;
      return titleLength >= item.loopNo.length
        ? titleLength
        : item.loopNo.replace('@LOOP-', '').length;
    })
  );
  return Math.max(longestKey * 8 + 50, minWidth);
};

export const gardenConfig: GardenOptions<Loop> = {
  gardenKey: 'RFC' as keyof Loop,
  itemKey: 'loopNo',
  objectIdentifier: 'checklistId',
  customGroupByKeys,
  fieldSettings,
  highlightColumn: getHighlightedColumn,
  itemWidth: getItemWidth,
  customViews: {
    // customGroupByView: LoopGroupBySelect,
    customItemView: CustomGardenView,
  },
};
