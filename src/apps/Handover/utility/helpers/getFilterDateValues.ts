export const getFilterDateValues = (daysDiff: number) => {
    return daysDiff <= 14 && daysDiff > 0
        ? 'Next 2 weeks'
        : daysDiff <= 28 && daysDiff > 14
        ? 'Next 4 weeks'
        : 'Other';
};
