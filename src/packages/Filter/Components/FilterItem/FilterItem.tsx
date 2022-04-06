import { Checkbox } from '@equinor/eds-core-react';
import { memo, useEffect, useMemo, useState } from 'react';
import { useIsMounted } from '../../../../apps/DisciplineReleaseControl/Hooks/useIsMounted';
import { FilterGroup } from '../../Hooks/useFilterApi';

import { useFilterApiContext } from '../../Hooks/useFilterApiContext';
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
    const [count, setCount] = useState<string | number>('.');

    const isMounted = useIsMounted();
    const id = setTimeout(
        () => isMounted && setCount(getCountForFilterValue(filterGroup, filterItem)),
        200
    );

    useEffect(() => {
        return () => clearInterval(id);
    }, []);

    const {
        filterGroupState: { getCountForFilterValue, checkValueIsInActive, getGroupValues },
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
                {CustomRender(filterItem)}
            </FilterItemName>
            {!isUnChecked && <Count>({count})</Count>}
        </FilterItemWrap>
    );
};

export const FilterItemValue = memo(FilterItem);
