import { Checkbox, Search } from '@equinor/eds-core-react';
import React, { useState } from 'react';
import { PowerBiFilter } from '../../Types';
type FilterGroupProps = {
    slicerFilters: PowerBiFilter[];
    filterGroupVisible: string[] | undefined;
    handleChangeGroup: (filter: PowerBiFilter) => void;
};
const searchFilterKeys = (keys: string[], filterValue: string) => {
    return keys.filter((key) => key.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()));
};
export const FilterGroup = ({
    slicerFilters,
    filterGroupVisible,
    handleChangeGroup,
}: FilterGroupProps) => {
    const [filterSearchValue, setFilterSearchValue] = useState('');
    const handleOnSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFilterSearchValue(value);
    };
    return (
        <div style={{ height: '200px', overflow: 'scroll', width: '200px' }}>
            <Search
                onChange={handleOnSearchChange}
                id="search-normal"
                placeholder="Search Filter Type"
                aria-label="filter group"
            />
            {slicerFilters.map((filter, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Checkbox
                            onChange={() => {
                                handleChangeGroup(filter);
                            }}
                            checked={
                                filterGroupVisible?.find((a) => a === filter.type) !== undefined
                            }
                        />
                        {filter.type}
                    </div>
                );
            })}
        </div>
    );
};
