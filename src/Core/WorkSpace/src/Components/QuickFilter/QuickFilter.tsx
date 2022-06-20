import { useState } from 'react';
import { tokens } from '@equinor/eds-tokens';
import { useWorkSpace } from '@equinor/WorkSpace';
import styled from 'styled-components';

import { FilterView } from '../../../../../packages/Filter/Components/FilterView/FilterView';
import { useFilterApiContext } from '../../../../../packages/Filter/Hooks/useFilterApiContext';
import { FilterGroup } from './FilterGroup/FilterGroup';
import { FilterQuickSearch } from './FilterQuickSearch';
import { FilterCollapseIcon } from './Icons/FilterCollapsIcon';
import { FilterExpandIcon } from './Icons/FilterExpandIcon';
import { FilterClearIcon } from './Icons/FilterClear';

export const QuickFilter = (): JSX.Element => {
    const [filterGroupOpen, setFilterGroupOpen] = useState<string | null>(null);

    const handleExpandFilterGroup = (groupName: string) =>
        filterGroupOpen === groupName ? setFilterGroupOpen(null) : setFilterGroupOpen(groupName);

    const {
        operations: { clearActiveFilters },
        filterState: { checkHasActiveFilters },
    } = useFilterApiContext();

    const { filterOptions = [] } = useWorkSpace();

    const quickFilterGroups = filterOptions
        ?.filter(({ isQuickFilter }) => isQuickFilter)
        .map(({ name }) => name);

    const filterGroups = filterOptions.map(({ name }) => name);

    const [isFilterExpanded, setIsFilterExpanded] = useState(false);

    return (
        <>
            <CompactFilterWrapper>
                <SearchLine>
                    <LeftSection>
                        <FilterQuickSearch />
                        <VerticalDivider />
                    </LeftSection>
                    <RightSection>
                        {!isFilterExpanded && (
                            <>
                                {quickFilterGroups.map(
                                    (group, i) =>
                                        i < 5 && (
                                            <FilterGroup
                                                onClick={() => handleExpandFilterGroup(group)}
                                                key={group}
                                                isOpen={filterGroupOpen === group}
                                                name={group}
                                            />
                                        )
                                )}
                            </>
                        )}

                        <FilterClearIcon
                            isDisabled={!checkHasActiveFilters()}
                            onClick={() => clearActiveFilters()}
                        />

                        <div onClick={() => setIsFilterExpanded((s) => !s)}>
                            {isFilterExpanded ? <FilterCollapseIcon /> : <FilterExpandIcon />}
                        </div>
                    </RightSection>
                </SearchLine>
            </CompactFilterWrapper>
            {isFilterExpanded && <FilterView groups={filterGroups} />}
        </>
    );
};

const CompactFilterWrapper = styled.div`
    height: 50px;
    width: 100%;
    background-color: ${tokens.colors.ui.background__light.hex};
`;

const LeftSection = styled.div`
    display: flex;
    align-items: center;
    padding-left: 16px;
`;

const RightSection = styled.div`
    display: flex;
    gap: 2em;
    align-items: center;
    padding-right: 12px;
`;

const SearchLine = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const VerticalDivider = styled.div`
    border-color: ${tokens.colors.ui.background__medium.hex} 1px solid;
    height: 50px;
    width: 1px;
`;
