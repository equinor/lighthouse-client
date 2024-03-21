import { Query } from '../../types';

export const getOverdue = (item: Query): string => {
  if (item.isOverdue) return 'Yes';
  return 'No';
};

export const getScheduleImpact = (item: Query): string => {
  if (item.scheduleImpact) return 'Yes';
  return 'No';
};

export const getPossibleWarranty = (item: Query): string => {
  if (item.possibleWarrantyClaim) return 'Yes';
  return 'No';
};

export const getSignatureProgress = (item: Query): number => {
  if (item.stepsSigned !== null && item.steps !== null) {
    return Math.round((item.stepsSigned / item.steps) * 100);
  } else {
    return 0;
  }
};
