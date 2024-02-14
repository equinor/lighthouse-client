import { Menu, Button, Search } from '@equinor/eds-core-react-old';
import { useState } from 'react';
import styled from 'styled-components';
import { useFilterApiContext } from '../../../../../../packages/Filter/Hooks/useFilterApiContext';
import { FilterValueType } from '../../../../../../packages/Filter/Types';
import { FilterItemCheckbox } from '../FilterItemCheckbox';
import { ClearButtonWrapper, MenuWrapper, SearchHolder, VerticalLine } from './groupStyles';

interface FilterGroupPopoverMenuProps {
    anchorEl: HTMLElement | null | undefined;
    onClick: () => void;
    values: FilterValueType[];
    handleFilterItemClick: (item: FilterValueType) => void;
    isChecked: (filterValue: FilterValueType) => boolean;
    markAllValuesActive: () => void;
    CustomRender: (value: FilterValueType) => JSX.Element;
    handleFilterItemLabelClick: (val: FilterValueType) => void;
    groupName: string;
}
export const FilterGroupPopoverMenu = ({
    handleFilterItemClick,
    isChecked,
    handleFilterItemLabelClick,
    markAllValuesActive,
    onClick,
    anchorEl,
    values,
    CustomRender,
    groupName,
}: FilterGroupPopoverMenuProps): JSX.Element => {
    const [searchText, setSearchText] = useState<string>('');

    const {
        filterGroupState: { getCountForFilterValue },
        filterState: { getValueFormatters, getFilterState },
        operations: { setFilterState },
    } = useFilterApiContext();
    const valueFormatter = getValueFormatters().find(
        ({ name }) => name === groupName
    )?.valueFormatter;

    const handleInput = (e) => setSearchText(e.target.value.toString().toLowerCase());

    const getValuesMatchingSearchText = () =>
        values.filter((s) => !searchText || s?.toString().toLowerCase().startsWith(searchText));

    const setFilterStateFromSearch = () => {
        const valuesMatchingSearch = values.filter(
            (s) => !getValuesMatchingSearchText().includes(s)
        );

        setFilterState([
            ...getFilterState().filter((s) => s.name !== groupName),
            {
                name: groupName,
                values: valuesMatchingSearch,
            },
        ]);
        setSearchText('');
        onClick();
    };

    return (
        <Menu
            id="menu-complex"
            aria-labelledby="anchor-complex"
            open={true}
            anchorEl={anchorEl}
            onClose={onClick}
            placement={'bottom-end'}
        >
            <MenuWrapper>
                {values.length > 7 && (
                    <>
                        <SearchHolder>
                            <Search
                                value={searchText}
                                placeholder="Search"
                                onInput={handleInput}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        setFilterStateFromSearch();
                                    }
                                }}
                            />
                        </SearchHolder>
                        <VerticalLine />
                    </>
                )}

                <List>
                    {getValuesMatchingSearchText().map((value) => (
                        <FilterItemCheckbox
                            key={value}
                            ValueRender={() => CustomRender(value)}
                            filterValue={value}
                            handleFilterItemClick={() => handleFilterItemClick(value)}
                            handleFilterItemLabelClick={() => handleFilterItemLabelClick(value)}
                            isChecked={isChecked(value)}
                            count={getCountForFilterValue(
                                { name: groupName, values },
                                value,
                                valueFormatter
                            )}
                        />
                    ))}
                </List>
                <VerticalLine />
                <ClearButtonWrapper>
                    <Button onClick={markAllValuesActive} variant="ghost">
                        Clear
                    </Button>
                </ClearButtonWrapper>
            </MenuWrapper>
        </Menu>
    );
};

const List = styled.div`
    max-height: 250px;
    padding: 8px 8px;
    overflow: scroll;
    height: auto;
`;
