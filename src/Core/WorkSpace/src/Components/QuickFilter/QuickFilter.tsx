import { useState } from 'react';
import { useWorkSpace } from '@equinor/WorkSpace';

import { FilterView } from '../../../../../packages/Filter/Components/FilterView/FilterView';
import { useFilterApiContext } from '../../../../../packages/Filter/Hooks/useFilterApiContext';
import { FilterGroup } from './FilterGroup/FilterGroup';
import { FilterQuickSearch } from './FilterQuickSearch';
import { FilterCollapseIcon } from './Icons/FilterCollapsIcon';
import { FilterExpandIcon } from './Icons/FilterExpandIcon';
import { FilterClearIcon } from './Icons/FilterClear';
import {
    CompactFilterWrapper,
    SearchLine,
    LeftSection,
    VerticalDivider,
    RightSection,
} from './quickFilterStyles';

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

    const [visibleFilterGroups, setVisibleFilterGroups] = useState<string[]>(
        filterOptions.map((s) => s.name)
    );

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
            {isFilterExpanded && (
                <FilterView
                    setVisibleFilterGroups={setVisibleFilterGroups}
                    visibleFilterGroups={visibleFilterGroups}
                    groups={filterGroups}
                />
            )}
        </>
    );
};
