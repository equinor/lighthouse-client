import { Count } from '../Styles/common';
import { Pack, SubGroup } from '../Styles/group';
import { ChevronUp, ChevronDown } from '../Icons/Chevron';
import { DataSet } from '../Models/data';
import { Items } from './Items';
import { useParkViewContext } from '../Context/ParkViewProvider';
import { useRefresh } from '../hooks/useRefresh';

interface GroupProps<T> {
    group: DataSet<T>;
    columnExpanded: boolean;
}

export function Group<T>({ group, columnExpanded }: GroupProps<T>): JSX.Element {
    const refresh = useRefresh();
    const { customView } = useParkViewContext<T>();

    const handleClick = () => {
        refresh();
        group.isExpanded = !group.isExpanded;
    };

    const GroupView = customView.customGroupView || null;

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
                <Pack key={group.value + group.groupKey} onClick={() => handleClick()}>
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
                        {Object.values(group.subGroups).map((x) => (
                            <Group key={x.value} group={x} columnExpanded={columnExpanded} />
                        ))}
                    </>
                ))}
        </SubGroup>
    );
}
