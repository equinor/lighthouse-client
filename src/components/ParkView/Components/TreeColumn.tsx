import { DataSet } from '../Models/data';
import { Items } from './Items';
import { Group } from './Group';

interface TreeColumnProps<T> {
    group: DataSet<T>;
}

export function TreeColumn<T>({ group }: TreeColumnProps<T>): JSX.Element | null {
    if (!group) {
        return null;
    }

    const columnExpanded = group.isExpanded;

    return (
        <>
            {group.items[0] != null ? (
                <Items data={group.items} columnExpanded={columnExpanded} />
            ) : (
                <>
                    {Object.keys(group.subGroups).map((groupKey, index) => (
                        <Group
                            key={groupKey + index}
                            group={group.subGroups[groupKey]}
                            columnExpanded={columnExpanded}
                        />
                    ))}
                </>
            )}
        </>
    );
}
