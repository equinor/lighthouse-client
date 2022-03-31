import { FilterGroup } from '../Hooks/useFilterApi';
import { FilterOptions } from '../Types';

export function generateFilterValues<T>(
    filterConfiguration: FilterOptions<T>,
    data: T[]
): FilterGroup[] {
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
            /** Append and remove duplicates */
            filterGroup.values = Array.isArray(value)
                ? [...filterGroup.values.filter((oldValue) => !value.includes(oldValue)), ...value]
                : [...filterGroup.values.filter((oldValue) => oldValue !== value), value];
        })
    );
    return filterGroups;
}
