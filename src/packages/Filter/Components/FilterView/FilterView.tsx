import { Checkbox, Search } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { useWorkSpace } from '../../../../Core/WorkSpace/src/WorkSpaceApi/useWorkSpace';
import { FilterGroup } from '../../Hooks/useFilterApi';
import { useFilterApiContext } from '../../Hooks/useFilterApiContext';
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

const createTypeKeys = (filter: FilterGroup[]) => filter.map(({ name }) => name);

function SearchFilterKeys(keys: string[], filerValue: string): string[] {
    return keys.filter((key) => key.toLowerCase().includes(filerValue.toLowerCase()));
}

interface FilterViewProps {
    isActive: boolean;
}

export const FilterView = ({ isActive }: FilterViewProps): JSX.Element => {
    const {
        filterState: { getAllFilterValues },
        filterGroupState: { getInactiveGroupValues },
    } = useFilterApiContext();

    const filterGroupNames = createTypeKeys(getAllFilterValues());
    const [searchActive, setSearchActive] = useState(false);
    const [filterSearchValue, setFilterSearchValue] = useState('');
    const [isFilterSelectActive, setIsFilterSelectActive] = useState(false);

    const [visibleFilters, setVisibleFilters] = useState<string[]>(filterGroupNames);

    const { filterOptions } = useWorkSpace();

    useEffect(() => {
        if (!filterOptions) return;
        setVisibleFilters(
            filterOptions.filter(({ defaultHidden }) => !defaultHidden).map(({ name }) => name)
        );
    }, [filterOptions]);

    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;

        visibleFilters.includes(value)
            ? setVisibleFilters((prev) => prev.filter((v) => v !== value))
            : setVisibleFilters((prev) => [...prev, value]);
    }

    function handleOnSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setFilterSearchValue(value);
    }

    const handleToggleFilterSelect = () => setIsFilterSelectActive((state) => !state);

    const handleSearchButtonClick = () => setSearchActive((isActive) => !isActive);

    return (
        <Wrapper isActive={isActive}>
            {isActive && (
                <>
                    {/* TODO move SelectBar to its own component when more buttons are added*/}
                    <SelectBar>
                        <AddButton variant="ghost_icon" onClick={handleToggleFilterSelect}>
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
                                {SearchFilterKeys(filterGroupNames, filterSearchValue).map(
                                    (key, i) => (
                                        <div key={key + i}>
                                            <Checkbox
                                                title={key}
                                                label={camelCaseToHumanReadable(key)}
                                                value={key}
                                                disabled={
                                                    visibleFilters.includes(key) &&
                                                    getInactiveGroupValues(key).length > 0
                                                }
                                                checked={visibleFilters.includes(key)}
                                                onChange={handleOnChange}
                                            />
                                        </div>
                                    )
                                )}
                            </SearchFilterWrapper>
                        </FilterSelect>
                    )}
                    <FilterGroups>
                        {visibleFilters.map((key: string, index) => {
                            const filterGroup = getAllFilterValues().find(
                                ({ name }) => name === key
                            );
                            if (!filterGroup) return;
                            return (
                                <FilterGroupWrapper key={`col-${key}-${index}`}>
                                    <FilterGroupeComponent filterGroup={filterGroup} />
                                </FilterGroupWrapper>
                            );
                        })}
                    </FilterGroups>
                </>
            )}
        </Wrapper>
    );
};
