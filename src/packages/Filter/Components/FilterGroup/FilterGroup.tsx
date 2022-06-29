import { Icon, Search } from '@equinor/eds-core-react';
import { Case, Switch } from '@equinor/JSX-Switch';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';
import { FilterClearIcon } from '../../../../Core/WorkSpace/src/Components/QuickFilter/Icons/FilterClear';
import { useWorkSpace } from '../../../../Core/WorkSpace/src/WorkSpaceApi/useWorkSpace';
import { FilterGroup } from '../../Hooks/useFilterApi';
import { useFilterApiContext } from '../../Hooks/useFilterApiContext';
import { FilterItemValue } from '../FilterItem/FilterItem';
import {
    FilterHeaderGroup,
    SearchButton,
    Title,
    VirtualFilterContainer,
    VirtualFilterItemWrapper,
    Wrapper,
} from './FilterGroupStyles';
import { convertFromBlank, DEFAULT_NULL_VALUE, searchByValue } from './utils';

interface FilterGroupeComponentProps {
    filterGroup: FilterGroup;
    hideTitle?: boolean;
}

export const FilterGroupeComponent: React.FC<FilterGroupeComponentProps> = ({
    filterGroup,
}: FilterGroupeComponentProps) => {
    const {
        filterGroupState: { getInactiveGroupValues },
        filterState: { getFilterState },
        operations: { markAllValuesActive, setFilterState },
    } = useFilterApiContext();

    const [filterSearchValue, setFilterSearchValue] = useState('');
    const [searchActive, setSearchActive] = useState(false);

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFilterSearchValue(value);
    }

    function handleSearchButtonClick() {
        setSearchActive((isActive) => !isActive);
    }

    const isSearchable = filterGroup.values.length > 10;
    const hasAnyActiveFilters = Boolean(getInactiveGroupValues(filterGroup.name).length);

    const groupsMatchingSearch = useMemo(
        () =>
            searchByValue(
                filterGroup.values.map((v) => (v !== null ? v.toString() : DEFAULT_NULL_VALUE)),
                filterSearchValue
            ),
        [filterGroup.values, filterSearchValue]
    );

    return (
        <Wrapper>
            <FilterHeaderGroup isActive={hasAnyActiveFilters}>
                <Switch>
                    <Case when={searchActive}>
                        <Search
                            autoFocus={searchActive}
                            onBlur={() => {
                                setSearchActive(false);
                                setFilterSearchValue('');
                            }}
                            aria-label="in filter group"
                            id="search-normal"
                            placeholder="Search"
                            onChange={handleOnChange}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    setFilterState([
                                        ...getFilterState().filter(
                                            (s) => s.name !== filterGroup.name
                                        ),
                                        {
                                            name: filterGroup.name,
                                            values: filterGroup.values.filter(
                                                (s) =>
                                                    !groupsMatchingSearch.includes(
                                                        s?.toString() ?? '(Blank)'
                                                    )
                                            ),
                                        },
                                    ]);
                                    setFilterSearchValue('');
                                    setSearchActive(false);
                                }
                            }}
                        />
                    </Case>
                    <Case when={true}>
                        <Title
                            onClick={() => isSearchable && handleSearchButtonClick()}
                            hasFilters={hasAnyActiveFilters}
                        >
                            {filterGroup.name}
                        </Title>
                        {isSearchable && (
                            <SearchButton variant="ghost_icon" onClick={handleSearchButtonClick}>
                                <Icon name={'search'} id={'search'} />
                            </SearchButton>
                        )}
                        {hasAnyActiveFilters && (
                            <FilterClearIcon
                                onClick={() => markAllValuesActive(filterGroup.name)}
                            />
                        )}
                    </Case>
                </Switch>
            </FilterHeaderGroup>
            <VirtualContainer filterGroup={filterGroup} filterSearchValue={filterSearchValue} />
        </Wrapper>
    );
};

interface VirtualContainerProps {
    filterGroup: FilterGroup;
    filterSearchValue: string;
}

export const VirtualContainer = ({
    filterGroup,
    filterSearchValue,
}: VirtualContainerProps): JSX.Element | null => {
    const {
        filterState: { getValueFormatters },
    } = useFilterApiContext();
    const { filterOptions } = useWorkSpace();

    const groupsMatchingSearch = useMemo(
        () =>
            searchByValue(
                filterGroup.values.map((v) => (v !== null ? v.toString() : DEFAULT_NULL_VALUE)),
                filterSearchValue
            ),
        [filterGroup.values, filterSearchValue]
    );

    const rowLength = useMemo(() => groupsMatchingSearch.length, [groupsMatchingSearch]);

    const parentRef = useRef<HTMLDivElement | null>(null);

    const valueFormatter = getValueFormatters().find(
        ({ name }) => name === filterGroup.name
    )?.valueFormatter;

    const rowVirtualizer = useVirtual({
        parentRef,
        size: rowLength,
        estimateSize: useCallback(() => 20, []),
    });
    if (!valueFormatter) return null;
    return (
        <VirtualFilterContainer ref={parentRef}>
            <VirtualFilterItemWrapper
                style={{
                    height: `${rowVirtualizer.totalSize}px`,
                }}
            >
                {rowVirtualizer.virtualItems.map((virtualRow) => {
                    return (
                        <FilterItemValue
                            valueFormatter={valueFormatter}
                            key={convertFromBlank(groupsMatchingSearch[virtualRow.index])}
                            virtualRowSize={virtualRow.size}
                            virtualRowStart={virtualRow.start}
                            filterItem={convertFromBlank(groupsMatchingSearch[virtualRow.index])}
                            filterGroup={filterGroup}
                            CustomRender={
                                filterOptions?.find(({ name }) => name === filterGroup.name)
                                    ?.customValueRender
                            }
                        />
                    );
                })}
            </VirtualFilterItemWrapper>
        </VirtualFilterContainer>
    );
};
