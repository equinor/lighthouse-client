import { useVirtual, VirtualItem } from 'react-virtual';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { ChevronDown, ChevronUp } from '../../Icons/Chevron';
import { GardenGroups } from '../../Models/data';
import { FieldSettings } from '../../Models/fieldSettings';
import { CustomGroupView, CustomItemView } from '../../Models/gardenOptions';
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
    customSubGroup?: React.MemoExoticComponent<(args: CustomGroupView<T>) => JSX.Element>;
    handleExpand: any;
    items: GardenItem<T>[] | null;
    itemWidth?: number;
    groupByKeys: (keyof T)[];
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
        groupByKeys,
    } = props;
    const expand = useExpand();
    const { onSelect } = useParkViewContext();
    const CustomSubGroup = props?.customSubGroup;
    return (
        <>
            {rowVirtualizer.virtualItems.map((virtualRow) => {
                const item = items?.[virtualRow.index];
                if (!item) return null;
                const width = isSubGroup(item) ? 100 - (item?.depth || 0) * 3 : 100;

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
                            CustomSubGroup ? (
                                <CustomSubGroup
                                    columnExpanded={item.isExpanded}
                                    data={item}
                                    onClick={() => handleExpand(item)}
                                    groupByKeys={groupByKeys}
                                />
                            ) : (
                                <SubGroup
                                    onClick={() => handleExpand(item)}
                                    style={{ width: `${width}%` }}
                                >
                                    <div>
                                        {item.status?.statusElement}
                                        {item.value}
                                        {item.description && ' - ' + item.description}
                                        {item.depth}
                                        <Count>({item.count})</Count>
                                    </div>
                                    {item.isExpanded ? <ChevronUp /> : <ChevronDown />}
                                </SubGroup>
                            )
                        ) : PackageChild ? (
                            <PackageChild
                                data={item.item}
                                itemKey={itemKey.toString()}
                                onClick={() => onSelect(item)}
                                columnExpanded={
                                    expand?.expandedColumns?.[garden[virtualColumn.index].value]
                                        ?.isExpanded ?? false
                                }
                                depth={item?.itemDepth}
                                width={itemWidth}
                            />
                        ) : (
                            <DefaultPackage onClick={() => onSelect(item)}>
                                {item.item[itemKey]}
                            </DefaultPackage>
                        )}
                    </PackageRoot>
                );
            })}
        </>
    );
};
