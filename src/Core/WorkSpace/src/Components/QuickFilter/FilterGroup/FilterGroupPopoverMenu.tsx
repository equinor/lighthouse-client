import { Menu, Button, Search } from '@equinor/eds-core-react';
import { useState } from 'react';
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
}: FilterGroupPopoverMenuProps): JSX.Element => {
    const [searchText, setSearchText] = useState<string>('');

    const handleInput = (e) => setSearchText(e.target.value.toString().toLowerCase());
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
                            <Search value={searchText} placeholder="Search" onInput={handleInput} />
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
                                handleFilterItemLabelClick={() => handleFilterItemLabelClick(value)}
                                key={value}
                                filterValue={value}
                                handleFilterItemClick={() => handleFilterItemClick(value)}
                                isChecked={isChecked(value)}
                            />
                        ))}
                </FilterItemList>
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
