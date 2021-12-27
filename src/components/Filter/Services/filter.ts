import { FilterItem } from '../Types/FilterItem';

function InternalFilter<T>(
    data: T[],
    filterActionGroups: FilterActionGroup[],
    groupValue?: Record<string, (item: T) => string>,
    rejectedData?: T[]
): FilterReturn<T> {
    if (!filterActionGroups) {
        return { filteredData: data, rejectedData: [] };
    }

    const filterSection = filterActionGroups[0];
    console.log(filterSection);

    //calculated filter value
    const getValue =
        groupValue && groupValue[filterSection.type] ? groupValue[filterSection.type] : undefined;

    let filteredData: T[] = [];
    let rejected: T[] = rejectedData || [];

    let filter;
    if (filterSection.action === 'Checked') {
        filter = filterOnCheckedItems(data, filterSection.type, filterSection.items, getValue);
    } else {
        filter = filterOnUncheckedItems(data, filterSection.type, filterSection.items, getValue);
    }
    filteredData = filter.filteredData;
    rejected = filter.rejectedData;
    filterActionGroups.shift();

    if (filterActionGroups.length !== 0) {
        return InternalFilter(filteredData, filterActionGroups, groupValue, rejected);
    }

    return {
        filteredData,
        rejectedData: rejected,
    };
}

export function filter<T>(
    data: T[],
    filterGroups: Map<string, FilterItem[]>,
    groupValue: Record<string, (item: T) => string> | undefined
): FilterReturn<T> {
    console.warn(filterGroups.size, ' is this correct????');

    const filters: FilterActionGroup[] = [];

    filterGroups.forEach((filterItems, filterGroupName) => {
        const checked: string[] = [];
        const unchecked: string[] = [];

        filterItems.forEach((element) => {
            if (element.checked) {
                checked.push(element.value);
            } else {
                unchecked.push(element.value);
            }
        });

        if (unchecked.length === 0 || checked.length === 0) {
            return;
        }
        let actionGroup: FilterActionGroup;

        if (unchecked.length < checked.length) {
            actionGroup = {
                action: 'Unchecked',
                items: unchecked,
                type: filterGroupName,
            };
        } else {
            actionGroup = {
                action: 'Checked',
                items: checked,
                type: filterGroupName,
            };
        }

        filters.push(actionGroup);
    });

    let filteredData;
    let rejectedData;
    if (filters.length <= 0) {
        filteredData = data;
        rejectedData = [];
    } else {
        const filter = InternalFilter(data, filters, groupValue);
        filteredData = [...filter.filteredData];
        rejectedData = filter.rejectedData;
    }
    return {
        filteredData,
        rejectedData,
    };
}

// console.log(filter[currentFilterKey].type);

//Find lowest amount of values to filter on

// for (let i = 0; i < filterKeys.length; i++) {
//     const currentFilterKey = filterKeys[i];
//     //FilterSection
//     const checked: string[] = [];
//     const unChecked: string[] = [];
//     //console.log(filter[currentFilterKey]);
//     /**
//      * Trying to determine if there are more checked boxes than unchecked. Makes the filtering faster
//      */
//     Object.keys(filter[currentFilterKey].value).map((filterValueKey) => {
//         //console.log(filterValueKey);
//         if (filterValueKey === undefined) {
//             return;
//         }
//         if (filter[currentFilterKey].value[filterValueKey].checked) {
//             checked.push(filter[currentFilterKey].value[filterValueKey].value);
//             filter[currentFilterKey].type;
//         } else {
//             unChecked.push(filter[currentFilterKey].value[filterValueKey].value);
//         }
//     });
//     let actionGroup: FilterActionGroup;

//     //If a sections has all boxes unchecked or checked there is nothing to do
//     if (unChecked.length === 0 || checked.length === 0) {
//         //console.log('All boxes either checked or unchecked');
//         continue;
//     }
//     // console.log(filter[currentFilterKey].type);

//     //Find lowest amount of values to filter on
//     if (unChecked.length < checked.length) {
//         actionGroup = {
//             action: 'Unchecked',
//             items: unChecked,
//             type: filter[currentFilterKey].type,
//         };
//     } else {
//         actionGroup = {
//             action: 'Checked',
//             items: checked,
//             type: filter[currentFilterKey].type,
//         };
//     }

//     filters.push(actionGroup);
// }

export interface FilterActionGroup {
    action: 'Checked' | 'Unchecked';
    type: string;
    items: string[];
}

export function filterOnUncheckedItems<T>(
    data: T[],
    filterKey: string,
    filterValues: string[],
    getValue: false | '' | ((item: T) => string) | undefined
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
                rejectedData.push(data[i]);
            }
        } else if (!filterValues.includes(data[i][filterKey])) {
            filteredData.push(data[i]);
        } else {
            rejectedData.push(data[i]);
        }
    }
    return {
        filteredData,
        rejectedData,
    };
}

export function filterOnCheckedItems<T>(
    data: T[],
    filterKey: string,
    filterValues: string[],
    getValue: ((item: T) => string) | undefined
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
                rejectedData.push(data[i]);
            }
        } else if (filterValues.includes(data[i][filterKey])) {
            filteredData.push(data[i]);
        } else {
            rejectedData.push(data[i]);
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
