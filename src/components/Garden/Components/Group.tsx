import { useCallback, useEffect, useState } from "react";

import { Count, Pack } from '../Styles/gardenStyle';
import { ChevronUp, ChevronDown } from '../Icons/Chevron';
import { DataSet } from '../Models/data';
import { Items } from '../Components/Items';

interface GroupProps<T> {
    group: DataSet<T>;
    itemKey: string;
}

export function Group<T>({ group, itemKey }: GroupProps<T>): JSX.Element {
    const [isExpanded, setIsExpanded] = useState(group.isExpanded);
    const handleClick = () => {
        setIsExpanded((prev) => (!prev));
        group.isExpanded = !group.isExpanded;
    }




    return (
        <>
            <Pack key={group.value} onClick={() => handleClick()}>
                {group.value}
                <Count>({group.count})</Count>
                {group.isExpanded ? <ChevronUp /> : <ChevronDown />}
            </Pack>
            {group.isExpanded && (group.items[0] != null ? <Items data={group.items} itemKey={itemKey} /> :
                <> {Object.values(group.subGroups).map((x) => (<Group group={x} itemKey={itemKey} />))}</>)}
        </>
    )
}