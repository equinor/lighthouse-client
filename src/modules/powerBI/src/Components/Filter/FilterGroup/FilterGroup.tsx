import { Icon } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import { useState, useRef } from 'react';
import { getFilterHeaderText } from '../../../../../../Core/WorkSpace/src/Components/QuickFilter/FilterGroup/FilterGroup';
import { FilterGroupWrapper } from '../../../../../../Core/WorkSpace/src/Components/QuickFilter/FilterGroup/groupStyles';
import { PowerBiFilter, PowerBiFilterItem, ActiveFilter } from '../../../Types';
import { PowerBiGroupPopoverMenu } from '../PopoverGroup/PopoverGroup';
import { FilterController } from '../types';

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
            <FilterGroupWrapper onClick={() => setIsOpen((s) => !s)} ref={anchorEl}>
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
                    values={group?.value ? Object.values(group?.value) : []}
                    onClickFilter={(filter: PowerBiFilterItem, singleClick?: boolean) =>
                        handleOnChange(filter, singleClick)
                    }
                    onCloseMenu={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};
