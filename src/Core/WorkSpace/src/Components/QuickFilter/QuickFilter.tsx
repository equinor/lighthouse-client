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
import { Chip } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

export const QuickFilter = (): JSX.Element => {
    const [filterGroupOpen, setFilterGroupOpen] = useState<string | null>(null);

    const handleExpandFilterGroup = (groupName: string) =>
        filterGroupOpen === groupName ? setFilterGroupOpen(null) : setFilterGroupOpen(groupName);

    const {
        operations: { clearActiveFilters },
        filterState: { checkHasActiveFilters },
        filterGroupState: { getInactiveGroupValues },
    } = useFilterApiContext();

    const { filterOptions = [] } = useWorkSpace();

    const quickFilterGroups = filterOptions
        ?.filter(({ isQuickFilter }) => isQuickFilter)
        .map(({ name }) => name);

    const filterGroups = filterOptions.map(({ name }) => name);

    const [visibleFilterGroups, setVisibleFilterGroups] = useState<string[]>(
        filterOptions.filter((s) => !s.defaultHidden).map((s) => s.name)
    );

    const [isFilterExpanded, setIsFilterExpanded] = useState(false);

    const calculateHiddenFiltersApplied = () =>
        filterOptions.reduce(
            (acc, curr) =>
                !curr.isQuickFilter && getInactiveGroupValues(curr.name).length > 0 ? acc + 1 : acc,
            0
        );

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
                                <OtherFiltersAppliedInfo
                                    activeFilters={calculateHiddenFiltersApplied()}
                                />
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

interface OtherFiltersAppliedInfoProps {
    activeFilters: number;
}

export function OtherFiltersAppliedInfo({
    activeFilters,
}: OtherFiltersAppliedInfoProps): JSX.Element | null {
    if (activeFilters <= 0) return null;

    return <InfoChip>+{activeFilters} other filters applied</InfoChip>;
}

const InfoChip = styled(Chip)`
    background-color: ${tokens.colors.ui.background__info.hex};
    color: ${tokens.colors.text.static_icons__default.hex};
    font-weight: 500;
    font-size: 12px;
`;
