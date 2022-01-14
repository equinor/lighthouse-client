import { DataSet } from '../Models/data';
import { Items } from './Items';
import { Group } from './Group';
import styled from 'styled-components';

interface TreeColumnProps<T> {
    group: DataSet<T>;
}

const Groups = styled.div`
    width: 100%;
    box-sizing: border-box;

    > div {
        width: 100%;
        margin: 0px;
    }
`;

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
                <Groups>
                    {Object.keys(group.subGroups).map((groupKey, index) => (
                        <Group
                            key={groupKey + index}
                            group={group.subGroups[groupKey]}
                            columnExpanded={columnExpanded}
                        />
                    ))}
                </Groups>
            )}
        </>
    );
}
