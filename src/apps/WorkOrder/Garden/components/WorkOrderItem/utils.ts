export const itemSize = (estimatedHours: number) => {
    return estimatedHours >= 200 ? 'large' : estimatedHours < 90 ? 'small' : 'medium';
};
