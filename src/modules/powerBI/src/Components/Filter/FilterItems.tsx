import { Checkbox } from '@equinor/eds-core-react';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { PowerBiFilter, PowerBiFilterItem } from '../../Types';
import { Header } from './Header';

type ItemProps = {
    activeFilters: (string | number | boolean)[];
    filter: PowerBiFilterItem;
    group: PowerBiFilter;
    handleOnChange: (group: PowerBiFilter, filter: PowerBiFilterItem) => Promise<void>;
};
const Item = ({ activeFilters, filter, group, handleOnChange }: ItemProps) => {
    const isActive = useMemo(() => {
        return activeFilters.includes(filter.value) ? true : false;
    }, [activeFilters, filter.value]);

    return (
        <div>
            <Checkbox
                onChange={async () => {
                    await handleOnChange(group, filter);
                }}
                checked={isActive}
                label={filter.value}
            />
        </div>
    );
};

const FilterGroupContainer = styled.div`
    width: 250px;
    overflow: scroll;
    padding: 0.5rem;
`;

const CheckboxWrap = styled.div`
    svg {
        height: 16px;
        width: 16px;
    }
`;

const searchFilterItems = (
    filterItems: PowerBiFilterItem[],
    searchValue: string | undefined
): PowerBiFilterItem[] => {
    if (!searchValue) return filterItems;

    return filterItems.reduce((acc, curr) => {
        if (curr.value.toLowerCase().includes(searchValue.toLowerCase())) acc.push(curr);
        return acc;
    }, [] as PowerBiFilterItem[]);
};
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
