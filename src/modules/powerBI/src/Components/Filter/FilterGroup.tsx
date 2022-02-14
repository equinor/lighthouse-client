import { Checkbox } from '@equinor/eds-core-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { PowerBiFilter } from '../../Types';
import { Header } from './Header';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    width: 250px;
    min-width: 200px;
    height: 200px;
    height: fit-content;
    word-wrap: break-word;
    max-height: 180px;
    gap: 0.5rem;
`;
const FilterGroupContainer = styled.div`
    overflow-x: hidden;
    overflow-y: scroll;

    svg {
        height: 16px;
        width: 16px;
    }
`;

const searchSlicerFilters = (
    slicerFilters: PowerBiFilter[],
    filterValue: string | undefined
): PowerBiFilter[] => {
    if (!filterValue) return slicerFilters;

    return slicerFilters.reduce((acc, curr) => {
        curr.type.toLowerCase().includes(filterValue.toLowerCase()) && acc.push(curr);
        return acc;
    }, [] as PowerBiFilter[]);
};

type FilterGroupProps = {
    slicerFilters: PowerBiFilter[];
    filterGroupVisible: string[] | undefined;
    handleChangeGroup: (filter: PowerBiFilter) => void;
    resetFilter: () => Promise<void>;
};
export const FilterGroup = ({
    slicerFilters,
    filterGroupVisible,
    handleChangeGroup,
    resetFilter,
}: FilterGroupProps) => {
    const [filterSearchValue, setFilterSearchValue] = useState<string | undefined>();
    const handleOnSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFilterSearchValue(value);
    };

    //TODO: Check prefix on filter.type to see if it should render or not
    return (
        <Container>
            <Header title="Select Filter Type" onSearch={handleOnSearchChange} />

            <FilterGroupContainer>
                <div onClick={async () => await resetFilter()} style={{ cursor: 'pointer' }}>
                    Reset filters
                </div>

                {searchSlicerFilters(slicerFilters, filterSearchValue).map((filter, index) => {
                    return (
                        <div key={filter.type + index}>
                            <Checkbox
                                onChange={() => {
                                    handleChangeGroup(filter);
                                }}
                                checked={
                                    filterGroupVisible?.find((a) => a === filter.type) !== undefined
                                }
                                label={filter.type}
                            />
                        </div>
                    );
                })}
            </FilterGroupContainer>
        </Container>
    );
};
