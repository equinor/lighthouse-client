import { useState } from 'react';
import Icon from '../../../Icon/Icon';
import { useFilter } from '../../Hooks/useFilter';
import { FilterGroupeComponent } from '../FilterGroup/FilterGroup';
import {
    AddButton,
    FilterGroups,
    FilterGroupWrapper,
    SelectBar,
    Wrapper,
} from './FilterView-style';

// function SearchFilterKeys(keys: string[], filerValue: string): string[] {
//     return keys.filter((key) => key.toLowerCase().includes(filerValue.toLowerCase()));
// }
interface FilterViewProps {
    isActive: boolean;
}

export const FilterView = ({ isActive }: FilterViewProps) => {
    const filter = useFilter();

    //const { allFilters: filter, rejectedData, filteredData } = useFiltering();
    //const filterKeys = useMemo(() => createTypeKeys(filter), [filter]);
    // const [searchActive, setSearchActive] = useState(false);
    // const [activeFilterData, setActiveFilterData] = useState<string[]>([]);
    // const [activeFilter, setActiveFilter] = useState<FilterGroup[]>([]);
    // const [filterSearchValue, setFilterSearchValue] = useState('');
    const [isFilterSelectActive, setIsFilterSelectActive] = useState(false);

    // useEffect(() => {
    //     if (activeFilterData.length === 0) {
    //         setActiveFilterData(filterKeys);
    //     }
    // }, [filterKeys]);

    // useEffect(() => {
    //     setActiveFilter(filter.filter((i) => activeFilterData.includes(i.type)));
    // }, [filter, activeFilterData]);

    // function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     const value = event.target.value;
    //     setActiveFilterData((activeFilterData) => {
    //         if (activeFilterData.includes(value))
    //             return activeFilterData.filter((k) => k !== value);
    //         else return [...activeFilterData, value];
    //     });
    // }

    // function handleOnSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     const value = event.target.value;
    //     setFilterSearchValue(value);
    // }

    function handleToggleFilerSelect() {
        setIsFilterSelectActive((state) => !state);
    }

    // function handleSearchButtonClick() {
    //     setSearchActive((isActive) => !isActive);
    // }

    if (!isActive) return null;

    return (
        <Wrapper>
            <SelectBar>
                <AddButton variant="ghost_icon" onClick={handleToggleFilerSelect}>
                    <Icon name={isFilterSelectActive ? 'close' : 'add'} />
                </AddButton>
            </SelectBar>
            {/* TODO move FilterSelect to its own component*/}
            {/* {isFilterSelectActive && (
                <FilterSelect>
                    <FilterSelectHeaderGroup>
                        {searchActive ? (
                            <Search
                                autoFocus={searchActive}
                                aria-label="filter group"
                                id="search-normal"
                                placeholder="Search Filter Type"
                                onChange={handleOnSearchChange}
                            />
                        ) : (
                            <Title>Select Filter Type</Title>
                        )}
                        <SearchButton variant="ghost_icon" onClick={handleSearchButtonClick}>
                            <Icon name={searchActive ? 'chevron_right' : 'search'} size={24} />
                        </SearchButton>
                    </FilterSelectHeaderGroup>

                    <SearchFilterWrapper>
                        {SearchFilterKeys(filterKeys, filterSearchValue).map((key, i) => (
                            <div key={key + i}>
                                <Checkbox
                                    title={key}
                                    label={key}
                                    value={key}
                                    checked={activeFilterData.includes(key)}
                                    onChange={handleOnChange}
                                />
                            </div>
                        ))}
                    </SearchFilterWrapper>
                </FilterSelect>
            )} */}
            <FilterGroups>
                {filter.filterGroups.map((group, index) => {
                    return (
                        <FilterGroupWrapper key={`${group.toString()}-${index}`}>
                            <FilterGroupeComponent filterGroupName={group} />
                        </FilterGroupWrapper>
                    );
                })}
            </FilterGroups>
        </Wrapper>
    );
};
