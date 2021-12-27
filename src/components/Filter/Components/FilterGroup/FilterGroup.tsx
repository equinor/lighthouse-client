import { Checkbox } from '@equinor/eds-core-react';
import { useMemo } from 'react';
import { useFilter } from '../../Hooks/useFilter';
import { FilterItemComponent } from '../FilterItem/FilterItem';
import {
    FilterGroupWrapper,
    FilterHeaderGroup,
    FilterItemWrapper,
    Title,
    Wrapper,
} from './FilterGroup-Styles';

interface FilterGroupeComponentProps {
    filterGroupName: string;
    //filterItemCheck: HandleFilterItemClick;
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

    if (!group) {
        return <></>;
    }
    // const [filterSearchValue, setFilterSearchValue] = useState('');
    // const [searchActive, setSearchActive] = useState(false);

    // const group = useMemo(
    //     () => searchByValue(Object.keys(filterGroup.value), filterSearchValue),
    //     [filterSearchValue, filterGroup.value]
    // );

    // function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     const value = event.target.value;
    //     setFilterSearchValue(value);
    // }
    // function handleOnKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    //     if (event.code === 'Enter') {
    //         const filterItems = group.map((key) => filterGroup.value[key]);
    //         filterItemCheck(filterItems, true, filteredData, rejectedData, filterKeys);
    //         filter.handleFilterItemClick();
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
        filter?.filterOptions?.typeMap && filter.filterOptions.typeMap[filterGroupName]
            ? filter.filterOptions.typeMap[filterGroupName]
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
            </FilterHeaderGroup>
            <FilterGroupWrapper>
                <FilterItemWrapper>
                    <Checkbox
                        title={'All'}
                        label={'All'}
                        checked={isAllChecked}
                        onChange={() => handleOnAllChange()}
                    />

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
                </FilterItemWrapper>
            </FilterGroupWrapper>
        </Wrapper>
    );
};
