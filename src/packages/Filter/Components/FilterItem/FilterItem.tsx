import { Checkbox } from '@equinor/eds-core-react';
import { memo, useEffect, useRef, useState } from 'react';
import { useIsMounted } from '../../../../apps/DisciplineReleaseControl/Hooks/useIsMounted';
import { useRefresh } from '../../../../components/ParkView/hooks/useRefresh';
import { FilterGroup } from '../../Hooks/useFilterApi';

import { useFilterApiContext, useItemCountsContext } from '../../Hooks/useFilterApiContext';
import { FilterValueType } from '../../Types/filter';
import { DEFAULT_NULL_VALUE } from '../FilterGroup/utils';
import { Count, FilterItemName, FilterItemWrap } from './FilterItem-Styles';

const sanitizeFilterItemName = (value: FilterValueType) => value?.toString() ?? DEFAULT_NULL_VALUE;

type FilterItemValueProps = {
    virtualRowStart: number;
    virtualRowSize: number;
    filterItem: FilterValueType;
    filterGroup: FilterGroup;
    CustomRender?: (value: FilterValueType) => JSX.Element;
};

export const FilterItem = ({
    virtualRowStart,
    virtualRowSize,
    filterItem,
    filterGroup,
    CustomRender = (value) => <>{sanitizeFilterItemName(value)}</>,
}: FilterItemValueProps): JSX.Element => {
    const { addToQueue, isCounted, getCount, removeFromQueue } = useItemCountsContext();
    const count = useRef(
        isCounted(filterGroup.name, filterItem) ? getCount(filterGroup, filterItem) : null
    );

    const refresh = useRefresh();
    const isMounted = useIsMounted();

    useEffect(() => {
        if (!isCounted(filterGroup.name, filterItem)) {
            addToQueue(filterGroup, filterItem, (newCount) => {
                count.current = newCount;
                isMounted && refresh();
            });
        }

        // return () => {
        //     removeFromQueue(filterGroup.name, filterItem);
        // };
    }, []);

    const {
        filterGroupState: { checkValueIsInActive, getGroupValues },
        operations: { changeFilterItem },
    } = useFilterApiContext();
    function uncheckAllButThisValue() {
        getGroupValues(filterGroup.name).forEach((value) =>
            changeFilterItem('MarkInactive', filterGroup.name, value, true)
        );

        changeFilterItem('MarkActive', filterGroup.name, filterItem);
    }
    const isUnChecked = checkValueIsInActive(filterGroup.name, filterItem);

    return (
        <FilterItemWrap
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRowStart}px)`,
                height: `${virtualRowSize}px`,
            }}
        >
            <Checkbox
                checked={!isUnChecked}
                onChange={() =>
                    changeFilterItem(
                        isUnChecked ? 'MarkActive' : 'MarkInactive',
                        filterGroup.name,
                        filterItem
                    )
                }
            />
            <FilterItemName onClick={uncheckAllButThisValue}>
                <span>{CustomRender(filterItem)}</span>
            </FilterItemName>
            {!isUnChecked && <Count>({count.current})</Count>}
        </FilterItemWrap>
    );
};

export const FilterItemValue = memo(FilterItem);
