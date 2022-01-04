import { Checkbox, Search } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import Icon from '../../../Icon/Icon';
import { useFilter } from '../../Hooks/useFilter';
import { FilterGroupeComponent } from '../FilterGroup/FilterGroup';
import { Title } from '../FilterGroup/FilterGroup-Styles';
import {
    AddButton,
    FilterGroups,
    FilterGroupWrapper,
    FilterSelect,
    FilterSelectHeaderGroup,
    SearchButton,
    SearchFilterWrapper,
    SelectBar,
    Wrapper,
} from './FilterView-style';

function SearchFilterKeys(keys: string[], filerValue: string): string[] {
    return keys.filter((key) => key.toLowerCase().includes(filerValue.toLowerCase()));
}
interface FilterViewProps {
    isActive: boolean;
}

export const FilterView = ({ isActive }: FilterViewProps) => {
    const filter = useFilter();

    //const { allFilters: filter, rejectedData, filteredData } = useFiltering();
    //const filterKeys = useMemo(() => createTypeKeys(filter), [filter]);
    const [searchActive, setSearchActive] = useState(false);
    const [activeFilterData, setActiveFilterData] = useState<string[]>([]);
    const [activeFilterGroups, setActiveFilterGroups] = useState<string[]>([]);
    const [filterSearchValue, setFilterSearchValue] = useState('');
    const [isFilterSelectActive, setIsFilterSelectActive] = useState(false);

    useEffect(() => {
        if (activeFilterData.length === 0) {
            setActiveFilterData(filter.filterGroups);
        }
    }, [filter.filterGroups]);

    useEffect(() => {
        setActiveFilterGroups(filter.filterGroups.filter((i) => activeFilterData.includes(i)));
    }, [filter, activeFilterData]);

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setActiveFilterData((activeFilterData) => {
            if (activeFilterData.includes(value))
                return activeFilterData.filter((k) => k !== value);
            else return [...activeFilterData, value];
        });
    }

    function handleOnSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFilterSearchValue(value);
    }

    function handleToggleFilerSelect() {
        setIsFilterSelectActive((state) => !state);
    }

    function handleSearchButtonClick() {
        setSearchActive((isActive) => !isActive);
    }

    if (!isActive) return null;

    return (
        <Wrapper>
            <SelectBar>
                <AddButton variant="ghost_icon" onClick={handleToggleFilerSelect}>
                    <Icon name={isFilterSelectActive ? 'close' : 'add'} />
                </AddButton>
                {/* <Button variant="ghost_icon" onClick={filter.resetFilters}>
                    Reset filters
                </Button> */}
            </SelectBar>
            {/* TODO move FilterSelect to its own component*/}
            {isFilterSelectActive && (
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
                        {SearchFilterKeys(filter.filterGroups, filterSearchValue).map((key, i) => (
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
            )}
            <FilterGroups>
                {activeFilterGroups.map((group, index) => {
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
