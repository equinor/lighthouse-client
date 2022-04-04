import { getYearAndWeekFromDate, sortByNumber } from '@equinor/GardenUtils';
import {
    getGardenItems,
    isSubGroup,
} from '../../../../components/ParkView/Components/VirtualGarden/utils';
import { GardenGroups } from '../../../../components/ParkView/Models/data';
import { FieldSettings } from '../../../../components/ParkView/Models/fieldSettings';
import { WorkOrder } from '../models';
import { columnKeyAccessor, getGroupBy } from './groupByUtils';
export type ExtendedGardenFields = 'fwp' | 'hwp' | 'wp';
export const fieldSettings: FieldSettings<WorkOrder, ExtendedGardenFields> = {
    wp: {
        label: 'Workorder production',
        getKey: columnKeyAccessor,
        getColumnSort: sortByNumber,
    },
    hwp: {
        label: 'Hours ready for execution at site',
        getKey: columnKeyAccessor,
        getColumnSort: sortByNumber,
    },
    fwp: {
        label: 'Finalizing of workorder at site',
        getKey: columnKeyAccessor,
        getColumnSort: sortByNumber,
    },
    responsibleCode: {
        label: 'Responsible',
    },
    disciplineCode: {
        label: 'Discipline',
    },
    milestone: {
        label: 'Milestone',
    },
};

export const getHighlightedColumn = (groupByKey: string) => {
    const groupBy = getGroupBy(groupByKey);

    switch (groupBy) {
        case 'plannedStartDate':
        case 'plannedFinishDate':
            return getYearAndWeekFromDate(new Date());
        default:
            return undefined;
    }
};

export const getItemWidth = (garden: GardenGroups<WorkOrder>, groupByKey: string) => {
    const columnName = groupByKey.replace('Code', '');
    const checkHeaderLength = ['milestone', 'responsible', 'discipline'].includes(columnName);
    let gardenItemList: WorkOrder[] = [];
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
            const titleLength =
                checkHeaderLength && item?.[columnName] ? item[columnName].length : 0;
            return titleLength >= item.workOrderNumber.length
                ? titleLength
                : item.workOrderNumber.length;
        })
    );

    return Math.max(longestKey * 8 + 80, 102);
};
