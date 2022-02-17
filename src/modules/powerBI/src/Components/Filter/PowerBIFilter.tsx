import { Button, Icon } from '@equinor/eds-core-react';
import { models, Report } from 'powerbi-client';
import { useEffect, useState } from 'react';
import { PowerBiFilter, PowerBiFilterItem } from '../../Types';
import { getActiveFilterValues, getFilters } from '../../Utils';
import { FilterGroup } from './FilterGroup';
import { FilterItems } from './FilterItems';
import { FilterGroupWrap, FilterWrapper, MenuItems, ResetFilter } from './Styles';

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
    const [isFilterSelectActive, setIsFilterSelectActive] = useState<boolean>(false);
    const handleChangeGroup = (filter: PowerBiFilter) => {
        if (filterGroupVisible?.find((a) => a === filter.type) !== undefined) {
            setFilterGroupVisible(filterGroupVisible.filter((a) => a !== filter.type));
        } else {
            setFilterGroupVisible((prev) => [...(prev ? prev : []), filter.type]);
        }
    };

    /**
     * Function to handle "Select All" checkbox.
     * Will either add all visble filter values to current target, or remove all depending
     * on if checkbox is ticked or not.
     */
    const handleOnSelectAll = async (
        group: PowerBiFilter,
        filter: PowerBiFilterItem,
        allVisibleFilterValues: string[]
    ) => {
        try {
            if (allVisibleFilterValues.every((a) => activeFilters[group.type]?.includes(a))) {
                /**
                 * All visible filters are applied.
                 * Remove the visible ones, and keep the ones not visible
                 * if they are applied.
                 */
                const newFilters = activeFilters[group.type]?.filter(
                    (filterVal) => !allVisibleFilterValues.includes(filterVal.toString())
                );

                const slicerFilter: models.IBasicFilter = {
                    $schema: 'http://powerbi.com/product/schema#basic',
                    target: filter.target!,
                    filterType: models.FilterType.Basic,
                    operator: 'In',
                    values: newFilters,
                };
                setActiveFilters((prev) => ({ ...prev, [filter.type]: newFilters }));
                await group.slicer.setSlicerState({
                    filters: newFilters.length !== 0 ? [slicerFilter] : [],
                });
            } else {
                /**
                 * Not all visible filter items are applied.
                 * Apply all the visible filter items,
                 * and also keep the not visible filter items that have been applied.
                 */

                const newFilter = [
                    ...new Set(activeFilters[filter.type].concat(allVisibleFilterValues)),
                ];

                const slicerFilter: models.IBasicFilter = {
                    $schema: 'http://powerbi.com/product/schema#basic',
                    target: filter.target!,
                    filterType: models.FilterType.Basic,
                    operator: 'In',
                    values: newFilter,
                };
                setActiveFilters((prev) => ({
                    ...prev,
                    [filter.type]: newFilter,
                }));
                await group.slicer?.setSlicerState({ filters: [slicerFilter] });
            }
        } catch (errors) {
            console.error("Couldn't select all filters", errors);
        }
    };

    /** Main function for handling user events on checkboxes for filters.
     * Will set new filters on slicer, or remove depending on if it already exists or not.
     */
    const handleOnChange = async (
        group: PowerBiFilter,
        filter: PowerBiFilterItem,
        singleClick = false
    ) => {
        try {
            const change = filter.value;

            let newConditions: (string | number | boolean)[] = [];

            if (activeFilters) {
                /** Either clicking on a label, only selecting this single one, deselect all others if any,
                 *  or clicking on a checkbox, selecting multiple ones, or deselecting.
                 */
                if (singleClick) {
                    if (activeFilters[filter.type]?.includes(change)) {
                        newConditions = activeFilters[filter.type].filter((a) => a === change);
                    } else {
                        newConditions = [change];
                    }
                    setActiveFilters((prev) => ({ ...prev, [filter.type]: newConditions }));
                } else {
                    if (activeFilters[filter.type]?.includes(change)) {
                        newConditions = activeFilters[filter.type].filter((a) => a !== change);
                    } else {
                        newConditions = [...activeFilters[filter.type], change];
                    }
                    setActiveFilters((prev) => ({ ...prev, [filter.type]: newConditions }));
                }
            }

            /**  Set POWERBI filter to the new filter */
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
                <MenuItems>
                    <Button
                        variant="ghost_icon"
                        onClick={() => setIsFilterSelectActive(!isFilterSelectActive)}
                    >
                        <Icon name={isFilterSelectActive ? 'close' : 'add'} />
                    </Button>
                    <ResetFilter onClick={async () => await resetFilter()}>
                        Reset filters
                    </ResetFilter>
                </MenuItems>
            </FilterGroupWrap>
            {isFilterSelectActive && (
                <FilterGroupWrap>
                    <FilterGroup
                        slicerFilters={slicerFilters}
                        filterGroupVisible={filterGroupVisible}
                        handleChangeGroup={handleChangeGroup}
                    />
                </FilterGroupWrap>
            )}

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
