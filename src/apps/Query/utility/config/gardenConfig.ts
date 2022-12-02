import {
    getYearAndWeekFromDate,
    getYearAndWeekFromString,
    sortByNumber,
} from '@equinor/GardenUtils';

import { FieldSettings, GardenOptions } from '@equinor/ParkView';
import { CustomGardenItem } from '../../components';
import { Query } from '../../types';

export const fieldSettings: FieldSettings<Query> = {
    requiredAtDate: {
        label: 'Required date',
        getKey: (item) =>
            item.requiredAtDate ? getYearAndWeekFromString(item.requiredAtDate) : 'N/A',
        getColumnSort: sortByNumber,
    },
    nextToSign: { label: 'Next to sign' },
    milestone: { label: 'Milestone' },
    queryType: { label: 'Query type' },
    disciplineDescription: { label: 'Discipline' },
};

export const getHighlightedColumn = (groupByKey: string): string | undefined => {
    return groupByKey === 'requiredAtDate' ? getYearAndWeekFromDate(new Date()) : undefined;
};

export const customDescription = (item: Query): string => {
    return `${item.title}`;
};

export const gardenConfig: GardenOptions<Query> = {
    gardenKey: 'requiredAtDate' as keyof Query,
    itemKey: 'queryNo',
    objectIdentifier: 'queryNo',
    itemWidth: () => 200,
    rowHeight: 25,
    customViews: {
        customItemView: CustomGardenItem,
    },
    fieldSettings,
    highlightColumn: getHighlightedColumn,
    customDescription: customDescription,
};
