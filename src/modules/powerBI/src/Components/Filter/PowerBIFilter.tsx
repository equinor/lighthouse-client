import { models, Report } from 'powerbi-client';
import { useEffect, useState } from 'react';
import { PowerBiFilter, PowerBiFilterItem } from '../../Types';
import { getActiveFilterValues, getFilters } from '../../Utils';
import { FilterGroup } from './FilterGroup';
import { FilterItems } from './FilterItems';
import { FilterGroupWrap, FilterWrapper } from './Styles';

type PowerBIFilterProps = {
    report: Report | undefined;
    isLoaded: boolean;
    isFilterActive: boolean;
};
export const PowerBIFilter = ({
    isLoaded,
    report,
    isFilterActive,
}: PowerBIFilterProps): JSX.Element | null => {
    const [slicerFilters, setSlicerFilters] = useState<PowerBiFilter[] | null>(null);
    const [activeFilters, setActiveFilters] = useState<
        Record<string, (string | number | boolean)[]>
    >({});
    const [filterGroupVisible, setFilterGroupVisible] = useState<string[]>();

    const handleChangeGroup = (filter: PowerBiFilter) => {
        if (filterGroupVisible?.find((a) => a === filter.type) !== undefined) {
            setFilterGroupVisible(filterGroupVisible.filter((a) => a !== filter.type));
        } else {
            setFilterGroupVisible((prev) => [...(prev ? prev : []), filter.type]);
        }
    };

    /**
     * Function to handle "Select All" checkbox.
     * Will either add all possible filter values to current target, or remove all depending
     * on if checkbox is ticked or not.
     */
    const handleOnSelectAll = async (group: PowerBiFilter, filter: PowerBiFilterItem) => {
        try {
            const allFilterValues = group.filterVals;

            if (
                activeFilters[filter.type]?.length === allFilterValues?.length &&
                activeFilters[filter.type]?.every(
                    (value, index) => value === allFilterValues[index]
                )
            ) {
                // All filters are applied already, remove all
                setActiveFilters((prev) => ({ ...prev, [filter.type]: [] }));
                await group.slicer.setSlicerState({ filters: [] });
            } else {
                //Apply all possible filters
                const slicerFilter: models.IBasicFilter = {
                    $schema: 'http://powerbi.com/product/schema#basic',
                    target: filter.target!,
                    filterType: models.FilterType.Basic,
                    operator: 'In',
                    values: group.filterVals,
                };
                setActiveFilters((prev) => ({ ...prev, [filter.type]: group.filterVals }));
                await group.slicer?.setSlicerState({ filters: [slicerFilter] });
            }
        } catch (errors) {
            console.error("Couldn't select all filters", errors);
        }
    };

    /** Main function for handling user events on checkboxes for filters.
     * Will set new filters on slicer, or remove depending on if it already exists or not.
     */
    const handleOnChange = async (group: PowerBiFilter, filter: PowerBiFilterItem) => {
        try {
            const change = filter.value;

            // Get POWERBI filter
            let newConditions: (string | number | boolean)[] = [];
            if (activeFilters) {
                if (activeFilters[filter.type]?.includes(change)) {
                    newConditions = activeFilters[filter.type].filter((a) => a !== change);
                } else {
                    newConditions = [...activeFilters[filter.type], change];
                }
                setActiveFilters((prev) => ({ ...prev, [filter.type]: newConditions }));
            }
            // Set POWERBI filter to the new filter, not overriding previous filters
            const slicerFilter: models.IAdvancedFilter = {
                $schema: 'http://powerbi.com/product/schema#advanced',
                target: filter!.target!,
                filterType: models.FilterType.Advanced,
                logicalOperator: 'Or',
                conditions:
                    newConditions.length < 0
                        ? undefined
                        : newConditions.map((x) =>
                              x === '(Blank)'
                                  ? { operator: 'IsBlank' }
                                  : { operator: 'Is', value: x }
                          ),
            };
            await group.slicer?.setSlicerState({
                filters: newConditions.length > 0 ? [slicerFilter] : [],
            });
        } catch (errors) {
            console.error(errors);
        }
    };

    /**
     * Function for resetting all active filters.
     * Need to go through every slicer and set its filter state to empty.
     * Could not remove all filters on e.g. active page, so will need to loop through here.
     */
    const resetFilter = async () => {
        try {
            if (activeFilters && slicerFilters) {
                for (const filter of slicerFilters) {
                    await filter.slicer.setSlicerState({ filters: [] });
                }

                const emptyActiveFilters: Record<string, (string | number | boolean)[]> = {};
                for (const key in activeFilters) {
                    emptyActiveFilters[key] = [];
                }

                setActiveFilters(emptyActiveFilters);
            }
        } catch (errors) {
            console.error('Couldnt remove filters', errors);
        }
    };

    /**
     * Effect should be triggered when report has first loaded,
     * initializing all possible filters and also checking for default active filters.
     * Also need to handle when user changes page, so this effect has to also be triggered when
     * page is changed.
     */
    useEffect(() => {
        if (report && isLoaded) {
            (async () => {
                const filters = await getFilters(report);
                const defaultActiveFilters = await getActiveFilterValues(filters);
                setSlicerFilters(filters);
                setActiveFilters(defaultActiveFilters);
            })();
        }
    }, [report, isLoaded]);

    /**
     * Effect should be triggered when activeFilters has changed.
     * Some filters may not longer be applicable, therefore the need to get filters again.
     */
    useEffect(() => {
        if (report && isLoaded) {
            (async () => {
                const filters = await getFilters(report);
                setSlicerFilters(filters);
            })();
        }
    }, [activeFilters]);

    if (!slicerFilters) return null;

    return (
        <FilterWrapper isFilterActive={isFilterActive}>
            <FilterGroupWrap>
                <FilterGroup
                    slicerFilters={slicerFilters}
                    filterGroupVisible={filterGroupVisible}
                    handleChangeGroup={handleChangeGroup}
                    resetFilter={resetFilter}
                />
            </FilterGroupWrap>
            {slicerFilters.map((group) => (
                <FilterItems
                    filterGroupVisible={filterGroupVisible}
                    handleOnChange={handleOnChange}
                    handleOnSelectAll={handleOnSelectAll}
                    activeFilters={activeFilters}
                    group={group}
                    key={group.type}
                />
            ))}
        </FilterWrapper>
    );
};
