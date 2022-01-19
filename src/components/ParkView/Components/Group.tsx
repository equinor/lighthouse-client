import { Count } from '../Styles/common';
import { Pack, SubGroup } from '../Styles/group';
import { ChevronUp, ChevronDown } from '../Icons/Chevron';
import { DataSet } from '../Models/data';
import { Items } from './Items';
import { useParkViewContext } from '../Context/ParkViewProvider';
import { useRefresh } from '../hooks/useRefresh';
import { FieldSettings } from '../Models/fieldSettings';
import { defaultSortFunction } from '../Utils/utilities';

interface GroupProps<T> {
    group: DataSet<T>;
    columnExpanded: boolean;
    fieldSettings?: FieldSettings<T>;
}

export function Group<T>({ group, columnExpanded, fieldSettings }: GroupProps<T>): JSX.Element {
    const refresh = useRefresh();
    const { customView } = useParkViewContext<T>();

    const handleClick = () => {
        refresh();
        group.isExpanded = !group.isExpanded;
    };

    const GroupView = customView?.customGroupView || null;

    const subGroupKeys = Object.keys(group.subGroups) || [];

    return (
        <SubGroup>
            {GroupView ? (
                <GroupView
                    key={group.value}
                    data={group}
                    onClick={handleClick}
                    columnExpanded={columnExpanded}
                />
            ) : (
                <Pack key={group.value + group.groupKey} onClick={handleClick}>
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
                            .map((groupKey) => (
                                <Group
                                    key={group.subGroups[groupKey].value}
                                    group={group.subGroups[groupKey]}
                                    columnExpanded={columnExpanded}
                                />
                            ))}
                    </>
                ))}
        </SubGroup>
    );
}
