import { getYearAndWeekFromString } from '@equinor/GardenUtils';
import { DATE_BLANKSTRING } from './constants';

export const getDateKey = (dateString: string | null): string => {
  if (!dateString) return DATE_BLANKSTRING;

  return getYearAndWeekFromString(dateString, DATE_BLANKSTRING);
};
