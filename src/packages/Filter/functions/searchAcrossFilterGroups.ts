import { ValueFormatterFilter } from '../Hooks/useFilterApi';

/**
 * Searchs for values matching atleast one of the filter groups values
 * @param valueFormatters
 * @param data
 * @param searchValue
 * @returns
 */
export function searchAcrossFilterGroups<T = unknown>(
    valueFormatters: ValueFormatterFilter<T>[],
    data: T[],
    searchValue: string
): T[] {
    return data.filter((value) =>
        valueFormatters.some(({ valueFormatter }) =>
            valueFormatter(value)?.toString().toLowerCase().startsWith(searchValue)
        )
    );
}
