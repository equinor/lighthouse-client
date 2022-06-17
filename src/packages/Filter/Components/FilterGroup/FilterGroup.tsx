import { Checkbox, Search } from '@equinor/eds-core-react';
import { Case, Switch } from '@equinor/JSX-Switch';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';
import { useWorkSpace } from '../../../../Core/WorkSpace/src/WorkSpaceApi/useWorkSpace';
import { FilterGroup } from '../../Hooks/useFilterApi';
import { useFilterApiContext } from '../../Hooks/useFilterApiContext';
import { FilterItemValue } from '../FilterItem/FilterItem';
import { FilterItemName, FilterItemWrap } from '../FilterItem/FilterItem-Styles';
import Icon from '../Icon/Icon';
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

    return (
        <Wrapper>
            <FilterHeaderGroup>
                <Switch>
                    <Case when={searchActive}>
                        <Search
                            autoFocus={searchActive}
                            aria-label="in filter group"
                            id="search-normal"
                            placeholder="Search"
                            onChange={handleOnChange}
                        />
                    </Case>
                    <Case when={true}>
                        <Title>{filterGroup.name}</Title>
                    </Case>
                </Switch>
                {isSearchable && (
                    <SearchButton variant="ghost_icon" onClick={handleSearchButtonClick}>
                        <Icon name={searchActive ? 'chevron_right' : 'search'} size={24} />
                    </SearchButton>
                )}
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
        operations: { markAllValuesActive },
        filterGroupState: { getInactiveGroupValues },
        filterState: { getValueFormatters },
    } = useFilterApiContext();
    const { filterOptions } = useWorkSpace();

    const isAllChecked = getInactiveGroupValues(filterGroup.name).length === 0;
    const groupsMatchingSearch = useMemo(
        () =>
            searchByValue(
                filterGroup.values.map((v) => (v !== null ? v.toString() : DEFAULT_NULL_VALUE)),
                filterSearchValue
            ),
        [filterGroup.values, filterSearchValue]
    );
    const handleOnAllChange = () => markAllValuesActive(filterGroup.name);
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
            <FilterItemWrap>
                <Checkbox onChange={handleOnAllChange} checked={isAllChecked} />
                <FilterItemName>All</FilterItemName>
            </FilterItemWrap>
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
