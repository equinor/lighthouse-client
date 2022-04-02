import { Checkbox, Search } from '@equinor/eds-core-react';
import React, { useState } from 'react';
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
import { FilterGroup } from '../../Hooks/useFilterApi';
import { useFilterApiContext } from '../../Hooks/useFilterApiContext';
import { FilterValueType } from '../../Types';

interface FilterGroupeComponentProps {
    filterGroup: FilterGroup;
    hideTitle?: boolean;
}

function searchByValue(items: string[], value: string) {
    return items.filter((item) => item.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
}

const DEFAULT_NULL_VALUE = '(Blank)';

export const FilterGroupeComponent: React.FC<FilterGroupeComponentProps> = ({
    filterGroup,
}: FilterGroupeComponentProps) => {
    const {
        operations: { markAllValuesActive },
        filterGroupState: { getInactiveGroupValues, getFilterItemCountsForGroup },
    } = useFilterApiContext();

    const [filterSearchValue, setFilterSearchValue] = useState('');
    const [searchActive, setSearchActive] = useState(false);

    const groupsMatchingSearch = searchByValue(
        filterGroup.values.map((v) => (v !== null ? v.toString() : DEFAULT_NULL_VALUE)),
        filterSearchValue
    );

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFilterSearchValue(value);
    }

    /** //TODO: Handle items in view search */
    const handleOnAllChange = () => markAllValuesActive(filterGroup.name);

    const isAllChecked = getInactiveGroupValues(filterGroup.name).length === 0;

    function handleSearchButtonClick() {
        setSearchActive((isActive) => !isActive);
    }

    const itemCounts = getFilterItemCountsForGroup(filterGroup.name);

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
                    />
                ) : (
                    <Title>{filterGroup.name}</Title>
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
                        onChange={handleOnAllChange}
                    />

                    {groupsMatchingSearch.map((value) => (
                        <FilterItemComponent
                            key={value}
                            count={
                                itemCounts.find(({ name }) => name === convertFromBlank(value))
                                    ?.count ?? 0
                            }
                            //HACK: Must recieve null and not blank
                            filterItem={convertFromBlank(value)}
                            groupName={filterGroup.name}
                        />
                    ))}
                </FilterItemWrapper>
            </FilterGroupWrapper>
        </Wrapper>
    );
};

function convertFromBlank(name: FilterValueType) {
    return name === DEFAULT_NULL_VALUE ? null : name;
}
