import { tokens } from '@equinor/eds-tokens';
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

const ExpandedFilterWrapper = styled.div`
    display: flex;
    height: 250px;
    overflow: hidden;
    border-bottom: 1px solid ${tokens.colors.ui.background__medium.hex};
`;

const Sidebar = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: -2px 0px 5px 0px rgba(0, 0, 0, 0.24);
`;
