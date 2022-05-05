import { McPackage, TagSize } from '../../types';

export const getTagSize = (mcPackage: McPackage, averageTagVolume: number): TagSize => {
    let size: TagSize = 'small';
    if (averageTagVolume > 0) {
        const percentage = (parseInt(mcPackage.tagVolume || '0', 10) / averageTagVolume) * 100;
        size = percentage > 66 ? 'large' : percentage > 33 ? 'medium' : 'small';
    }
    return size;
};
