import { Checkbox } from '@equinor/eds-core-react';
import React, { useState } from 'react';
import { PowerBiFilter } from '../../../Types';
import { Header } from '../Header';
import { CheckboxItem, CheckboxWrap, Container, FilterGroupContainer, ResetFilter } from './Styles';

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
}: FilterGroupProps): JSX.Element => {
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
                <ResetFilter onClick={async () => await resetFilter()}>Reset filters</ResetFilter>

                <CheckboxWrap>
                    {searchSlicerFilters(slicerFilters, filterSearchValue).map((filter) => {
                        return (
                            <CheckboxItem key={filter.type}>
                                <Checkbox
                                    onChange={() => {
                                        handleChangeGroup(filter);
                                    }}
                                    checked={
                                        filterGroupVisible?.find((a) => a === filter.type) !==
                                        undefined
                                    }
                                    label={filter.type}
                                />
                            </CheckboxItem>
                        );
                    })}
                </CheckboxWrap>
            </FilterGroupContainer>
        </Container>
    );
};
