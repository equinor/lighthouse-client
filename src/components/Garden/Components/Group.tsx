import { useEffect, useState } from "react";

import { Count, Pack } from '../Styles/gardenStyle';
import { ChevronUp, ChevronDown } from '../Icons/Chevron';
import { DataSet } from '../Models/data';
import { Items } from '../Components/Items';

interface GroupProps<T> {
    group: DataSet<T>;
    itemKey: string;
}

export function Group<T>({ group, itemKey }: GroupProps<T>): JSX.Element {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const handleClick = (data: DataSet<T>): void => {
        setIsExpanded((prev) => !prev);
    }

    useEffect(() => {
    }, [group, isExpanded])

    return (
        <>
            <Pack key={group.value} onClick={() => handleClick(group)}>
                {group.value}
                <Count>({group.count})</Count>
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </Pack>
            {isExpanded && (group.items[0] != null ? <Items data={group.items} itemKey={itemKey} /> :
                <> {Object.values(group.subGroups).map((x) => (<Group group={x} itemKey={itemKey} />))}</>)}
        </>
    )
}