import { GetKeyFunction } from '../../../Core/WorkSpace/src/WorkSpaceApi/State';
import { DateTime } from 'luxon';
import { SwcrStatus, SwcrPackage } from '../models/SwcrPackage';

export const DATE_BLANKSTRING = 'No Date';
export const DEFAULT_BLANKSTRING = '(Blank)';

export const SwcrPackageStatusPriority: Record<SwcrStatus, number> = {
    'Not initiated': 1,
    Initiated: 2,
    Accepted: 3,
    'Ready for Retest': 4,
    Tested: 5,
    Closed: 6,
    'Closed - Rejected': 7,
};

export const getSwcrStatusPriority = (status: SwcrStatus): number =>
    SwcrPackageStatusPriority[status];

const SwcrPackageStatusColors: Record<SwcrStatus, string> = {
    'Not initiated': '#D9EAF2',
    Initiated: '#BCF316',
    Accepted: '#60F316',
    'Ready for Retest': '#F0A875',
    Tested: '#0DCCF2',
    Closed: '#0D59F2',
    'Closed - Rejected': '#0D59F2',
};

export const getSwcrStatusColor = (status: SwcrStatus): string => SwcrPackageStatusColors[status];

export const getIsSafetyKey: GetKeyFunction<SwcrPackage> = (item) => [
    item.types?.toLocaleLowerCase().includes('safety')
        ? 'Related'
        : ['70', '71', '72', '74', '79'].includes(item.system) ||
          ['E', 'F', 'P'].includes(item.controlSystem)
        ? 'Yes'
        : 'No',
];

export const getHoursGroupKey: GetKeyFunction<SwcrPackage> = (item) => {
    const hours = parseInt(item.estimatedManhours) || 0;
    switch (true) {
        case hours === 0:
            return ['0'];
        case hours >= 1000:
            return ['1000+++'];
        case hours >= 500:
            return ['500-999'];
        case hours >= 200:
            return ['200-499'];
        case hours >= 100:
            return ['100-199'];
        case hours >= 50:
            return ['50-99'];
        case hours >= 20:
            return ['20-49'];
        case hours >= 10:
            return ['10-19'];
        case hours >= 5:
            return ['5-9'];
        case hours >= 1:
            return ['1-4'];
        default:
            return ['0'];
    }
};

export const getYearAndWeekFromDate = (date: Date): string => {
    const dateTime = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate());
    return `${dateTime.weekYear}-${dateTime.weekNumber}`;
};

export const getYearAndWeekFromString = (dateString: string, removeDays = 0): string => {
    const date = new Date(dateString);
    return DateTime.fromJSDate(date).isValid
        ? getYearAndWeekFromDate(
              removeDays ? new Date(date.setDate(date.getDate() - removeDays)) : date
          )
        : DATE_BLANKSTRING;
};

export const getRfocKey: GetKeyFunction<SwcrPackage> = (item) => [
    getYearAndWeekFromString(item.cpkgFinishForecastAtDate || item.cpkgFinishPlannedAtDate),
];

export const getRfccKey: GetKeyFunction<SwcrPackage> = (item) => [
    getYearAndWeekFromString(item.cpkgStartForecastAtDate || item.cpkgStartPlannedAtDate),
];

export const getDueDateKey: GetKeyFunction<SwcrPackage> = (item) => [
    getYearAndWeekFromString(item.dueAtDate),
];

export const getRfccDueDateKey: GetKeyFunction<SwcrPackage> = (item) => {
    const dueDate = new Date(item.dueAtDate);
    const startDate = new Date(item.cpkgStartForecastAtDate || item.cpkgStartPlannedAtDate);

    let groupByKey = DATE_BLANKSTRING;
    if (DateTime.fromJSDate(dueDate).isValid && DateTime.fromJSDate(startDate).isValid) {
        const date = dueDate > startDate ? dueDate : startDate;
        groupByKey = getYearAndWeekFromDate(new Date(date.setDate(date.getDate() - 56)));
    } else if (DateTime.fromJSDate(dueDate).isValid)
        groupByKey = getYearAndWeekFromDate(new Date(dueDate.setDate(dueDate.getDate() - 56)));
    else if (DateTime.fromJSDate(startDate).isValid)
        groupByKey = getYearAndWeekFromDate(new Date(startDate.setDate(startDate.getDate() - 56)));

    return [groupByKey];
};

export const getNextToSignKey = (nextToSign: string, ranking = '0'): string => {
    const nextToSignKey =
        nextToSign
            .substring(nextToSign.indexOf('('))
            .replace('(', '')
            .replace(')', '')
            .replace('Function:', '')
            .replace('Person:', '')
            .trimEnd() || DEFAULT_BLANKSTRING;

    return ranking === '0' && nextToSignKey === DEFAULT_BLANKSTRING
        ? nextToSignKey
        : `${ranking}: ${nextToSignKey}`;
};

export const getNextSignatureRoleKey = (nextToSign: string, ranking = '0'): string => {
    const nextSignatureRoleKey =
        nextToSign.substring(0, nextToSign.indexOf('(')).trimEnd() || DEFAULT_BLANKSTRING;

    return ranking === '0' && nextSignatureRoleKey === DEFAULT_BLANKSTRING
        ? nextSignatureRoleKey
        : `${ranking}: ${nextSignatureRoleKey}`;
};

/**
 * This functions enforces parallel next to sign rules for current ranking.
 * There can be situations where same ranking has multiple next to Sign which in fact can NOT be signed in parallel.
 * If the signature breaks rules, it get filtered out of the nextsToSign array, and does not show as a option in the Next signature role filter.
 *
 * current rules enforced:
 *  -- Signatures starting with "SW" and contains "Tested" are NOT shown as "nextToSign" if there are other signatures starting with "SW" or "HMI" and contains "Prepared"
 *  -- Signatures starting with "HW" and contains "Tested" are NOT shown as "nextToSign" if there are other signatures starting with "HW" and contains "Prepared"
 *  -- caps might vary and should not effect rules.
 *
 */
export const nextToSignParallelRuleValidation = (
    nextToSign: string,
    index: number,
    nextSignatures: string[]
): boolean => {
    const nextToSignLower = nextToSign.toLocaleLowerCase();

    if (
        nextToSignLower.startsWith('sw') &&
        nextToSignLower.includes('tested') &&
        nextSignatures.filter((signature) => {
            const signatureToLower = signature.toLocaleLowerCase();
            return (
                (signatureToLower.startsWith('sw') || signatureToLower.startsWith('hmi')) &&
                signatureToLower.includes('prepared')
            );
        }).length
    )
        return false;

    if (
        nextToSignLower.startsWith('hw') &&
        nextToSignLower.includes('tested') &&
        nextSignatures.filter((signature) => {
            const signatureToLower = signature.toLocaleLowerCase();
            return signatureToLower.startsWith('hw') && signatureToLower.includes('prepared');
        }).length
    )
        return false;

    return true;
};

export const getNextToSignKeys: GetKeyFunction<SwcrPackage> = (item) =>
    item.nextsToSign.map((next) => getNextToSignKey(next, item.nextSignRanking));

export const getNextSignatureRoleKeys: GetKeyFunction<SwcrPackage> = (item) =>
    item.nextsToSign
        .filter(nextToSignParallelRuleValidation)
        .map((next) => getNextSignatureRoleKey(next, item.nextSignRanking));

export const getLatestSignedRankingKey: GetKeyFunction<SwcrPackage> = (item) => [
    `${item.latestSignRanking || '0'}: ${item.status}`,
];

export const getStartImplForecastKey: GetKeyFunction<SwcrPackage> = (item) => {
    const workdays =
        parseInt(item.estimatedManhours) > 0 ? Math.floor(parseInt(item.estimatedManhours) / 8) : 0;

    return [
        getYearAndWeekFromString(
            item.cpkgStartForecastAtDate || item.cpkgStartPlannedAtDate,
            14 + workdays
        ),
    ];
};

export const getTypeKeys: GetKeyFunction<SwcrPackage> = (item) =>
    item.types.length ? item.types.split(',') : [DEFAULT_BLANKSTRING];

type sortColumnFunctionType = (columnA: SwcrPackage, columnB: SwcrPackage) => number;

export const sortColumnByDefault: sortColumnFunctionType = (columnA, columnB) =>
    getSwcrStatusPriority(columnA.status) - getSwcrStatusPriority(columnB.status) ||
    parseInt(columnA.swcrNo) - parseInt(columnB.swcrNo);
