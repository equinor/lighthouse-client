import { useState } from 'react';

import { FilterView } from '../../../../../packages/Filter/Components/FilterView/FilterView';
import { useFilterApiContext } from '../../../../../packages/Filter/Hooks/useFilterApiContext';
import { FilterGroup } from './FilterGroup/FilterGroup';
import { FilterQuickSearch } from './FilterQuickSearch';
import { FilterCollapseIcon } from './Icons/FilterCollapsIcon';
import { FilterExpandIcon } from './Icons/FilterExpandIcon';
import { FilterClearIcon } from './Icons/FilterClear';
import { CompactFilterWrapper, SearchLine, LeftSection, RightSection } from './quickFilterStyles';
import { Chip } from '@equinor/eds-core-react-old';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { useWorkSpace } from '@equinor/WorkSpace';
import { RefreshButton } from '../DataViewerHeader/RefreshButton/RefreshButton';
import { ToggleHideFilterPopover } from './ToggleHideFilterPopover';

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

  const toggleFilterIsExpanded = () => {
    setIsFilterExpanded((s) => !s);
    setFilterGroupOpen(null);
  };

  const calculateHiddenFiltersApplied = () =>
    filterOptions.reduce(
      (acc, curr) =>
        !curr.isQuickFilter && getInactiveGroupValues(curr.name).length > 0 ? acc + 1 : acc,
      0
    );

  return (
    <Wrapper>
      <CompactFilterWrapper>
        <SearchLine>
          <LeftSection>
            <FilterQuickSearch />
          </LeftSection>
          <RightSection>
            {!isFilterExpanded && (
              <>
                {quickFilterGroups.map(
                  (group, i) =>
                    i < 7 && (
                      <FilterGroup
                        onClick={() => handleExpandFilterGroup(group)}
                        key={group}
                        isOpen={filterGroupOpen === group}
                        name={group}
                      />
                    )
                )}
                <OtherFiltersAppliedInfo activeFilters={calculateHiddenFiltersApplied()} />
              </>
            )}
            <div style={{ display: 'flex' }}>
              {isFilterExpanded && (
                <ToggleHideFilterPopover
                  allFilters={filterGroups}
                  setVisibleFilters={setVisibleFilterGroups}
                  visibleFilters={visibleFilterGroups}
                />
              )}
              <FilterClearIcon
                isDisabled={!checkHasActiveFilters()}
                onClick={() => clearActiveFilters()}
              />

              <RefreshButton />

              <div onClick={toggleFilterIsExpanded}>
                {isFilterExpanded ? <FilterCollapseIcon /> : <FilterExpandIcon />}
              </div>
            </div>
          </RightSection>
        </SearchLine>
      </CompactFilterWrapper>
      {isFilterExpanded && <FilterView visibleFilterGroups={visibleFilterGroups} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  overflow: scroll;
`;

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
  z-index: 0;
`;
