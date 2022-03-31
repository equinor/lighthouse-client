import { Checkbox, Search } from '@equinor/eds-core-react';
import React, { useMemo, useState } from 'react';
import { FilterConfiguration, FilterItemCheck } from '../../Types/FilterItem';
import { FilterItemComponent } from '../FilterItem/FilterItem';
import Icon from '../Icon/Icon';
import {
    FilterGroupWrapper,
    FilterHeaderGroup,
    FilterItemWrapper,
    SearchButton,
    Title,
    Wrapper,
} from './FilterGroup-Styles';
import { camelCaseToHumanReadable } from '../Utils/camelCaseToHumanReadable';

interface FilterGroupeComponentProps {
    filterGroup: FilterConfiguration;
    filterItemCheck: FilterItemCheck;
    hideTitle?: boolean;
}

function searchByValue(items: string[], value: string) {
    return items.filter((item) => item.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
}

function allChecked(filterGroup: FilterConfiguration): boolean {
    return checkedCount(filterGroup) === Object.keys(filterGroup.value).length;
}

function checkedCount(filterGroup: FilterConfiguration): number {
    return Object.keys(filterGroup.value).filter((key) => filterGroup.value[key].checked).length;
}

function checkIsIndeterminate(filterGroup: FilterConfiguration) {
    const maxCount = Object.keys(filterGroup.value).length;
    const count = checkedCount(filterGroup);
    return count > 0 && count < maxCount;
}

export const FilterGroupeComponent: React.FC<FilterGroupeComponentProps> = ({
    filterGroup,
    filterItemCheck,
}: FilterGroupeComponentProps) => {
    const [filterSearchValue, setFilterSearchValue] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const group = useMemo(
        () => searchByValue(Object.keys(filterGroup.value), filterSearchValue),
        [filterSearchValue, filterGroup.value]
    );

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFilterSearchValue(value);
    }
    function handleOnKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.code === 'Enter') {
            const filterItems = group.map((key) => filterGroup.value[key]);
            filterItemCheck(filterItems, true);
            setFilterSearchValue('');
        }
    }

    function handleOnAllChange() {
        filterItemCheck(
            Object.keys(filterGroup.value).map((key) => filterGroup.value[key]),
            true
        );
    }

    const isAllChecked = allChecked(filterGroup);
    const isIndeterminate = checkIsIndeterminate(filterGroup);

    function handleSearchButtonClick() {
        setSearchActive((isActive) => !isActive);
    }

    return (
        <Wrapper>
            <FilterHeaderGroup>
                {searchActive ? (
                    <Search
                        autoFocus={searchActive}
                        aria-label="in filer group"
                        id="search-normal"
                        placeholder="Search"
                        onChange={handleOnChange}
                        onKeyPress={handleOnKeyPress}
                    />
                ) : (
                    <Title>{camelCaseToHumanReadable(filterGroup.type)}</Title>
                )}
                <SearchButton variant="ghost_icon" onClick={handleSearchButtonClick}>
                    <Icon name={searchActive ? 'chevron_right' : 'search'} size={24} />
                </SearchButton>
            </FilterHeaderGroup>
            <FilterGroupWrapper>
                <FilterItemWrapper>
                    <Checkbox
                        title={'All'}
                        label={'All'}
                        checked={isAllChecked}
                        indeterminate={isIndeterminate}
                        onChange={handleOnAllChange}
                    />
                    {group.map((key) => {
                        const item = filterGroup.value[key];
                        return (
                            <div key={item.value}>
                                {
                                    <FilterItemComponent
                                        itemKey={item.value}
                                        filterItem={item}
                                        filterItemCheck={filterItemCheck}
                                    />
                                }
                            </div>
                        );
                    })}
                </FilterItemWrapper>
            </FilterGroupWrapper>
        </Wrapper>
    );
};
