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
import { Item } from '../../../../packages/StatusBar';

interface FilterGroupeComponentProps {
    filterGroupName: string;
    hideTitle?: boolean;
}

// function searchByValue(items: string[], value: string) {
//     return items.filter((item) => item.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
// }

export const FilterGroupeComponent: React.FC<FilterGroupeComponentProps> = ({
    filterGroupName,
    hideTitle = false,
}: FilterGroupeComponentProps) => {
    const filter = useFilter();
    const group = filter.getFilterGroup(filterGroupName);

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
    if (!group) {
        return <></>;
    }

    // const [filterSearchValue, setFilterSearchValue] = useState('');
    // const [searchActive, setSearchActive] = useState(false);

    // const searchGroup = useMemo(() => {
    //     if (!group) return [];

    //     return searchByValue(Object.keys(group?.map((x) => x.value)), filterSearchValue);
    // }, [filterSearchValue]);

    // function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     const value = event.target.value;
    //     setFilterSearchValue(value);
    // }
    // function handleOnKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    //     if (event.code === 'Enter') {
    //         const filterItems = searchGroup.map((key) => filterGroup.value[key]);
    //         filter.handleFilterItemClick(filterItems, true, filteredData, rejectedData, filterKeys);
    //         setFilterSearchValue('');
    //     }
    // }

    const handleOnAllChange = () => {
        filter.handleFilterItemClick(filterGroupName, group[0].value, 'all');
    };

    // function handleSearchButtonClick() {
    //     setSearchActive((isActive) => !isActive);
    // }

    const headerColumnDisplayName =
        filter?.filterOptions?.headerNames && filter.filterOptions.headerNames[filterGroupName]
            ? filter.filterOptions.headerNames[filterGroupName]
            : filterGroupName;

    return (
        <Wrapper>
            <FilterHeaderGroup>
                {!hideTitle && <Title>{headerColumnDisplayName}</Title>}
                {/* {searchActive ? (
                    <Search
                        autoFocus={searchActive}
                        aria-label="in filer group"
                        id="search-normal"
                        placeholder="Search"
                        onChange={handleOnChange}

                    //onKeyPress={handleOnKeyPress}
                    />
                ) : (
                    !hideTitle && <Title>{headerColumnDisplayName}</Title>
                )}
                <SearchButton variant="ghost_icon" onClick={handleSearchButtonClick}>
                    <Icon name={searchActive ? 'chevron_right' : 'search'} size={24} />
                </SearchButton> */}
                <p>{totalCount}</p>
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

                {group.map((item, index) => {
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
