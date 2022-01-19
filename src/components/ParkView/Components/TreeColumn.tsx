import { DataSet } from '../Models/data';
import { Items } from './Items';
import { Group } from './Group';
import styled from 'styled-components';
import { FieldSettings } from '../Models/fieldSettings';

interface TreeColumnProps<T> {
    group: DataSet<T>;
    fieldSettings?: FieldSettings<T>;
}

const Groups = styled.div`
    width: 100%;
    box-sizing: border-box;

    > div {
        width: 100%;
        margin: 0px;
    }
`;

const defaultSortFunction = (a: string, b: string) => a.localeCompare(b);

export function TreeColumn<T>({ group, fieldSettings }: TreeColumnProps<T>): JSX.Element | null {
    if (!group) {
        return null;
    }

    const columnExpanded = group.isExpanded;
    const subGroupKeys = Object.keys(group.subGroups) || [];

    return (
        <>
            {group.items[0] != null ? (
                <Items data={group.items} columnExpanded={columnExpanded} />
            ) : (
                <Groups>
                    {subGroupKeys
                        .sort(
                            fieldSettings?.[group.subGroups?.[0]?.groupKey]?.getColumnSort ||
                                defaultSortFunction
                        )
                        .map((groupKey, index) => (
                            <Group
                                key={groupKey + index}
                                group={group.subGroups[groupKey]}
                                columnExpanded={columnExpanded}
                                fieldSettings={fieldSettings}
                            />
                        ))}
                </Groups>
            )}
        </>
    );
}
