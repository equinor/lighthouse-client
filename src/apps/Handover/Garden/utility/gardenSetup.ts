import { getYearAndWeekFromDate } from '@equinor/GardenUtils';
import { getDateFromString, getFieldKeyBasedOnPlannedForecast } from '.';
import {
    getGardenItems,
    isSubGroup,
} from '../../../../components/ParkView/Components/VirtualGarden/utils';
import { GardenGroups } from '../../../../components/ParkView/Models/data';
import { FieldSettings } from '../../../../components/ParkView/Models/fieldSettings';
import { HandoverCustomGroupByKeys } from '../models';
import { HandoverPackage } from '../models/handoverPackage';
import { getDateKey, getProgressKey, getYearAndWeekAndDayFromString } from './getKeyFunctions';
import { sortByNumber } from './sortFunctions';

export type ExtendedGardenFields = 'RFCC' | 'TAC' | 'RFOC' | 'DCC' | 'RFRC';

export const fieldSettings: FieldSettings<HandoverPackage, ExtendedGardenFields> = {
    RFCC: { label: 'RFCC', getKey: getDateKey, getColumnSort: sortByNumber },
    TAC: { label: 'TAC', getKey: getDateKey, getColumnSort: sortByNumber },
    RFOC: { label: 'RFOC', getKey: getDateKey, getColumnSort: sortByNumber },
    DCC: { label: 'DCC', getKey: getDateKey, getColumnSort: sortByNumber },
    RFRC: { label: 'RFRC', getKey: getDateKey, getColumnSort: sortByNumber },
    responsible: { label: 'Comm Pkg Responsible' },
    area: { label: 'Comm Pkg Area' },
    phase: { label: 'Comm Pkg Phase' },
    progress: { label: 'Comm Pkg Progress', getKey: getProgressKey, getColumnSort: sortByNumber },
    system: { label: 'System' },
    priority1: { label: 'Commissioning Priority 1' },
    priority2: { label: 'Commissioning Priority 2' },
    priority3: { label: 'Commissioning Priority 3' },
};

export const removedFilterOptions: (keyof HandoverPackage)[] = [
    'createdDate',
    'tacActualDate',
    'plannedTacDate',
    'rfocActualDate',
    'actualStartDate',
    'rfccShippedDate',
    'rfocPlannedDate',
    'rfocShippedDate',
    'actualFinishDate',
    'plannedStartDate',
    'rfocForecastDate',
    'forecastStartDate',
    'forecastTacDate',
    'plannedFinishDate',
    'forecastFinishDate',
    'demolitionActualStartDate',
    'demolitionDCCAcceptedDate',
    'demolitionRFRCShippedDate',
    'demolitionActualFinishDate',
    'demolitionActualStartDate',
    'demolitionPlannedStartDate',
    'demolitionPlannedFinishDate',
    'demolitionForecastStartDate',
    'demolitionForecastFinishDate',
    'projectDescription',
    'priority1Description',
    'priority2Description',
    'priority3Description',
    'url',
    'id',
    'volume',
    'mcPkgsCount',
    'mcPkgsRFCCShippedCount',
    'mcPkgsRFCCSigned',
    'mcPkgsRFOCShipped',
    'mcPkgsRFOCSigned',
    'rowKey',
];

export const getItemWidth = (
    garden: GardenGroups<HandoverPackage>,
    groupByKey: string,
    customGroupByKeys: Record<string, unknown> | undefined
) => {
    const customKeys = customGroupByKeys as HandoverCustomGroupByKeys;
    const columnName = getFieldKeyBasedOnPlannedForecast(groupByKey, customKeys?.plannedForecast);
    const minWidth = 139;
    let gardenItemList: HandoverPackage[] = [];
    garden.forEach((column) => {
        const gardenItems = getGardenItems(column);
        gardenItems &&
            gardenItems.forEach((gardenItem) => {
                !isSubGroup(gardenItem) && gardenItemList.push(gardenItem.item);
            });
    });
    const longestKey = Math.max.apply(
        Math,
        gardenItemList.map((item) => {
            const titleLength = item[columnName] ? item[columnName]?.toString().length : 0;
            return titleLength >= item.commpkgNo.length ? titleLength : item.commpkgNo.length;
        })
    );
    return Math.max(longestKey * 8 + 80, minWidth);
};

export const getHighlightedColumn = (
    groupByKey: string,
    customGroupByKeys: Record<string, unknown> | undefined
) => {
    const customKeys = customGroupByKeys as HandoverCustomGroupByKeys;
    const groupByOption = getFieldKeyBasedOnPlannedForecast(
        groupByKey,
        customKeys?.plannedForecast
    );
    switch (groupByOption) {
        case 'plannedFinishDate':
        case 'forecastFinishDate':
        case 'plannedStartDate':
        case 'forecastStartDate':
        case 'plannedTacDate':
        case 'forecastTacDate':
        case 'demolitionPlannedStartDate':
        case 'demolitionForecastStartDate':
        case 'demolitionPlannedFinishDate':
        case 'demolitionForecastFinishDate':
            return customKeys?.weeklyDaily === 'Daily'
                ? getYearAndWeekAndDayFromString(new Date().toString())
                : getYearAndWeekFromDate(new Date());

        default:
            return undefined;
    }
};
