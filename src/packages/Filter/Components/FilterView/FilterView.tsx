import { Checkbox, Search } from '@equinor/eds-core-react';
import { useEffect, useMemo, useState } from 'react';
import { useFilter } from '../../Hooks/useFilter';
import { FilterConfiguration } from '../../Types/FilterItem';
import { FilterGroupeComponent } from '../FilterGroup/FilterGroup';
import { Title } from '../FilterGroup/FilterGroup-Styles';
import Icon from '../Icon/Icon';
import { camelCaseToHumanReadable } from '../Utils/camelCaseToHumanReadable';
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

function createTypeKeys(filter: FilterConfiguration[]): string[] {
    return filter.map((item) => item.type);
}

function SearchFilterKeys(keys: string[], filerValue: string): string[] {
    return keys.filter((key) => key.toLowerCase().includes(filerValue.toLowerCase()));
}

function getActiveFilters(filter: FilterConfiguration[]): string[] {
    const activeFilters: string[] = [];
    filter.forEach((item) => {
        const isActive = Object.values(item.value).some((filterItem) => !filterItem.checked);
        if (isActive) {
            activeFilters.push(item.type);
        }
    });
    return activeFilters;
}
interface FilterViewProps {
    isActive: boolean;
}

export const FilterView = ({ isActive }: FilterViewProps): JSX.Element => {
    const { filter, filterItemCheck, activeFiltersTypes, setActiveFiltersTypes } = useFilter();
    const filterKeys = useMemo(() => createTypeKeys(filter), [filter]);
    const activeFilters = useMemo(() => getActiveFilters(filter), [filter]);
    const [searchActive, setSearchActive] = useState(false);
    // const [activeFilterData, setActiveFilterData] = useState<string[]>([]);
    const [activeFilter, setActiveFilter] = useState<FilterConfiguration[]>([]);
    const [filterSearchValue, setFilterSearchValue] = useState('');
    const [isFilterSelectActive, setIsFilterSelectActive] = useState(false);

    useEffect(() => {
        if (activeFilters.length > activeFiltersTypes.length) {
            setActiveFiltersTypes(activeFilters);
        }
    }, [activeFilters, activeFiltersTypes.length, setActiveFiltersTypes]);

    // useEffect(() => {
    //     if (activeFiltersTypes.length === 0) {
    //         setActiveFiltersTypes(filterKeys);
    //     }
    // }, [activeFiltersTypes.length, filterKeys, setActiveFiltersTypes]);

    useEffect(() => {
        setActiveFilter(filter.filter((i) => activeFiltersTypes.includes(i.type)));
    }, [filter, activeFiltersTypes]);

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setActiveFiltersTypes(
            activeFiltersTypes.includes(value)
                ? activeFiltersTypes.filter((k) => k !== value)
                : [...activeFiltersTypes, value]
        );
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

    return (
        <Wrapper isActive={isActive}>
            {isActive && (
                <>
                    {/* TODO move SelectBar to its own component when more buttons are added*/}
                    <SelectBar>
                        <AddButton variant="ghost_icon" onClick={handleToggleFilerSelect}>
                            <Icon name={isFilterSelectActive ? 'close' : 'add'} />
                        </AddButton>
                    </SelectBar>
                    {/* TODO move FilterSelect to its own component*/}
                    {isFilterSelectActive && (
                        <FilterSelect>
                            <FilterSelectHeaderGroup>
                                {searchActive ? (
                                    <Search
                                        autoFocus={searchActive}
                                        aria-label="filer group"
                                        id="search-normal"
                                        placeholder="Search Filter Type"
                                        onChange={handleOnSearchChange}
                                    />
                                ) : (
                                    <Title>Select Filter Type</Title>
                                )}
                                <SearchButton
                                    variant="ghost_icon"
                                    onClick={handleSearchButtonClick}
                                >
                                    <Icon
                                        name={searchActive ? 'chevron_right' : 'search'}
                                        size={24}
                                    />
                                </SearchButton>
                            </FilterSelectHeaderGroup>

                            <SearchFilterWrapper>
                                {SearchFilterKeys(filterKeys, filterSearchValue).map((key, i) => (
                                    <div key={key + i}>
                                        <Checkbox
                                            title={key}
                                            label={camelCaseToHumanReadable(key)}
                                            value={key}
                                            disabled={activeFilters.includes(key)}
                                            checked={activeFiltersTypes.includes(key)}
                                            onChange={handleOnChange}
                                        />
                                    </div>
                                ))}
                            </SearchFilterWrapper>
                        </FilterSelect>
                    )}
                    <FilterGroups>
                        {activeFilter.map((filterGroup: FilterConfiguration, index) => (
                            <FilterGroupWrapper key={`col-${filterGroup}-${index}`}>
                                <FilterGroupeComponent
                                    filterGroup={filterGroup}
                                    filterItemCheck={filterItemCheck}
                                />
                            </FilterGroupWrapper>
                        ))}
                    </FilterGroups>
                </>
            )}
        </Wrapper>
    );
};
