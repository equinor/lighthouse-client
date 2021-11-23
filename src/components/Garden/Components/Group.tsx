import { useState } from 'react';

import { Count, Pack } from '../Styles/gardenStyle';
import { ChevronUp, ChevronDown } from '../Icons/Chevron';
import { DataSet } from '../Models/data';
import { Items } from '../Components/Items';

interface GroupProps<T> {
    group: DataSet<T>;
    itemKey: string;
    customGroupView?: React.FC<{ data: DataSet<T>; onClick: () => void }>;
    statusFunc?: (data: T) => string;
}

export function Group<T>({
    group,
    itemKey,
    customGroupView,
    statusFunc,
}: GroupProps<T>): JSX.Element {
    const [isExpanded, setIsExpanded] = useState(group.isExpanded);
    const handleClick = () => {
        setIsExpanded((prev) => !prev);
        group.isExpanded = !group.isExpanded;
    };
    const CustomRender = customGroupView;

    return (
        <>
            {CustomRender ? (
                <CustomRender key={group.value} data={group} onClick={handleClick}>
                    {group.value}{' '}
                </CustomRender>
            ) : (
                <Pack key={group.value + group.groupKey} onClick={() => handleClick()}>
                    {group.value}
                    <Count>({group.count})</Count>
                    {group.isExpanded ? <ChevronUp /> : <ChevronDown />}
                </Pack>
            )}

            {group.isExpanded &&
                (group.items[0] != null ? (
                    <Items data={group.items} statusFunc={statusFunc} itemKey={itemKey} />
                ) : (
                    <>
                        {Object.values(group.subGroups).map((x) => (
                            <Group
                                key={x.value}
                                group={x}
                                customGroupView={customGroupView}
                                itemKey={itemKey}
                            />
                        ))}
                    </>
                ))}
        </>
    );
}
