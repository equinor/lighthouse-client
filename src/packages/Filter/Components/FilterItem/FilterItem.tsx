import { Checkbox } from '@equinor/eds-core-react-old';
import { memo, useMemo } from 'react';
import { FilterGroup, ValueFormatterFunction } from '../../Hooks/useFilterApi';

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
  valueFormatter: ValueFormatterFunction<Record<PropertyKey, unknown>>;
  CustomRender?: (value: FilterValueType) => JSX.Element;
};

export const FilterItem = ({
  virtualRowStart,
  virtualRowSize,
  filterItem,
  filterGroup,
  valueFormatter,
  CustomRender = (value) => <>{sanitizeFilterItemName(value)}</>,
}: FilterItemValueProps): JSX.Element => {
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
  const count = useMemo(
    () => getCountForFilterValue(filterGroup, filterItem, valueFormatter),
    [getCountForFilterValue, filterGroup.name, filterItem]
  );
  return (
    <FilterItemWrap
      title={typeof filterItem === 'string' ? filterItem : '(Blank)'}
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
        crossOrigin={undefined}
        checked={!isUnChecked}
        onChange={() =>
          changeFilterItem(
            isUnChecked ? 'MarkActive' : 'MarkInactive',
            filterGroup.name,
            filterItem
          )
        }
      />
      <FilterItemName onClick={uncheckAllButThisValue}>{CustomRender(filterItem)}</FilterItemName>
      {!isUnChecked && <Count>({count})</Count>}
    </FilterItemWrap>
  );
};

export const FilterItemValue = memo(FilterItem);
