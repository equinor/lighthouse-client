import { Checkbox } from '@equinor/eds-core-react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';
import { ActiveFilter, PowerBiFilter, PowerBiFilterItem } from '../../../Types';
import { Header } from '../Header';
import { Item } from './Item';
import { searchFilterItems } from './searchFilterItems';
import { CheckboxWrap, FilterGroupContainer, VirtualFilterItemWrapper } from './Styles';

type FilterItemsProps = {
    filterGroupVisible: string[] | undefined;
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
};

export const FilterItems = ({
    filterGroupVisible,
    handleOnChange,
    handleOnSelectAll,
    activeFilters,
    group,
}: FilterItemsProps): JSX.Element | null => {
    const [searchValue, setSearchValue] = useState<string | undefined>();
    const parentRef = useRef<HTMLDivElement | null>(null);
    const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };
    const filterValues = Object.values(group.value);
    const searchedFilterItems = useMemo(
        () => searchFilterItems(filterValues, searchValue),
        [filterValues, searchValue]
    );
    const allSearchedFilterValues = searchedFilterItems.map((x) => x.value);
    const checked = useMemo(
        () =>
            allSearchedFilterValues.every((visibleFilterValue) =>
                activeFilters[group.type]?.includes(visibleFilterValue)
            ),
        [allSearchedFilterValues.length, activeFilters, group.type]
    );
    const rowLength = useMemo(() => searchedFilterItems.length, [searchedFilterItems]);
    const rowVirtualizer = useVirtual({
        size: rowLength,
        estimateSize: useCallback(() => 25, []),
        parentRef,
    });
    if (!filterGroupVisible) return null;

    if (filterGroupVisible.includes(group.type)) {
        return (
            <FilterGroupContainer>
                <Header title={group.type} onSearch={handleOnSearchChange} />
                <CheckboxWrap ref={parentRef}>
                    <Checkbox
                        onChange={async () =>
                            await handleOnSelectAll(group, filterValues[0], allSearchedFilterValues)
                        }
                        checked={checked}
                        label="Select all"
                    />
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
    } else return null;
};
