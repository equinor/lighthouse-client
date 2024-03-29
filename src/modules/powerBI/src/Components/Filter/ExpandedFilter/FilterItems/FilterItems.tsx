import { useCallback, useMemo, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { ActiveFilter, PowerBiFilter, PowerBiFilterItem } from '../../../../Types';
import { Header } from './Header';
import { FilterController } from '../../types';
import { Item } from './Item';
import { searchFilterItems } from './searchFilterItems';
import { CheckboxWrap, FilterGroupContainer, VirtualFilterItemWrapper } from './Styles';
import { useStore } from './FilterItemsProvider';
import { useClickOutside } from '@equinor/lighthouse-utils';

type FilterItemsProps = {
  handleOnChange: (
    group: PowerBiFilter,
    filter: PowerBiFilterItem,
    singleClick?: boolean
  ) => Promise<void>;
  handleOnSelectAll: (
    group: PowerBiFilter,
    filter: PowerBiFilterItem,
    allVisibleFilterValues: string[]
  ) => Promise<void>;
  activeFilters: Record<string, ActiveFilter[]>;
  group: PowerBiFilter;
  controller: FilterController;
};

export const FilterItems = ({
  handleOnChange,
  handleOnSelectAll,
  activeFilters,
  controller,
  group,
}: FilterItemsProps): JSX.Element | null => {
  const [searchStore, setSearchStore] = useStore((store) => store);

  const parentRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const closeSearchBox = useCallback(() => {
    if (searchStore.isSearchActive) {
      setSearchStore({ isSearchActive: false, searchValue: '' });
    }
  }, [searchStore.isSearchActive, setSearchStore]);

  const filterValues = group?.value && Object.values(group?.value);
  const searchedFilterItems = useMemo(
    () => searchFilterItems(filterValues ?? [], searchStore.searchValue),
    [filterValues, searchStore.searchValue]
  );
  const handleEnterPress = () => {
    if (filterValues && filterValues.length > 0) {
      handleOnSelectAll(
        group,
        filterValues[0],
        searchedFilterItems.map((s) => s.value)
      );
      setSearchStore({ searchValue: '' });
    }
  };

  const rowLength = useMemo(() => searchedFilterItems.length, [searchedFilterItems]);
  const rowVirtualizer = useVirtual({
    size: rowLength,
    estimateSize: useCallback(() => 25, []),
    parentRef,
  });

  useClickOutside(filterRef, closeSearchBox);

  if (!filterValues || !activeFilters[group.type]) {
    return null;
  }

  return (
    <FilterGroupContainer ref={filterRef}>
      <Header
        handleEnterPress={handleEnterPress}
        title={group.type}
        hasActiveFilters={Boolean(activeFilters[group.type].length)}
        deselectAllValues={() => controller.deselectAllValues(group, filterValues[0])}
        searchEnabled={group.filterVals.length > 7}
      />
      <CheckboxWrap ref={parentRef}>
        <VirtualFilterItemWrapper style={{ height: `${rowVirtualizer.totalSize}px` }}>
          {rowVirtualizer.virtualItems.map((virtualItem) => {
            const filter = searchedFilterItems[virtualItem.index];
            return (
              <Item
                activeFilters={activeFilters[filter.type] || []}
                filter={filter}
                group={group}
                handleOnChange={handleOnChange}
                key={filter.value}
                virtualItemSize={virtualItem.size}
                virtualItemStart={virtualItem.start}
              />
            );
          })}
        </VirtualFilterItemWrapper>
      </CheckboxWrap>
    </FilterGroupContainer>
  );
};
