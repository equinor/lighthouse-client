import { weekDiff } from './weekDiff';

export const getFilterDateValues = (dateToCheck: Date, actualDate: string) => {
    const daysDifference = weekDiff(dateToCheck).days;

    return daysDifference <= 0 && actualDate === ''
        ? 'Overdue'
        : daysDifference <= 14 && daysDifference
        ? 'Next 2 weeks'
        : daysDifference <= 28
        ? 'Next 4 weeks'
        : 'Other';
};
