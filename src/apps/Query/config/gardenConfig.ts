import {
    getYearAndWeekFromDate,
    getYearAndWeekFromString,
    sortByNumber,
} from '@equinor/GardenUtils';

import { FieldSettings, GardenOptions } from '@equinor/ParkView';
import { Query } from '../model/query';
import QueryGardenItem from '../components/queryGardenItem/queryGardenItem';

export const fieldSettings: FieldSettings<Query> = {
    requiredAtDate: {
        label: 'Required date',
        getKey: (item) => [getYearAndWeekFromString(item.requiredAtDate)],
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

export const customDescription = (item: Query) => {
    return `${item.title}`;
};

export const gardenConfig: GardenOptions<Query> = {
    gardenKey: 'requiredAtDate' as keyof Query,
    itemKey: 'queryNo',
    objectIdentifier: 'queryNo',
    itemWidth: () => 200,
    rowHeight: 25,
    customViews: {
        customItemView: QueryGardenItem,
    },
    fieldSettings,
    highlightColumn: getHighlightedColumn,
    customDescription: customDescription,
};
