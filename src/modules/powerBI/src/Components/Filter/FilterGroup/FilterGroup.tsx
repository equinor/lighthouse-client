import { Checkbox } from '@equinor/eds-core-react';
import React, { useState } from 'react';
import { PowerBiFilter } from '../../../Types';
import { Header } from '../Header';
import { searchSlicerFilters } from './searchSlicerFilters';
import { CheckboxItem, CheckboxWrap, Container, FilterGroupContainer } from './Styles';

type FilterGroupProps = {
    slicerFilters: PowerBiFilter[];
    filterGroupVisible: string[] | undefined;
    handleChangeGroup: (filter: PowerBiFilter) => void;
};
export const FilterGroup = ({
    slicerFilters,
    filterGroupVisible,
    handleChangeGroup,
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
