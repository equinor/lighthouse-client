import { getYearAndWeekFromDate } from '@equinor/GardenUtils';
import { GardenItemWithDepth } from '../../../components/ParkView/Components/VirtualGarden/types/gardenItem';
import {
    columnDataIsWithDepth,
    getGardenItems,
} from '../../../components/ParkView/Components/VirtualGarden/utils';
import { GardenGroups } from '../../../components/ParkView/Models/data';
import { FieldSettings } from '../../../components/ParkView/Models/fieldSettings';
import { SwcrPackage } from '../models/SwcrPackage';
import {
    getIsSafetyKey,
    getHoursGroupKey,
    getTypeKeys,
    getNextToSignKeys,
    getNextSignatureRoleKeys,
    getLatestSignedRankingKey,
    getRfccKey,
    getRfccDueDateKey,
    getStartImplForecastKey,
    getRfocKey,
    getYearAndWeekFromString,
} from './packages';

import {
    sortByEstimatedManHours,
    sortByIsSafety,
    sortByLastSignedRanking,
    sortBySwcrStatusPriority,
} from './sortFunctions';

export type ExtendedSwcrGardenFields =
    | 'isSafety'
    | 'RFCC'
    | 'RFCCDueDate'
    | 'RFOC'
    | 'isSafety'
    | 'startImplForecast'
    | 'nextSignatureRole';

export const fieldSettings: FieldSettings<SwcrPackage, ExtendedSwcrGardenFields> = {
    isSafety: { label: 'Is Safety', getKey: getIsSafetyKey, getColumnSort: sortByIsSafety },
    estimatedManhours: {
        label: 'Estimated man hours',
        getKey: getHoursGroupKey,
        getColumnSort: sortByEstimatedManHours,
    },
    types: { label: 'Types', getKey: getTypeKeys },
    nextToSign: { label: 'Next signature by', getKey: getNextToSignKeys },
    nextSignatureRole: { label: 'Next signature role', getKey: getNextSignatureRoleKeys },
    latestSignRanking: {
        label: 'Last signed ranking',
        getKey: getLatestSignedRankingKey,
        getColumnSort: sortByLastSignedRanking,
    },
    RFCC: { label: 'RFCC', getKey: getRfccKey },
    RFCCDueDate: { label: 'RFCC duedate', getKey: getRfccDueDateKey },
    startImplForecast: { label: 'Start impl. forecast', getKey: getStartImplForecastKey },
    RFOC: { label: 'RFOC', getKey: getRfocKey },
    closedAtDate: {
        label: 'Closed at date',
        getKey: (item) => [getYearAndWeekFromString(item.closedAtDate)],
    },
    dueAtDate: {
        label: 'Due date',
        getKey: (item) => [getYearAndWeekFromString(item.dueAtDate)],
    },
    siteCode: { label: 'Site Code' },
    projectIdentifier: { label: 'ProjectIdentifier' },
    swcrNo: { label: 'Swcr No' },
    priority: { label: 'Priority' },
    system: { label: 'System' },
    controlSystem: { label: 'Control System' },
    contract: { label: 'Contract' },
    action: { label: 'Action' },
    supplier: { label: 'Supplier' },
    node: { label: 'Node' },
    referenceTypes: { label: 'Reference Types' },
    nextSignRanking: { label: 'Next signature ' },
    cpkgNo: { label: 'CommPK' },
    cpkgPhase: { label: 'Phase' },
    status: { key: 'status', label: 'Status', getColumnSort: sortBySwcrStatusPriority },
};

export const getHighlighColumn = (groupByKey: string) => {
    return Boolean(groupByKey === 'createdAtDate' || groupByKey === 'dueAtDate')
        ? getYearAndWeekFromDate(new Date())
        : undefined;
};
export const customDescription = (item: SwcrPackage) => {
    return `${item.title} ${
        parseInt(item.estimatedManhours) > 0 ? `(${item.estimatedManhours}h)` : ''
    }`;
};

export const getItemWidth = (garden: GardenGroups<SwcrPackage>, groupByKey: string) => {
    const gardenItemList: GardenItemWithDepth<SwcrPackage>[] = [];
    const columnName = groupByKey
        .replace('nextSignatureBy', 'nextToSign')
        .replace('nextSignatureRole', 'nextToSign');
    garden.forEach((column) => {
        const gardenItems = getGardenItems(column);
        gardenItems && columnDataIsWithDepth(gardenItems) && gardenItemList.push(...gardenItems);
    });
    const longestKey = Math.max.apply(
        Math,
        gardenItemList.map((gardenItem) => {
            const titleLength = gardenItem.item?.[columnName]
                ? gardenItem.item[columnName].length
                : 0;
            return titleLength >= gardenItem.item.swcrNo.length
                ? titleLength
                : gardenItem.item.swcrNo.length;
        })
    );
    console.log(longestKey);
    return Math.max(longestKey * 8 + 85, 170);
};
