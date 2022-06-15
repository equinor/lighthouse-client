import { Button, EdsProvider, Menu, Search } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { FilterValueType, useFilterApiContext } from '@equinor/filter';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';
import { FilterItemCheckbox } from './FilterItemCheckbox';

interface FilterGroupProps {
    name: string;
    isOpen: boolean;
    onClick: () => void;
}
export const FilterGroup = ({ name, isOpen, onClick }: FilterGroupProps): JSX.Element => {
    const ref = useRef<HTMLDivElement>(null);
    const { filterOptions = [] } = useWorkSpace();

    const {
        filterGroupState,
        operations: { changeFilterItem, markAllValuesActive },
    } = useFilterApiContext();

    const values = filterGroupState.getGroupValues(name);

    const isChecked = (filterValue: FilterValueType) =>
        filterGroupState.checkValueIsInActive(name, filterValue);

    const handleFilterItemClick = (filterItem: FilterValueType) =>
        changeFilterItem(isChecked(filterItem) ? 'MarkActive' : 'MarkInactive', name, filterItem);

    const isAllChecked = filterGroupState.getInactiveGroupValues(name).length === 0;

    const checkedValues = values.filter(
        (s) => !filterGroupState.getInactiveGroupValues(name).includes(s)
    );

    const customRender =
        filterOptions.find((s) => s.name === name)?.customValueRender ??
        ((v) => <>{v?.toString() ?? '(Blank)'}</>);

    if (values.length === 0) return <></>;
    return (
        <div>
            <FilterGroupWrapper ref={ref} onClick={onClick}>
                {getFilterHeaderText(isAllChecked, name, checkedValues)}
            </FilterGroupWrapper>
            {isOpen && (
                <FilterGroupPopoverMenu
                    handleFilterItemClick={handleFilterItemClick}
                    isChecked={isChecked}
                    isOpen={isOpen}
                    markAllValuesActive={() => markAllValuesActive(name)}
                    onClick={onClick}
                    anchorEl={ref.current}
                    values={values}
                    CustomRender={customRender}
                />
            )}
        </div>
    );
};

interface FilterGroupPopoverMenuProps {
    isOpen: boolean;
    anchorEl: HTMLElement | null | undefined;
    onClick: () => void;
    values: FilterValueType[];
    handleFilterItemClick: (item: FilterValueType) => void;
    isChecked: (filterValue: FilterValueType) => boolean;
    markAllValuesActive: () => void;
    CustomRender: (value: FilterValueType) => JSX.Element;
}
const FilterGroupPopoverMenu = ({
    handleFilterItemClick,
    isChecked,
    isOpen,
    markAllValuesActive,
    onClick,
    anchorEl,
    values,
    CustomRender,
}: FilterGroupPopoverMenuProps) => {
    const [searchText, setSearchText] = useState<string>('');

    return (
        <Menu
            id="menu-complex"
            aria-labelledby="anchor-complex"
            open={isOpen}
            anchorEl={anchorEl}
            onClose={onClick}
            placement={'bottom-start'}
        >
            <MenuWrapper>
                {values.length > 7 && (
                    <>
                        <SearchHolder>
                            <Search
                                value={searchText}
                                placeholder="Search"
                                onInput={(e) =>
                                    setSearchText(e.target.value.toString().toLowerCase())
                                }
                            />
                        </SearchHolder>
                        <VerticalLine />
                    </>
                )}

                <FilterItemList>
                    {values
                        .filter(
                            (s) => !searchText || s?.toString().toLowerCase().startsWith(searchText)
                        )
                        .map((value) => (
                            <FilterItemCheckbox
                                ValueRender={() => CustomRender(value)}
                                key={value}
                                filterValue={value}
                                handleFilterItemClick={handleFilterItemClick}
                                isChecked={isChecked}
                            />
                        ))}
                </FilterItemList>
                <VerticalLine />
                <ClearButtonWrapper>
                    <Button onClick={() => markAllValuesActive()} variant="ghost">
                        Clear
                    </Button>
                </ClearButtonWrapper>
            </MenuWrapper>
        </Menu>
    );
};

function getFilterHeaderText(
    isAllChecked: boolean,
    name: string,
    checkedValues: FilterValueType[]
): string | JSX.Element {
    if (isAllChecked || checkedValues.length === 0) return <NormalText>{name}</NormalText>;

    return checkedValues.length - 1 > 0
        ? `${checkedValues[0] ?? '(Blank)'}(+${checkedValues.length - 1})`
        : `${checkedValues[0]}`;
}

const NormalText = styled.div`
    font-weight: 400;
`;

const SearchHolder = styled.div`
    padding-right: 0.5em;
    padding-left: 0.5em;
    padding-top: 0.8em;
    padding-bottom: calc(8px + 0.8em);
`;

const MenuWrapper = styled.div`
    width: 200px;
`;

const FilterItemList = styled.div`
    max-height: 250px;
    overflow: scroll;
    padding: 8px 3px;

    ::-webkit-scrollbar-thumb {
        background: ${tokens.colors.ui.background__medium.hex};
        border-radius: 5px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: ${tokens.colors.ui.background__medium.hex};
    }
`;

const ClearButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 8px;
    padding-right: 5px;
`;

const FilterGroupWrapper = styled.div`
    height: auto;
    border-bottom: ${tokens.colors.ui.background__medium.hex} 2px solid;
    width: 200px;
    display: flex;
    align-items: center;
    cursor: pointer;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    font-size: 14px;
    font-weight: 700;
    line-height: 20px;

    text-align: left;
`;

const VerticalLine = styled.div`
    width: 100%;
    height: 2px;
    background-color: ${tokens.colors.ui.background__medium.hex};
`;
