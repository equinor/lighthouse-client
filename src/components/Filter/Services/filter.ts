import { FilterActionGroup, FilterItem } from '../Types/FilterItem';
import { createFilterActionGroups } from '../Services/createFilterActionGroups';

/**
 * Recursively filters for every object key in active filters
 * @param data
 * @param filterActionGroups
 * @param groupValue
 * @param rejectedData
 * @returns
 */
function internalFilter<T>(
    data: T[],
    filterActionGroups: FilterActionGroup[],
    keepRejectedData: boolean,
    groupValue?: Record<string, (item: T) => string>,
    rejectedData?: T[]
): FilterReturn<T> {
    if (!filterActionGroups) {
        return { filteredData: data, rejectedData: [] };
    }

    /**
     * Current objectKey to filter on
     */
    const filterSection = filterActionGroups[0];

    //calculated filter value
    const getValue =
        groupValue && groupValue[filterSection.type] ? groupValue[filterSection.type] : undefined;

    let filteredData: T[] = [];
    let rejected: T[] = rejectedData || [];

    let filter;
    if (filterSection.action === 'Checked') {
        filter = filterOnCheckedItems(
            data,
            filterSection.type,
            filterSection.items,
            getValue,
            keepRejectedData
        );
    } else {
        filter = filterOnUncheckedItems(
            data,
            filterSection.type,
            filterSection.items,
            getValue,
            keepRejectedData
        );
    }
    filteredData = filter.filteredData;
    rejected = filter.rejectedData;
    filterActionGroups.shift();

    if (filterActionGroups.length !== 0) {
        return internalFilter(
            filteredData,
            filterActionGroups,
            keepRejectedData,
            groupValue,
            rejected
        );
    }

    return {
        filteredData,
        rejectedData: rejected,
    };
}

/**
 *
 * @param data
 * @param filterGroups
 * @param groupValue
 * @returns
 */
export function filter<T>(
    data: T[],
    filterGroups: Map<string, FilterItem[]>,
    groupValue: Record<string, (item: T) => string> | undefined,
    discardRejectedData?: boolean
): FilterReturn<T> {
    const filters = createFilterActionGroups(filterGroups);
    let keepRejectedData = true;
    if (discardRejectedData) {
        keepRejectedData = false;
    }
    let filteredData;
    let rejectedData;
    if (filters.length <= 0) {
        filteredData = data;
        rejectedData = [];
    } else {
        const filter = internalFilter(data, filters, keepRejectedData, groupValue, []);
        filteredData = [...filter.filteredData];
        rejectedData = filter.rejectedData;
    }
    return {
        filteredData,
        rejectedData,
    };
}

/**
 * Finds data that matches the unchecked items
 * @param data
 * @param filterKey
 * @param filterValues
 * @param getValue
 * @returns
 */
export function filterOnUncheckedItems<T>(
    data: T[],
    filterKey: string,
    filterValues: string[],
    getValue: false | '' | ((item: T) => string) | undefined,
    keepRejectedData: boolean
): FilterReturn<T> {
    /**
     * Data you want
     */
    const filteredData: T[] = [];
    /**
     * Data you dont want
     */
    const rejectedData: T[] = [];
    for (let i = 0; i < data.length; i++) {
        if (getValue) {
            if (!filterValues.includes(getValue(data[i]))) {
                filteredData.push(data[i]);
            } else {
                keepRejectedData && rejectedData.push(data[i]);
            }
        } else if (!filterValues.includes(data[i][filterKey])) {
            filteredData.push(data[i]);
        } else {
            keepRejectedData && rejectedData.push(data[i]);
        }
    }
    return {
        filteredData,
        rejectedData,
    };
}

/**
 * Finds data that matches the checked items
 * @param data
 * @param filterKey
 * @param filterValues
 * @param getValue
 * @returns
 */
export function filterOnCheckedItems<T>(
    data: T[],
    filterKey: string,
    filterValues: string[],
    getValue: ((item: T) => string) | undefined,
    keepRejectedData: boolean
): FilterReturn<T> {
    /**
     * Data you wanted
     */
    const filteredData: T[] = [];
    /**
     * Data you dont want
     */
    const rejectedData: T[] = [];

    for (let i = 0; i < data.length; i++) {
        if (getValue) {
            if (filterValues.includes(getValue(data[i]))) {
                filteredData.push(data[i]);
            } else {
                keepRejectedData && rejectedData.push(data[i]);
            }
        } else if (filterValues.includes(data[i][filterKey])) {
            filteredData.push(data[i]);
        } else {
            keepRejectedData && rejectedData.push(data[i]);
        }
    }

    return {
        filteredData,
        rejectedData,
    };
}

export interface FilterReturn<T> {
    filteredData: T[];
    rejectedData: T[];
}
