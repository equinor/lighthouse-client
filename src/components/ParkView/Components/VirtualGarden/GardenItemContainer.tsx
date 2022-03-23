import { useVirtual, VirtualItem } from 'react-virtual';
import styled from 'styled-components';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { ChevronDown, ChevronUp } from '../../Icons/Chevron';
import { GardenGroups } from '../../Models/data';
import { FieldSettings } from '../../Models/fieldSettings';
import { CustomItemView } from '../../Models/gardenOptions';
import { Count } from '../../Styles/common';
import { Pack } from '../../Styles/group';
import { GardenItem } from './types/gardenItem';
import { useExpand } from './useExpand';
import { isSubGroup } from './utils/getGardenItems';
const PackageRoot = styled.div`
    position: absolute;
    will-change: transform;
    top: 0;
    left: 0;
`;
type VirtualHookReturn = Pick<ReturnType<typeof useVirtual>, 'virtualItems' | 'scrollToIndex'>;
type PackageContainerProps<T> = {
    virtualColumn: VirtualItem;
    rowVirtualizer: VirtualHookReturn;
    garden: GardenGroups<T>;
    sortData?: (data: T[], ...groupByKeys: (keyof T)[]) => T[];
    gardenKey: keyof T;
    itemKey: keyof T;
    fieldSettings?: FieldSettings<T>;
    packageChild: React.MemoExoticComponent<(args: CustomItemView<T>) => JSX.Element>;
    handleExpand: any;
    items: GardenItem<T>[] | null;
};
export const GardenItemContainer = <T extends unknown>(props: PackageContainerProps<T>) => {
    const {
        rowVirtualizer,
        virtualColumn,
        garden,
        packageChild: PackageChild,
        itemKey,
        handleExpand,
        items,
    } = props;
    const expand = useExpand();
    const { onSelect } = useParkViewContext();

    return (
        <>
            {rowVirtualizer.virtualItems.map((virtualRow) => {
                const item = items?.[virtualRow.index];
                if (!item) return null;

                return (
                    <PackageRoot
                        key={virtualRow.index}
                        style={{
                            transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                            width: `${virtualColumn.size}px`,
                            height: `${virtualRow.size}px`,
                        }}
                    >
                        {isSubGroup(item) ? (
                            <Pack
                                style={{
                                    width: '98%',
                                    height: '85%',
                                }}
                                onClick={() => handleExpand(item)}
                            >
                                <div>
                                    {item.status?.statusElement}
                                    {item.value}
                                    {item.description && ' - ' + item.description}
                                    <Count>({item.count})</Count>
                                </div>
                                {item.isExpanded ? <ChevronUp /> : <ChevronDown />}
                            </Pack>
                        ) : PackageChild ? (
                            <PackageChild
                                data={item}
                                itemKey={itemKey.toString()}
                                onClick={() => onSelect(item)}
                                columnExpanded={
                                    expand?.expandedColumns?.[garden[virtualColumn.index].value]
                                        ?.isExpanded ?? false
                                }
                            />
                        ) : (
                            <div style={{ backgroundColor: 'lightblue' }}>
                                R{virtualRow.index}C{virtualColumn.index}
                            </div>
                        )}
                    </PackageRoot>
                );
            })}
        </>
    );
};
