import { Menu, Button, Search } from '@equinor/eds-core-react';
import { memo, useCallback, useRef, useState } from 'react';
import { useVirtual } from 'react-virtual';
import styled from 'styled-components';
import { useFilterApiContext } from '../../../../../../packages/Filter/Hooks/useFilterApiContext';
import { FilterValueType } from '../../../../../../packages/Filter/Types';
import { FilterItemCheckbox } from '../FilterItemCheckbox';
import {
    ClearButtonWrapper,
    FilterItemList,
    MenuWrapper,
    SearchHolder,
    VerticalLine,
} from './groupStyles';

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
                    <VirtualList
                        items={getValuesMatchingSearchText()}
                        rowLength={getValuesMatchingSearchText().length}
                        isChecked={isChecked}
                        handleFilterItemLabelClick={(value) => handleFilterItemLabelClick(value)}
                        handleFilterItemClick={(value) => handleFilterItemClick(value)}
                        valueRender={(value) => CustomRender(value)}
                        count={(value) =>
                            getCountForFilterValue(
                                { name: groupName, values },
                                value,
                                valueFormatter
                            )
                        }
                    />
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

interface VirtualListProps {
    items: FilterValueType[];
    rowLength: number;
    isChecked: (value: FilterValueType) => boolean;
    handleFilterItemLabelClick: (value: FilterValueType) => void;
    handleFilterItemClick: (value: FilterValueType) => void;
    count: (value: FilterValueType) => number;
    valueRender: (value: FilterValueType) => JSX.Element;
}
const VirtualList = ({
    items,
    handleFilterItemClick,
    handleFilterItemLabelClick,
    isChecked,
    count,
    valueRender,
}: VirtualListProps) => {
    return (
        <>
            {items.map((s) => (
                <FilterItemCheckbox
                    key={s}
                    ValueRender={() => valueRender(s)}
                    filterValue={s}
                    handleFilterItemClick={() => handleFilterItemClick(s)}
                    handleFilterItemLabelClick={() => handleFilterItemLabelClick(s)}
                    isChecked={isChecked(s)}
                    count={count(s)}
                />
            ))}
        </>
    );
};
