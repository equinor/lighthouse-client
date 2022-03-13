import { FilterData, FilterItem } from '../Types/FilterItem';
import { parseGroupValueFunctions } from '../Utils/optionParse';

interface FilterGroup {
    type: string;
    values: string[];
}

function makeFilterItems(filter: FilterData): FilterItem[] {
    return Object.values(filter)
        .map((item) => {
            const items: FilterItem[] = [];

            Object.keys(item.value).forEach((itemKey) => {
                if (!item.value[itemKey].checked) {
                    items.push(item.value[itemKey]);
                }
            });

            return items;
        })
        .flat();
}

export function filter<T>(data: T[], filter: FilterData, groupValue?: string): T[] {
    if (data.length === 0) return [];
    const filterItems = makeFilterItems(filter);
    const groupValueFunctions = parseGroupValueFunctions(groupValue);

    const filterGroups: FilterGroup[] = filterItems
        .map((x) => x.type)
        .filter((v, i, a) => a.indexOf(v) === i)
        .map((group) => ({
            type: group,
            values: filterItems.filter((item) => item.type === group).map((x) => x.value),
        }));

    function valueFormatter(item: T, group: string): string {
        const getValue =
            groupValueFunctions &&
            typeof groupValueFunctions[group] === 'function' &&
            groupValueFunctions[group];
        return getValue ? getValue(item) : item[group];
    }

    return data.filter((item) =>
        filterGroups.every((group) => !group.values.includes(valueFormatter(item, group.type)))
    );
}
