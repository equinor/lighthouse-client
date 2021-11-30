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

    return (
        <>
            {group.items[0] != null ? (
                <Items data={group.items} />
            ) : (
                <>
                    {Object.keys(group.subGroups).map((groupKey, index) => (
                        <Group key={groupKey + index} group={group.subGroups[groupKey]} />
                    ))}
                </>
            )}
        </>
    );
}
