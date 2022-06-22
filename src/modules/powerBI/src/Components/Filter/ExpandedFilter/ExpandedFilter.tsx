import styled from 'styled-components';
import { FilterCollapseIcon } from '../../../../../../Core/WorkSpace/src/Components/QuickFilter/Icons/FilterCollapsIcon';
import { FilterExpandIcon } from '../../../../../../Core/WorkSpace/src/Components/QuickFilter/Icons/FilterExpandIcon';
import { ToggleHideFilterPopover } from '../../../../../../Core/WorkSpace/src/Components/QuickFilter/ToggleHideFilterPopover';
import { PowerBiFilter } from '../../../Types';
import { FilterClearIcon } from '../FilterClearIcon';
import { FilterItems } from '../FilterItems';
import { FilterController } from '../PowerBIFilter';
import { FilterItemsWrapper } from '../Styles';

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
        <div style={{ display: 'flex', height: '250px' }}>
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
                <FilterClearIcon
                    isDisabled={!isAnyFiltersActive()}
                    onClick={async () => await resetFilter()}
                />

                <ToggleHideFilterPopover
                    allFilters={slicerFilters.map((s) => s.type)}
                    setVisibleFilters={setVisibleFilters}
                    visibleFilters={visibleFilters}
                />

                <div onClick={() => setIsFilterExpanded(!isFilterExpanded)}>
                    {isFilterExpanded ? <FilterCollapseIcon /> : <FilterExpandIcon />}
                </div>
            </Sidebar>
        </div>
    );
}

const Sidebar = styled.div`
    width: 30px;
    height: 250px;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 20px 20px;
`;
