import { Checkbox } from '@equinor/eds-core-react';
import React, { useState } from 'react';
import { PowerBiFilter } from '../../../Types';
import { isFilterGroupChecked } from '../../../Utils';
import { Header } from '../Header';
import { searchSlicerFilters } from './searchSlicerFilters';
import { CheckboxItem, CheckboxWrap, Container, FilterGroupContainer } from './Styles';

type FilterGroupProps = {
    slicerFilters: PowerBiFilter[];
    filterGroupVisible: string[] | undefined;
    handleChangeGroup: (filter: PowerBiFilter) => Promise<void>;
    activeFilters: Record<string, (string | number | boolean)[]>;
};
export const FilterGroup = ({
    slicerFilters,
    filterGroupVisible,
    handleChangeGroup,
    activeFilters,
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
                    {searchSlicerFilters(slicerFilters, filterSearchValue).map(
                        (filter: PowerBiFilter) => {
                            return (
                                <CheckboxItem key={filter.type}>
                                    <Checkbox
                                        onChange={async () => {
                                            await handleChangeGroup(filter);
                                        }}
                                        checked={isFilterGroupChecked({
                                            activeFilters,
                                            filterGroupVisible,
                                            filterType: filter.type,
                                        })}
                                    />
                                    <label>{filter.type}</label>
                                </CheckboxItem>
                            );
                        }
                    )}
                </CheckboxWrap>
            </FilterGroupContainer>
        </Container>
    );
};
