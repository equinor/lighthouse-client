import { models } from 'powerbi-client';
import { PowerBiFilterItem } from '../Types';

/**
 * Will return true if all visible filters
 * (visible meaning you have searched something and only a selection is showing)
 * have already been applied.
 */
export const areAllVisibleFiltersApplied = (
    allVisibleFilterValues: string[],
    activeFilters: (string | number | boolean)[]
): boolean => {
    return allVisibleFilterValues.every((visibleValue) => activeFilters?.includes(visibleValue));
};

export const removeVisibleFilters = (
    allVisibleFilterValues: string[],
    activeFilters: (string | number | boolean)[]
): (string | number | boolean)[] => {
    return activeFilters?.filter(
        (filterVal) => !allVisibleFilterValues.includes(filterVal.toString())
    );
};

export const createAdvancedPbiFilter = (
    filter: PowerBiFilterItem,
    newFilters: (string | number | boolean)[]
): models.IAdvancedFilter => {
    return {
        $schema: 'http://powerbi.com/product/schema#advanced',
        target: filter.target!,
        filterType: models.FilterType.Advanced,
        logicalOperator: 'Or',
        conditions:
            newFilters.length < 0
                ? undefined
                : newFilters.map((x) =>
                      x === '(Blank)' ? { operator: 'IsBlank' } : { operator: 'Is', value: x }
                  ),
    };
};
