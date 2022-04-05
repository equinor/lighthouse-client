import { Search } from '@equinor/eds-core-react';
import React, { useState } from 'react';
import { useWorkSpace } from '../../../../Core/WorkSpace/src/WorkSpaceApi/useWorkSpace';
import { FilterGroup } from '../../Hooks/useFilterApi';
import { useFilterApiContext } from '../../Hooks/useFilterApiContext';
import { FilterValueType } from '../../Types';
import { FilterItemComponent } from '../FilterItem/FilterItem';
import Icon from '../Icon/Icon';
import {
    AllCheckbox,
    FilterGroupWrapper,
    FilterHeaderGroup,
    FilterItemWrapper,
    SearchButton,
    Title,
    Wrapper
} from './FilterGroupStyles';

interface FilterGroupeComponentProps {
    filterGroup: FilterGroup;
    hideTitle?: boolean;
}

function searchByValue(items: string[], value: string) {
    return items.filter((item) => item.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
}

export const DEFAULT_NULL_VALUE = '(Blank)';

export const FilterGroupeComponent: React.FC<FilterGroupeComponentProps> = ({
    filterGroup,
}: FilterGroupeComponentProps) => {
    const {
        operations: { markAllValuesActive },
        filterGroupState: { getInactiveGroupValues, getFilterItemCountsForGroup },
    } = useFilterApiContext();

    const [filterSearchValue, setFilterSearchValue] = useState('');
    const [searchActive, setSearchActive] = useState(false);

    const { filterOptions } = useWorkSpace();

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
                    <AllCheckbox
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
                            CustomRender={
                                filterOptions?.find(({ name }) => name === filterGroup.name)
                                    ?.customValueRender
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
