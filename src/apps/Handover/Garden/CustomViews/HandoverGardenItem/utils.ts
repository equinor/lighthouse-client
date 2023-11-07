export const itemSize = (volume: number, maxVolume: number) => {
    if (maxVolume <= 0) return 'small';
    const percentage = (volume / maxVolume) * 100;
    return percentage > 66 ? 'large' : percentage > 33 ? 'medium' : 'small';
};
