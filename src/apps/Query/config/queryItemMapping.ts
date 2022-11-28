import { Query } from '../model/query';

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
    return Math.round((item.stepsSigned / item.steps) * 100);
};
