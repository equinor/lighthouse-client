import { Checkbox } from '@equinor/eds-core-react';
import React, { useState } from 'react';
import { PowerBiFilter, PowerBiFilterItem } from '../../../Types';
import { Header } from '../Header';
import { Item } from './Item';
import { searchFilterItems } from './searchFilterItems';
import { CheckboxWrap, FilterGroupContainer } from './Styles';

type FilterItemsProps = {
    filterGroupVisible: string[] | undefined;
    handleOnChange: (group: PowerBiFilter, filter: PowerBiFilterItem) => Promise<void>;
    handleOnSelectAll: (group: PowerBiFilter, filter: PowerBiFilterItem) => Promise<void>;
    activeFilters: Record<string, (string | number | boolean)[]>;
    group: PowerBiFilter;
};

export const FilterItems = ({
    filterGroupVisible,
    handleOnChange,
    handleOnSelectAll,
    activeFilters,
    group,
}: FilterItemsProps): JSX.Element | null => {
    const [searchValue, setSearchValue] = useState<string | undefined>();
    const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };
    if (!filterGroupVisible) return null;

    if (filterGroupVisible.includes(group.type)) {
        const filterValues = Object.values(group.value);
        return (
            <FilterGroupContainer>
                <Header title={group.type} onSearch={handleOnSearchChange} />
                <CheckboxWrap>
                    <Checkbox
                        onChange={async () => await handleOnSelectAll(group, filterValues[0])}
                        checked={activeFilters[group.type]?.length === filterValues.length}
                        label="Select all"
                    />

                    {searchFilterItems(filterValues, searchValue).map((filter) => {
                        return (
                            <Item
                                activeFilters={activeFilters[filter.type] || []}
                                filter={filter}
                                group={group}
                                handleOnChange={handleOnChange}
                                key={filter.value}
                            />
                        );
                    })}
                </CheckboxWrap>
            </FilterGroupContainer>
        );
    } else return null;
};
