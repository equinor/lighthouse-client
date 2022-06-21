import { Icon, Menu, Button, Search } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { Case } from '../../../../../components/JSXSwitch/Components/Case';
import { Switch } from '../../../../../components/JSXSwitch/Components/Switch';
import { getFilterHeaderText } from '../../../../../Core/WorkSpace/src/Components/QuickFilter/FilterGroup/FilterGroup';

import {
    FilterItemList,
    VerticalLine,
    ClearButtonWrapper,
    FilterGroupWrapper,
    SearchHolder,
} from '../../../../../Core/WorkSpace/src/Components/QuickFilter/FilterGroup/groupStyles';
import { FilterItemCheckbox } from '../../../../../Core/WorkSpace/src/Components/QuickFilter/FilterItemCheckbox';
import { FilterClearIcon } from '../../../../../Core/WorkSpace/src/Components/QuickFilter/Icons/FilterClear';
import { FilterCollapseIcon } from '../../../../../Core/WorkSpace/src/Components/QuickFilter/Icons/FilterCollapsIcon';
import { FilterExpandIcon } from '../../../../../Core/WorkSpace/src/Components/QuickFilter/Icons/FilterExpandIcon';
import { CompactFilterWrapper } from '../../../../../Core/WorkSpace/src/Components/QuickFilter/QuickFilter';
import { PowerBiFilterItem, PowerBiFilter, ActiveFilter } from '../../Types';
import { ExpandedFilter } from './ExpandedFilter/ExpandedFilter';
import { FilterController } from './PowerBIFilter';

interface PowerBIQuickFilterProps {
    controller: FilterController;
}

const FilterBar = styled.div`
    padding-right: 12px;
    display: flex;
    justify-content: flex-end;
    gap: 2em;
    align-items: center;
`;

export const PowerBIQuickFilter = ({ controller }: PowerBIQuickFilterProps): JSX.Element => {
    const {
        activeFilters,
        handleOnChange,
        isAnyFiltersActive,
        resetFilter,
        slicerFilters,
        isFilterExpanded,
        setIsFilterExpanded,
    } = controller;

    return (
        <>
            <CompactFilterWrapper>
                <FilterBar>
                    {!isFilterExpanded && (
                        <>
                            {slicerFilters.map(
                                (s, i) =>
                                    i < 10 && (
                                        <PowerBiFilterGroup
                                            activeFilters={activeFilters[s.type]}
                                            controller={controller}
                                            handleOnChange={(
                                                filter: PowerBiFilterItem,
                                                singleClick?: boolean
                                            ) => handleOnChange(s, filter, singleClick)}
                                            group={s}
                                            key={s.type + i}
                                        />
                                    )
                            )}
                        </>
                    )}

                    <FilterClearIcon
                        isDisabled={!isAnyFiltersActive()}
                        onClick={async () => await resetFilter()}
                    />

                    <div onClick={() => setIsFilterExpanded(!isFilterExpanded)}>
                        {isFilterExpanded ? <FilterCollapseIcon /> : <FilterExpandIcon />}
                    </div>
                </FilterBar>
            </CompactFilterWrapper>
            {isFilterExpanded && <ExpandedFilter controller={controller} />}
        </>
    );
};

interface PowerBiFilterGroupProps {
    controller: FilterController;
    group: PowerBiFilter;
    handleOnChange: (filter: PowerBiFilterItem, singleClick?: boolean) => Promise<void>;
    activeFilters: ActiveFilter[];
}
export const PowerBiFilterGroup = ({
    group,
    activeFilters,
    controller,
    handleOnChange,
}: PowerBiFilterGroupProps): JSX.Element | null => {
    const [isOpen, setIsOpen] = useState(false);
    const anchorEl = useRef<HTMLDivElement>(null);

    if (!activeFilters) return null;
    const isAllChecked =
        activeFilters.length === 0 || activeFilters.length === group.filterVals.length;
    return (
        <div>
            <FilterGroupWrapper onClick={() => setIsOpen(true)} ref={anchorEl}>
                <div>
                    {getFilterHeaderText(
                        isAllChecked,
                        group.type,
                        activeFilters.map((s) => s?.toString() ?? '(Blank)')
                    )}
                </div>

                <Icon color={tokens.colors.text.static_icons__tertiary.hex} name="chevron_down" />
            </FilterGroupWrapper>
            {isOpen && (
                <PowerBiGroupPopoverMenu
                    controller={controller}
                    checkedValues={activeFilters}
                    anchorEl={anchorEl.current}
                    group={group}
                    values={Object.values(group.value)}
                    onClickFilter={(filter: PowerBiFilterItem, singleClick?: boolean) =>
                        handleOnChange(filter, singleClick)
                    }
                    onCloseMenu={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

interface PowerBiGroupPopoverMenuProps {
    anchorEl: HTMLElement | undefined | null;
    values: PowerBiFilterItem[];
    onClickFilter: (filter: PowerBiFilterItem, singleClick?: boolean) => Promise<void>;
    onCloseMenu: () => void;
    checkedValues: ActiveFilter[];
    group: PowerBiFilter;
    controller: FilterController;
}

export const PowerBiGroupPopoverMenu = ({
    anchorEl,
    onClickFilter,
    controller,
    values,
    group,
    checkedValues,
    onCloseMenu,
}: PowerBiGroupPopoverMenuProps): JSX.Element => {
    const markAllValuesActive = (filter: PowerBiFilterItem) =>
        controller.handleOnSelectAll(
            group,
            filter,
            values.map((s) => s.value)
        );

    const [searchText, setSearchText] = useState('');

    const handleInput = (e) => {
        const value = e.target.value;
        setSearchText(value.toString().toLowerCase());
    };

    const setFilterStateFromSearch = async () => {
        const searchResults = getValuesMatchingSearchText().map((s) => s.value);

        await controller.handleOnSelectAll(group, values[0], searchResults);
    };

    const getValuesMatchingSearchText = () =>
        values.filter(
            (s) => !searchText || s.value?.toString().toLowerCase().startsWith(searchText)
        );

    return (
        <Menu
            id="menu-complex"
            aria-labelledby="anchor-complex"
            open={true}
            anchorEl={anchorEl}
            onClose={onCloseMenu}
            placement={'bottom-end'}
        >
            <MenuWrapper>
                <Switch>
                    <Case when={values.length === 0}>
                        <div style={{ paddingLeft: '10px' }}>No available selections</div>
                    </Case>
                    <Case when={true}>
                        <>
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

                            <FilterItemList>
                                {getValuesMatchingSearchText().map((item) => (
                                    <FilterItemCheckbox
                                        ValueRender={() => <div>{item.value}</div>}
                                        handleFilterItemLabelClick={() => onClickFilter(item, true)}
                                        key={item.type + item.value}
                                        filterValue={item.value}
                                        handleFilterItemClick={() => onClickFilter(item, false)}
                                        isChecked={!checkedValues.includes(item.value)}
                                    />
                                ))}
                            </FilterItemList>
                            <VerticalLine />
                            <ClearButtonWrapper>
                                <Button
                                    onClick={() => markAllValuesActive(values[0])}
                                    variant="ghost"
                                >
                                    Clear
                                </Button>
                            </ClearButtonWrapper>
                        </>
                    </Case>
                </Switch>
            </MenuWrapper>
        </Menu>
    );
};

const MenuWrapper = styled.div`
    width: 200px;
`;
