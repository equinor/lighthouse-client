import { SwcrStatus } from '../models/SwcrPackage';
import { getSwcrStatusPriority } from './packages';

export const sortBySwcrStatusPriority = (a: string, b: string): number =>
    getSwcrStatusPriority(a as SwcrStatus) - getSwcrStatusPriority(b as SwcrStatus);

export const sortByEstimatedManHours = (a: string, b: string): number =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

export const isSafetyOrder = { Yes: 1, No: 2, Related: 3 };
export const sortByIsSafety = (a: string, b: string): number =>
    isSafetyOrder[a as keyof typeof isSafetyOrder] - isSafetyOrder[b as keyof typeof isSafetyOrder];

export const sortByLastSignedRanking = (a: string, b: string): number => {
    const [aRank, aStatus] = a.split(' ');
    const [bRank, bStatus] = b.split(' ');

    return (
        aRank.localeCompare(bRank, undefined, { numeric: true, sensitivity: 'base' }) ||
        getSwcrStatusPriority(aStatus as SwcrStatus) - getSwcrStatusPriority(bStatus as SwcrStatus)
    );
};
