import { Checkbox, Icon, Search } from '@equinor/eds-core-react';
import { useState } from 'react';
import { useFilterApiContext } from '../../Hooks/useFilterApiContext';
import { Title } from '../FilterGroup/FilterGroupStyles';
import {
    AddButton,
    FilterSelect,
    FilterSelectHeaderGroup,
    SearchButton,
    SearchFilterWrapper,
    SelectBar,
} from './FilterView-style';
import { createTypeKeys, SearchFilterKeys } from './utils';

type Props = {
    visibleFilters: string[];
    handleAllClick: () => void;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const FilterTypes = ({ visibleFilters, handleAllClick, handleOnChange }: Props) => {
    const {
        filterState: { getAllFilterGroups },
        filterGroupState: { getInactiveGroupValues },
    } = useFilterApiContext();
    const [isFilterSelectActive, setIsFilterSelectActive] = useState(false);
    const filterGroupNames = createTypeKeys(getAllFilterGroups());
    const [searchActive, setSearchActive] = useState(false);
    const [filterSearchValue, setFilterSearchValue] = useState('');

    function handleOnSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFilterSearchValue(value);
    }

    const handleSearchButtonClick = () => setSearchActive((isActive) => !isActive);

    const isAllVisible = visibleFilters.length === getAllFilterGroups().length;

    const handleToggleFilterSelect = () => setIsFilterSelectActive((state) => !state);
    return (
        <>
            <SelectBar>
                <AddButton variant="ghost_icon" onClick={handleToggleFilterSelect}>
                    <Icon name={isFilterSelectActive ? 'close' : 'add'} />
                </AddButton>
            </SelectBar>

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
                        <SearchButton variant="ghost_icon" onClick={handleSearchButtonClick}>
                            <Icon name={searchActive ? 'chevron_right' : 'search'} size={24} />
                        </SearchButton>
                    </FilterSelectHeaderGroup>

                    <SearchFilterWrapper>
                        <Checkbox
                            title="All"
                            label="All"
                            value="All"
                            onChange={handleAllClick}
                            checked={isAllVisible}
                        />
                        {SearchFilterKeys(filterGroupNames, filterSearchValue).map((key, i) => (
                            <div key={key + i}>
                                <Checkbox
                                    title={key}
                                    label={key}
                                    value={key}
                                    disabled={
                                        visibleFilters.includes(key) &&
                                        getInactiveGroupValues(key).length > 0
                                    }
                                    checked={visibleFilters.includes(key)}
                                    onChange={handleOnChange}
                                />
                            </div>
                        ))}
                    </SearchFilterWrapper>
                </FilterSelect>
            )}
        </>
    );
};
