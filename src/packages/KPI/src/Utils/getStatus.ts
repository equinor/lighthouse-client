import { Status } from '../Components/KpiItem/KpiItem';
import { getPercentageNum } from './getPercentage';
export function getStatus<T, K extends keyof T>(
    data: T[],
    key: K,
    value: T[K],
    swap?: boolean
): keyof Status {
    const percentage = getPercentageNum(data, key, value);
    if (percentage < 25) {
        return swap ? 'ok' : 'waring';
    } else if (percentage > 25 && percentage < 75) {
        return 'info';
    } else if (percentage > 80) {
        return swap ? 'waring' : 'ok';
    } else {
        return 'default';
    }
}

export function getDateStatus<T, K extends keyof T>(
    data: T[],
    key: K,
    swap?: boolean
): keyof Status {
    const percentage = (data.filter((i) => i[key]).length / data.length) * 100;
    if (percentage < 25) {
        return swap ? 'ok' : 'waring';
    } else if (percentage > 25 && percentage < 75) {
        return 'info';
    } else if (percentage > 80) {
        return swap ? 'waring' : 'ok';
    } else {
        return 'default';
    }
}
