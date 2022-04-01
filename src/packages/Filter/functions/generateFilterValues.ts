import { FilterGroup } from '../Hooks/useFilterApi';
import { FilterOptions, FilterValueType } from '../Types';

export function generateFilterValues<T>(
    filterConfiguration: FilterOptions<T>,
    data: T[]
): FilterGroup[] {
    if (!data || data.length == 0) return [];
    // Initialize all filter groups
    const filterGroups: FilterGroup[] = filterConfiguration.map(
        ({ name }): FilterGroup => ({ name: name, values: [] })
    );

    /** Iterate all values */
    data.forEach((item) =>
        filterConfiguration.forEach(({ name, valueFormatter }) => {
            const filterGroup = filterGroups.find(
                ({ name: filterGroupName }) => name === filterGroupName
            );
            if (!filterGroup) return;
            const value = valueFormatter(item);

            if (Array.isArray(value)) {
                if (value.length === 0) {
                    filterGroup.values = [
                        ...filterGroup.values.filter((value) => value !== null),
                        null,
                    ];
                } else {
                    filterGroup.values = [
                        ...filterGroup.values.filter((oldValue) => !value.includes(oldValue)),
                        ...value,
                    ];
                }
            } else {
                const singleValue = handlePossiblyEmptyString(value);

                filterGroup.values = [
                    ...filterGroup.values.filter((oldValue) => oldValue !== singleValue),
                    singleValue,
                ];
            }
        })
    );
    return sortFilterGroups(filterGroups);
}

/**
 * Returns null for empty string
 * @param value
 * @returns
 */
function handlePossiblyEmptyString(value: FilterValueType): FilterValueType {
    if (typeof value !== 'string') return value;

    return value.length === 0 ? null : value;
}

/**
 * Sorts the filter items alphanumeric.
 * PITFALL: Case sensitive sorting
 * A > T > a
 * @param groups
 * @returns
 */
function sortFilterGroups(groups: FilterGroup[]): FilterGroup[] {
    groups.forEach(({ values }) => values.sort());
    return groups;
}
