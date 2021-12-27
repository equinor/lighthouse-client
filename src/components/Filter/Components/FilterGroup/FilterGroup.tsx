import { Checkbox } from '@equinor/eds-core-react';
import { useMemo } from 'react';
import { useFilter } from '../../Hooks/useFilter';
import { HandleFilterItemClick } from '../../Hooks/useFiltering';
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
    filterItemCheck: HandleFilterItemClick;
    isLoading: boolean;
    hideTitle?: boolean;
}

// function searchByValue(items: string[], value: string) {
//     return items.filter((item) => item.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
// }

// function allChecked(filterGroup: FilterGroup): boolean {
//     return checkedCount(filterGroup) === Object.keys(filterGroup.value).length;
// }

// function checkedCount(filterGroup: FilterGroup): number {
//     return Object.keys(filterGroup.value).filter((key) => filterGroup.value[key].checked).length;
// }

// function checkIsIndeterminate(filterGroup: FilterGroup) {
//     const maxCount = Object.keys(filterGroup.value).length;
//     const count = checkedCount(filterGroup);
//     return count > 0 && count < maxCount;
// }

export const FilterGroupeComponent: React.FC<FilterGroupeComponentProps> = ({
    filterGroupName,
    filterItemCheck,
}: //hideTitle,
    FilterGroupeComponentProps) => {
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
    //const group = Array.from(filterGroup);

    // const [filterSearchValue, setFilterSearchValue] = useState('');
    // const [searchActive, setSearchActive] = useState(false);
    // const { filterKeys, rejectedData, filteredData } = useFilter();
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
    //         setFilterSearchValue('');
    //     }
    // }

    // function handleOnAllChange() {
    //     filterItemCheck(
    //         Object.keys(filterGroup.value).map((key) => filterGroup.value[key]),
    //         true,
    //         filteredData,
    //         rejectedData,
    //         filterKeys
    //     );
    // }

    const handleOnAllChange = () => {
        filterItemCheck(filterGroupName, group[0].value, 'all');
    };
    //const isAllChecked = allChecked(filterGroup);
    //const isIndeterminate = checkIsIndeterminate(filterGroup);

    // function handleSearchButtonClick() {
    //     setSearchActive((isActive) => !isActive);
    // }

    // isLastCheckedInSection(valueSelf, filterGroup);

    const headerColumn =
        filter?.filterOptions?.typeMap && filter.filterOptions.typeMap[filterGroupName]
            ? filter.filterOptions.typeMap[filterGroupName]
            : filterGroupName;

    return (
        <Wrapper>
            <FilterHeaderGroup>
                <Title>{headerColumn}</Title>
                {/* {searchActive ? (
                    <Search
                        autoFocus={searchActive}
                        aria-label="in filer group"
                        id="search-normal"
                        placeholder="Search"
                        onChange={handleOnChange}
                        onKeyPress={handleOnKeyPress}
                    />
                ) : (
                    <Title>{filterGroup.type}</Title>
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
                            <div key={`${item.value}-${index}`}>
                                <FilterItemComponent
                                    filterItem={item}
                                    filterItemCheck={filterItemCheck}
                                    isLoading={filter.isLoading}
                                />
                            </div>
                        );
                    })}
                </FilterItemWrapper>
            </FilterGroupWrapper>
        </Wrapper>
    );
};
