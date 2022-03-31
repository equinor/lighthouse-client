import { useVirtual, VirtualItem } from 'react-virtual';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { ChevronDown, ChevronUp } from '../../Icons/Chevron';
import { GardenGroups } from '../../Models/data';
import { FieldSettings } from '../../Models/fieldSettings';
import { CustomItemView } from '../../Models/gardenOptions';
import { Count } from '../../Styles/common';
import { SubGroup, PackageRoot, DefaultPackage } from './styles';
import { GardenItem } from './types/gardenItem';
import { useExpand } from './hooks';
import { isSubGroup } from './utils';

type VirtualHookReturn = Pick<ReturnType<typeof useVirtual>, 'virtualItems' | 'scrollToIndex'>;
type PackageContainerProps<T> = {
    virtualColumn: VirtualItem;
    rowVirtualizer: VirtualHookReturn;
    garden: GardenGroups<T>;
    sortData?: (data: T[], ...groupByKeys: (keyof T)[]) => T[];
    itemKey: keyof T;
    fieldSettings?: FieldSettings<T>;
    packageChild: React.MemoExoticComponent<(args: CustomItemView<T>) => JSX.Element> | undefined;
    handleExpand: any;
    items: GardenItem<T>[] | null;
    itemWidth?: number;
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
        itemWidth,
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
                            <SubGroup onClick={() => handleExpand(item)}>
                                <div>
                                    {item.status?.statusElement}
                                    {item.value}
                                    {item.description && ' - ' + item.description}
                                    <Count>({item.count})</Count>
                                </div>
                                {item.isExpanded ? <ChevronUp /> : <ChevronDown />}
                            </SubGroup>
                        ) : PackageChild ? (
                            <PackageChild
                                data={item}
                                itemKey={itemKey.toString()}
                                onClick={() => onSelect(item)}
                                columnExpanded={
                                    expand?.expandedColumns?.[garden[virtualColumn.index].value]
                                        ?.isExpanded ?? false
                                }
                                width={itemWidth}
                            />
                        ) : (
                            <DefaultPackage onClick={() => onSelect(item)}>
                                {item[itemKey]}
                            </DefaultPackage>
                        )}
                    </PackageRoot>
                );
            })}
        </>
    );
};
