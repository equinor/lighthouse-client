import { FilterCollapseIcon } from '../../../../../../Core/WorkSpace/src/Components/QuickFilter/Icons/FilterCollapsIcon';
import { FilterExpandIcon } from '../../../../../../Core/WorkSpace/src/Components/QuickFilter/Icons/FilterExpandIcon';
import { ToggleHideFilterPopover } from '../../../../../../Core/WorkSpace/src/Components/QuickFilter/ToggleHideFilterPopover';
import { PowerBiFilter } from '../../../Types';
import { FilterClearIcon } from '../FilterClearIcon';
import { FilterItems } from './FilterItems';
import { ExpandedFilterWrapper, FilterItemsWrapper, Sidebar } from '../Styles';
import { FilterController } from '../types';

interface ExpandedFilterProps {
    controller: FilterController;
}

export function ExpandedFilter({ controller }: ExpandedFilterProps): JSX.Element {
    const {
        activeFilters,
        handleOnChange,
        slicerFilters,
        visibleFilters,
        setVisibleFilters,
        resetFilter,
        isFilterExpanded,
        setIsFilterExpanded,
        isAnyFiltersActive,
    } = controller;

    return (
        <ExpandedFilterWrapper>
            <FilterItemsWrapper>
                {visibleFilters.map((groupName) => (
                    <FilterItems
                        controller={controller}
                        handleOnChange={handleOnChange}
                        handleOnSelectAll={controller.handleOnSelectAll}
                        activeFilters={activeFilters}
                        group={slicerFilters.find((s) => s.type === groupName) as PowerBiFilter}
                        key={groupName}
                    />
                ))}
            </FilterItemsWrapper>
            <Sidebar>
                <div onClick={() => setIsFilterExpanded(!isFilterExpanded)}>
                    {isFilterExpanded ? <FilterCollapseIcon /> : <FilterExpandIcon />}
                </div>
                <FilterClearIcon
                    isDisabled={!isAnyFiltersActive()}
                    onClick={async () => await resetFilter()}
                />

                <ToggleHideFilterPopover
                    allFilters={slicerFilters.map((s) => s.type)}
                    setVisibleFilters={setVisibleFilters}
                    visibleFilters={visibleFilters}
                />
            </Sidebar>
        </ExpandedFilterWrapper>
    );
}
