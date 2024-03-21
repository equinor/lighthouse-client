import { Punch } from '../../types';
import { DATE_BLANKSTRING } from './constants';
import { punchStatusOrder } from './getStatusOrder';

export const sortPackagesByStatus = (a: Punch, b: Punch): number => {
  return (
    punchStatusOrder[b.status] - punchStatusOrder[a.status] ||
    a.punchItemNo.localeCompare(b.punchItemNo)
  );
};

export const sortByDate = (a: string, b: string) => {
  if (a === DATE_BLANKSTRING) return -1;
  if (b === DATE_BLANKSTRING) return 1;
  if (a === b) return 0;

  return a.localeCompare(b);
};
