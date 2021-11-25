import { Count } from '../Styles/common';
import { Pack, SubGroup } from '../Styles/group';
import { ChevronUp, ChevronDown } from '../Icons/Chevron';
import { DataSet } from '../Models/data';
import { Items } from '../Components/Items';
import { useGardenContext } from '../Context/GardenProvider';
import { useRefresh } from '../hooks/useRefresh';

interface GroupProps<T> {
    group: DataSet<T>;
}

export function Group<T>({ group }: GroupProps<T>): JSX.Element {
    const refresh = useRefresh();
    const { customGroupView } = useGardenContext<T>();

    const handleClick = () => {
        refresh();
        group.isExpanded = !group.isExpanded;
    };
    const CustomRender = customGroupView;

    return (
        <SubGroup>
            {CustomRender ? (
                <CustomRender key={group.value} data={group} onClick={handleClick}>
                    {group.value}
                </CustomRender>
            ) : (
                <Pack key={group.value + group.groupKey} onClick={() => handleClick()}>
                    <div>
                        {group.value}
                        <Count>({group.count})</Count>
                    </div>
                    {group.isExpanded ? <ChevronUp /> : <ChevronDown />}
                </Pack>
            )}

            {group.isExpanded &&
                (group.items[0] != null ? (
                    <Items data={group.items} />
                ) : (
                    <>
                        {Object.values(group.subGroups).map((x) => (
                            <Group key={x.value} group={x} />
                        ))}
                    </>
                ))}
        </SubGroup>
    );
}
