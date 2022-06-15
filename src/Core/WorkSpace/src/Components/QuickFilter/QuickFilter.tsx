import { tokens } from '@equinor/eds-tokens';
import { useWorkSpace } from '@equinor/WorkSpace';
import { useState } from 'react';
import styled from 'styled-components';
import { ClickableIcon } from '../../../../../packages/Components/Icon';
import { FilterView } from '../../../../../packages/Filter/Components/FilterView/FilterView';
import { useFilterApiContext } from '../../../../../packages/Filter/Hooks/useFilterApiContext';
import { FilterGroup } from './FilterGroup';
import { FilterQuickSearch } from './FilterQuickSearch';

export const QuickFilter = (): JSX.Element => {
    const [filterGroupOpen, setFilterGroupOpen] = useState<string | null>(null);

    const handleExpandFilterGroup = (groupName: string) =>
        filterGroupOpen === groupName ? setFilterGroupOpen(null) : setFilterGroupOpen(groupName);

    const {
        operations: { clearActiveFilters },
        filterState: { checkHasActiveFilters },
    } = useFilterApiContext();

    const { filterOptions = [] } = useWorkSpace();

    const groups = filterOptions
        ?.filter(({ isQuickFilter }) => isQuickFilter)
        .map(({ name }) => name);
    const expandedFilterGroups = filterOptions
        ?.filter(({ isQuickFilter }) => !isQuickFilter)
        .map(({ name }) => name);

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
                        {groups.map(
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

                        {checkHasActiveFilters() && (
                            <ClickableIcon name="clear" onClick={() => clearActiveFilters()} />
                        )}

                        <ClickableIcon
                            name={isFilterExpanded ? 'fullscreen_exit' : 'fullscreen'}
                            onClick={() => setIsFilterExpanded((s) => !s)}
                        />
                    </RightSection>
                </SearchLine>
            </CompactFilterWrapper>
            {isFilterExpanded && <FilterView groups={expandedFilterGroups} />}
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
