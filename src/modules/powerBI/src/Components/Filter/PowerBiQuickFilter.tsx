import styled from 'styled-components';
import { FilterClearIcon } from '../../../../../Core/WorkSpace/src/Components/QuickFilter/Icons/FilterClear';
import { FilterCollapseIcon } from '../../../../../Core/WorkSpace/src/Components/QuickFilter/Icons/FilterCollapsIcon';
import { FilterExpandIcon } from '../../../../../Core/WorkSpace/src/Components/QuickFilter/Icons/FilterExpandIcon';
import { CompactFilterWrapper } from '../../../../../Core/WorkSpace/src/Components/QuickFilter/quickFilterStyles';

import { PowerBiFilterItem } from '../../Types';
import { ExpandedFilter } from './ExpandedFilter/ExpandedFilter';
import { PowerBiFilterGroup } from './FilterGroup/FilterGroup';
import { FilterController } from './PowerBIFilter';

interface PowerBIQuickFilterProps {
    controller: FilterController;
}

const FilterBar = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 2em;
    align-items: center;
`;

export const PowerBIQuickFilter = ({ controller }: PowerBIQuickFilterProps): JSX.Element => {
    const {
        activeFilters,
        handleOnChange,
        isAnyFiltersActive,
        resetFilter,
        slicerFilters,
        isFilterExpanded,
        setIsFilterExpanded,
    } = controller;

    return (
        <FilterWrapper>
            {!isFilterExpanded && (
                <CompactFilterWrapper>
                    <FilterBar>
                        <>
                            {slicerFilters.map(
                                (s, i) =>
                                    i < 10 && (
                                        <PowerBiFilterGroup
                                            activeFilters={activeFilters[s.type]}
                                            controller={controller}
                                            handleOnChange={(
                                                filter: PowerBiFilterItem,
                                                singleClick?: boolean
                                            ) => handleOnChange(s, filter, singleClick)}
                                            group={s}
                                            key={s.type + i}
                                        />
                                    )
                            )}
                            <FilterButtonContainer>
                                <FilterClearIcon
                                    isDisabled={!isAnyFiltersActive()}
                                    onClick={async () => await resetFilter()}
                                />

                                <div onClick={() => setIsFilterExpanded(!isFilterExpanded)}>
                                    {isFilterExpanded ? (
                                        <FilterCollapseIcon />
                                    ) : (
                                        <FilterExpandIcon />
                                    )}
                                </div>
                            </FilterButtonContainer>
                        </>
                    </FilterBar>
                </CompactFilterWrapper>
            )}
            {isFilterExpanded && <ExpandedFilter controller={controller} />}
        </FilterWrapper>
    );
};

const FilterButtonContainer = styled.div`
    display: flex;
    align-items: center;
`;

const FilterWrapper = styled.div``;
