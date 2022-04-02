import { FilterGroup, ValueFormatterFilter } from '../Hooks/useFilterApi';
import { FilterValueType } from '../Types';
import { findValueFormatter } from '../Utils/findValueFormatter';

export function doesItemPassFilter<T>(
    item: T,
    state: FilterGroup[],
    valueFormatters: ValueFormatterFilter<T>[]
): boolean {
    /** Item must pass all the filters */
    return state.every(({ name, values: uncheckedValues }) => {
        const valueFormatterFunction = findValueFormatter(name, valueFormatters);
        if (!valueFormatterFunction) return;

        const itemValue = valueFormatterFunction(item);
        return doesItemPassCriteria(uncheckedValues, itemValue);
    });
}

function doesItemPassCriteria(
    uncheckedValues: FilterValueType[],
    item: FilterValueType | FilterValueType[]
): boolean {
    /**
     * Item value is array
     */
    if (Array.isArray(item)) {
        if (item.length === 0) {
            return !uncheckedValues.includes(null);
        }

        /** All values in the array must be unchecked for filter to remove the item */
        return !item.every((value) => uncheckedValues.includes(value));
    } else {
        /** Returns false if it finds the value */
        return !uncheckedValues.includes(item);
    }
}
