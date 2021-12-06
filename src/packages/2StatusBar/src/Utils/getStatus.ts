import { Status } from '../2Components/StatusItem/StatusItem';
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
    }
    if (percentage > 25 && percentage < 75) {
        return 'info';
    }
    if (percentage > 80) {
        return swap ? 'waring' : 'ok';
    }
    return 'default';
}

export function getDateStatus<T, K extends keyof T>(
    data: T[],
    key: K,
    swap?: boolean
): keyof Status {
    const percentage = (data.filter((i) => i[key]).length / data.length) * 100;
    if (percentage < 25) {
        return swap ? 'ok' : 'waring';
    }
    if (percentage > 25 && percentage < 75) {
        return 'info';
    }
    if (percentage > 80) {
        return swap ? 'waring' : 'ok';
    }
    return 'default';
}
