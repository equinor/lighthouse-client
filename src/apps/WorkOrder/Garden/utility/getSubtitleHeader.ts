import { getYearAndWeekFromDate, FollowUpStatuses } from '@equinor/GardenUtils';
import {
    getGardenItems,
    isSubGroup,
} from '../../../../components/ParkView/Components/VirtualGarden/utils';
import { GardenGroups } from '../../../../components/ParkView/Models/data';
import { WorkOrder } from '../models';
import { getFollowUpStatus } from './statusUtils';
const shouldCountHours = (workOrder: WorkOrder) =>
    workOrder?.plannedStartupDate?.length &&
    [FollowUpStatuses.MaterialAndWoOk, FollowUpStatuses.MaterialAndWoAvailable].includes(
        getFollowUpStatus(workOrder)
    );
export const getSubtitleHeader = (
    garden: GardenGroups<WorkOrder>,
    columnIndex: number,
    columnIsExpanded: boolean,
    groupByKey?: string
) => {
    if (groupByKey !== 'hwp') {
        return;
    }
    const headerValue = garden[columnIndex].value;
    const currentWeekAndYear = getYearAndWeekFromDate(new Date());
    const headerValueIsToday = headerValue.localeCompare(currentWeekAndYear, 'en', {
        numeric: true,
    });
    const items = garden[columnIndex].items;
    let gardenItemList: WorkOrder[] = [];
    garden.forEach((column) => {
        const gardenItems = getGardenItems(column);
        gardenItems &&
            gardenItems.forEach((gardenItem) => {
                !isSubGroup(gardenItem) && gardenItemList.push(gardenItem.item);
            });
    });
    let hours: number[] = [];
    let expandedColumnHours: string = '';
    if (headerValueIsToday === 0) {
        const currentWeekAndYearAsInt = parseInt(currentWeekAndYear.replace(/\//gi, ''), 10);
        hours = gardenItemList
            .filter(shouldCountHours)
            .filter(
                (wo) =>
                    parseInt(
                        getYearAndWeekFromDate(new Date(wo.plannedStartupDate || '')).replace(
                            /\//gi,
                            ''
                        ),
                        10
                    ) -
                        currentWeekAndYearAsInt <=
                    0
            )
            .map((wo) => Number(wo?.remainingHours));
    } else {
        hours = items.filter(shouldCountHours).map((wo) => Number(wo?.remainingHours)) || [0];
    }

    if (headerValueIsToday === 0 && columnIsExpanded) {
        const weekHours = (
            items.filter(shouldCountHours).map((wo) => Number(wo?.remainingHours) || 0) || [0]
        ).reduce((acc, curr) => (acc += curr), 0);

        const totalRemainingHours = hours.reduce((acc, curr) => (acc += curr), 0);

        expandedColumnHours = `R: ${weekHours.toFixed(2)}h + ${(
            totalRemainingHours - weekHours
        ).toFixed(2)}h`;
    }

    const sumLabel = expandedColumnHours.length
        ? expandedColumnHours
        : 'R: ' + hours.reduce((acc, curr) => (acc += curr), 0).toFixed(2) + 'h';
    return sumLabel;
};
