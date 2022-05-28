import { Checkbox } from '@equinor/eds-core-react';
import React, { useMemo, useState } from 'react';
import { PowerBiFilter } from '../../../Types';
import { searchFilterItems } from '../FilterItems/searchFilterItems';
import { Header } from '../Header';
import { searchSlicerFilters } from './searchSlicerFilters';
import { CheckboxItem, CheckboxWrap, Container, FilterGroupContainer } from './Styles';

type FilterGroupProps = {
    slicerFilters: PowerBiFilter[];
    filterGroupVisible: string[] | undefined;
    handleChangeGroup: (filter: PowerBiFilter) => Promise<void>;
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
    const searchedFilterGroups = useMemo(
        () => searchSlicerFilters(slicerFilters, filterSearchValue),
        [slicerFilters, filterSearchValue]
    );
    //TODO: Check prefix on filter.type to see if it should render or not
    return (
        <Container>
            <Header title="Select Filter Type" onSearch={handleOnSearchChange} />

            <FilterGroupContainer>
                <CheckboxWrap>
                    {searchedFilterGroups.map((filter: PowerBiFilter) => {
                        return (
                            <CheckboxItem key={filter.type}>
                                <Checkbox
                                    onChange={async () => {
                                        await handleChangeGroup(filter);
                                    }}
                                    checked={
                                        filterGroupVisible?.find((a) => a === filter.type) !==
                                        undefined
                                    }
                                />
                                <label>{filter.type}</label>
                            </CheckboxItem>
                        );
                    })}
                </CheckboxWrap>
            </FilterGroupContainer>
        </Container>
    );
};
