import { FilterGroup, ValueFormatterFilter } from '../Hooks/useFilterApi';
import { findValueFormatter } from '../Utils/findValueFormatter';

export function doesItemPass<T>(
    item: T,
    state: FilterGroup[],
    valueFormatters: ValueFormatterFilter<T>[]
): boolean {
    /**
     * Item must pass all the filters
     */
    return state.every(({ name, values: uncheckedValues }) => {
        const valueFormatterFunction = findValueFormatter(name, valueFormatters);
        if (!valueFormatterFunction) return;

        const itemValue = valueFormatterFunction(item);
        /**
         * Item value is array
         */
        if (Array.isArray(itemValue)) {
            /** All values in the array must be unchecked for filter to remove the item */
            return !uncheckedValues.every((value) => itemValue.includes(value));
        } else {
            /** Returns false if it finds the value */
            return !uncheckedValues.includes(itemValue);
        }
    });
}
