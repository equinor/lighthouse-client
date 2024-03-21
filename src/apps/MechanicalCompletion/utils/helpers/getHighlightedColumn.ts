import { getYearAndWeekAndDayFromString, getYearAndWeekFromDate } from '@equinor/GardenUtils';
import { CustomGroupByKeys } from '../../types';

export const getHighlightedColumn = (
  groupByKey: string,
  customGroupByKeys?: Record<string, unknown>
) => {
  const { weeklyDaily } = customGroupByKeys as CustomGroupByKeys;

  if (
    groupByKey === 'finalPunch' ||
    groupByKey === 'rfcmc' ||
    groupByKey === 'rfcc' ||
    groupByKey === 'punchAccepted'
  ) {
    return weeklyDaily === 'Daily'
      ? getYearAndWeekAndDayFromString(new Date().toString())
      : getYearAndWeekFromDate(new Date());
  } else {
    return undefined;
  }
};
