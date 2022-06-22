import { Checkbox } from '@equinor/eds-core-react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';
import { ActiveFilter, PowerBiFilter, PowerBiFilterItem } from '../../../Types';
import { Header } from '../Header';
import { FilterController } from '../PowerBIFilter';
import { Item } from './Item';
import { searchFilterItems } from './searchFilterItems';
import { CheckboxWrap, FilterGroupContainer, VirtualFilterItemWrapper } from './Styles';

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
    const handleEnterPress = () => {
        handleOnSelectAll(
            group,
            filterValues[0],
            searchedFilterItems.map((s) => s.value)
        );
    };
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

    return (
        <FilterGroupContainer>
            <Header
                handleEnterPress={handleEnterPress}
                title={group.type}
                hasActiveFilters={Boolean(activeFilters[group.type].length)}
                controller={controller}
                deselectAllValues={() => controller.deselectAllValues(group, filterValues[0])}
                onSearch={handleOnSearchChange}
                searchEnabled={group.filterVals.length > 7}
            />
            <CheckboxWrap ref={parentRef}>
                {/* <Checkbox
                    onChange={async () =>
                        await handleOnSelectAll(group, filterValues[0], allSearchedFilterValues)
                    }
                    checked={checked}
                    label="Select all"
                /> */}
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
