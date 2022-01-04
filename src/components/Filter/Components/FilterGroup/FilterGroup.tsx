import { Checkbox, Icon, Search } from '@equinor/eds-core-react';
import { useMemo, useState } from 'react';
import { useFilter } from '../../Hooks/useFilter';
import { FilterItemComponent } from '../FilterItem/FilterItem';
import {
    FilterGroupWrapper,
    FilterHeaderGroup,
    SearchButton,
    Title,
    Wrapper,
} from './FilterGroup-Styles';

import { FilterItemGroupe, FilterItemWrapper } from '../FilterItem/FilterItem-Styles';
import { FilterItem } from '../../Types/FilterItem';

interface FilterGroupeComponentProps {
    filterGroupName: string;
    hideTitle?: boolean;
}

function searchByValue(items: FilterItem[], value: string): FilterItem[] {
    if (typeof value !== 'string') {
        return items;
    }
    return items.filter((item) => {
        if (item.value === null) {
            return false;
        }
        const currentItem = item.value.toString().toLocaleLowerCase();
        return currentItem.startsWith(value.toLocaleLowerCase());
    });
}

export const FilterGroupeComponent: React.FC<FilterGroupeComponentProps> = ({
    filterGroupName,
    hideTitle = false,
}: FilterGroupeComponentProps) => {
    const filter = useFilter();
    const group = filter.getFilterGroup(filterGroupName);
    // if (!group) return;

    const isAllChecked: boolean = useMemo(() => {
        if (group) {
            return group.every((x) => x.checked);
        } else {
            return false;
        }
    }, [group?.every((x) => x.checked), group]);

    let totalCount = 0;
    group?.map((item) => {
        totalCount += item.count;
    });

    const [filterSearchValue, setFilterSearchValue] = useState('');
    const [searchActive, setSearchActive] = useState(false);

    const searchGroup = useMemo(() => {
        if (!group) return [];

        return searchByValue(group, filterSearchValue);
    }, [filterSearchValue]);

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFilterSearchValue(value);
    }

    /**
     * Currently not supported
     */
    // function handleOnKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    //     if (event.code === 'Enter') {
    //         const filterItems = searchGroup;
    //         filter.handleFilterItemClick(filterItems, true, filter.filteredData, rejectedData, filterKeys);
    //         setFilterSearchValue('');
    //     }
    // }

    if (!group) {
        return <></>;
    }
    const handleOnAllChange = () => {
        filter.handleFilterItemClick(filterGroupName, group[0].value, 'all');
    };

    function handleSearchButtonClick() {
        setSearchActive((isActive) => !isActive);
    }

    const headerColumnDisplayName =
        filter?.filterOptions?.headerNames && filter.filterOptions.headerNames[filterGroupName]
            ? filter.filterOptions.headerNames[filterGroupName]
            : filterGroupName;

    return (
        <Wrapper>
            <FilterHeaderGroup>
                {/* {!hideTitle && <Title>{headerColumnDisplayName}</Title>} */}
                {searchActive ? (
                    <Search
                        autoFocus={searchActive}
                        aria-label="in filter group"
                        id="search-normal"
                        placeholder="Search"
                        onChange={handleOnChange}
                    // onKeyPress={handleOnKeyPress}
                    />
                ) : (
                    !hideTitle && <Title>{headerColumnDisplayName}</Title>
                )}

                <SearchButton variant="ghost_icon" onClick={handleSearchButtonClick}>
                    <Icon name={searchActive ? 'chevron_right' : 'search'} size={24} />
                </SearchButton>
            </FilterHeaderGroup>
            <FilterGroupWrapper>
                <div>
                    <FilterItemComponent
                        filterItem={{
                            checked: isAllChecked,
                            count: totalCount,
                            filterGroupName: filterGroupName,
                            value: 'All',
                        }}
                        filterItemCheck={handleOnAllChange}
                        isLoading={filter.isFiltering}
                    />
                </div>

                {searchGroup.map((item, index) => {
                    return (
                        <div key={`${item.count}-${index}`}>
                            <FilterItemComponent
                                filterItem={item}
                                filterItemCheck={filter.handleFilterItemClick}
                                isLoading={filter.isFiltering}
                            />
                        </div>
                    );
                })}
            </FilterGroupWrapper>
        </Wrapper>
    );
};
