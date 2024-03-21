import { useCallback, useMemo } from 'react';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { ActiveGroupings } from './ActiveGroupings';
import { SelectRowWrapper, Separator } from './groupBy.styles';
import { InitialGroupBy } from './InitialGroupBy';
import { NextGroupBy } from './NextGroupBy';

export function GroupingSelector<T extends Record<PropertyKey, unknown>>(): JSX.Element | null {
  const { groupByKeys, data, gardenKey, fieldSettings, customViews } = useParkViewContext<T>();

  const CustomGroupByView = customViews?.customGroupByView;

  const allOptions = useMemo(
    () =>
      fieldSettings && Object.keys(fieldSettings).length
        ? Object.keys(fieldSettings)
        : Object.keys(data?.[0] || {}),
    [fieldSettings, data]
  );

  const filterGroupKey = useCallback(
    (groupKey: string) => !(groupKey === gardenKey || groupByKeys.includes(groupKey as keyof T)),
    [gardenKey, groupByKeys]
  );

  const groupingOptions = useMemo(
    (): string[] =>
      data.length
        ? allOptions
            .filter(filterGroupKey)
            .map((groupKey) => fieldSettings?.[groupKey]?.label || groupKey)
            .sort()
        : [],

    [data, fieldSettings, filterGroupKey, allOptions]
  );

  if (!data) return null;

  return (
    <SelectRowWrapper>
      {CustomGroupByView && <CustomGroupByView />}
      <Separator> Group by </Separator>
      <InitialGroupBy groupingOptions={groupingOptions} />
      <Separator>then</Separator>
      <ActiveGroupings groupingOptions={groupingOptions} />
      <NextGroupBy groupingOptions={groupingOptions} />
    </SelectRowWrapper>
  );
}
