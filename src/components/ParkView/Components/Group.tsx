import { Count } from '../Styles/common';
import { Pack, SubGroup } from '../Styles/group';
import { ChevronUp, ChevronDown } from '../Icons/Chevron';
import { DataSet } from '../Models/data';
import { Items } from './Items';
import { useParkViewContext } from '../Context/ParkViewProvider';
import { useRefresh } from '../hooks/useRefresh';
import { FieldSettings } from '../Models/fieldSettings';
import { defaultSortFunction } from '../Utils/utilities';
import { useMemo } from 'react';

type GroupProps<T extends Record<PropertyKey, unknown>> = {
  group: DataSet<T>;
  columnExpanded: boolean;
  fieldSettings?: FieldSettings<T>;
};

export function Group<T extends Record<PropertyKey, unknown>>({
  group,
  columnExpanded,
  fieldSettings,
}: GroupProps<T>): JSX.Element {
  const refresh = useRefresh();
  const { customView, gardenKey, groupByKeys } = useParkViewContext<T>();

  const handleClick = () => {
    refresh();
    group.isExpanded = !group.isExpanded;
  };

  const GroupView = customView?.customGroupView;

  const subGroupKeys = useMemo(
    () => group.subGroups.map((sub) => sub.value) || [],
    [group.subGroups]
  );

  return (
    <SubGroup>
      {GroupView ? (
        <GroupView
          key={group.value}
          data={group}
          onClick={handleClick}
          columnExpanded={columnExpanded}
          groupByKeys={[gardenKey, ...groupByKeys]}
        />
      ) : (
        <Pack key={group.value + String(group.groupKey)} onClick={handleClick}>
          <div style={{ display: 'flex' }}>
            {group.status?.statusElement}
            {group.value}
            {group.description && ' - ' + group.description}
            <Count>({group.count})</Count>
          </div>
          {group.isExpanded ? <ChevronUp /> : <ChevronDown />}
        </Pack>
      )}

      {group.isExpanded &&
        (group.items[0] != null ? (
          <Items data={group.items} columnExpanded={columnExpanded} />
        ) : (
          <>
            {subGroupKeys
              .sort(
                fieldSettings?.[group.subGroups?.[0]?.groupKey]?.getColumnSort ||
                  defaultSortFunction
              )
              .map((_, i) => (
                <Group
                  key={group.subGroups[i].value}
                  group={group.subGroups[i]}
                  columnExpanded={columnExpanded}
                />
              ))}
          </>
        ))}
    </SubGroup>
  );
}
