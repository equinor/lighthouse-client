import { MutableRefObject } from 'react';
import { useVirtual, VirtualItem } from 'react-virtual';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { ChevronDown, ChevronUp } from '../../Icons/Chevron';
import { GardenGroups } from '../../Models/data';
import { FieldSettings } from '../../Models/fieldSettings';
import { CustomGroupView, CustomItemView } from '../../Models/gardenOptions';
import { Count } from '../../Styles/common';
import { DefaultGardenItem } from './DefaultGardenItem';
import { useExpand } from './hooks';
import { PackageRoot, SubGroup, SubGroupText } from './styles';
import { GardenItem } from './types/gardenItem';
import { isSubGroup } from './utils';

type VirtualHookReturn = Pick<ReturnType<typeof useVirtual>, 'virtualItems' | 'scrollToIndex'>;
type PackageContainerProps<T extends Record<PropertyKey, unknown>> = {
    virtualColumn: VirtualItem;
    rowVirtualizer: VirtualHookReturn;
    garden: GardenGroups<T>;
    sortData?: (data: T[], ...groupByKeys: (keyof T)[]) => T[];
    itemKey: keyof T;
    fieldSettings?: FieldSettings<T>;
    packageChild?: React.MemoExoticComponent<(args: CustomItemView<T>) => JSX.Element>;
    customSubGroup?: React.MemoExoticComponent<(args: CustomGroupView<T>) => JSX.Element>;
    handleExpand: any;
    items: GardenItem<T>[] | null;
    itemWidth?: number;
    groupByKeys: (keyof T)[];
    selectedItem: string | null;
    handleOnClick: (item: T) => void;
    parentRef: MutableRefObject<HTMLDivElement | null>;
};
export const GardenItemContainer = <T extends Record<PropertyKey, unknown>>(
    props: PackageContainerProps<T>
): JSX.Element => {
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
        selectedItem,
        handleOnClick,
        parentRef,
    } = props;
    const expand = useExpand();

    const { onSelect, onGroupeSelect, objectIdentifier, customDescription, customItemColor } =
        useParkViewContext();

    const CustomSubGroup = props?.customSubGroup;
    return (
        <>
            {rowVirtualizer.virtualItems.map((virtualRow) => {
                const item = items?.[virtualRow.index];
                if (!item) return null;

                const width = isSubGroup(item) ? 100 - item.depth * 3 : 100;

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
                                    onSelect={onSelect}
                                    onGroupeSelect={onGroupeSelect}
                                    groupByKeys={groupByKeys}
                                />
                            ) : (
                                <SubGroup
                                    onClick={() => handleExpand(item)}
                                    style={{ width: `${width}%` }}
                                >
                                    <SubGroupText>
                                        {item.status?.statusElement}
                                        {item.value}
                                        {item.description && ' - ' + item.description}
                                        <Count>({item.count})</Count>
                                    </SubGroupText>
                                    {item.isExpanded ? <ChevronUp /> : <ChevronDown />}
                                </SubGroup>
                            )
                        ) : PackageChild ? (
                            <PackageChild
                                data={item.item}
                                itemKey={itemKey.toString()}
                                onClick={() => {
                                    handleOnClick(item.item);
                                }}
                                columnExpanded={
                                    expand?.expandedColumns?.[garden[virtualColumn.index].value]
                                        ?.isExpanded ?? false
                                }
                                depth={item?.itemDepth}
                                width={itemWidth}
                                isSelected={item.item[objectIdentifier] === selectedItem}
                                rowStart={virtualRow.start}
                                columnStart={virtualColumn.start}
                                parentRef={parentRef}
                            />
                        ) : (
                            <DefaultGardenItem
                                depth={item.itemDepth}
                                isSelected={item.item[objectIdentifier] === selectedItem}
                                backgroundColor={customItemColor(item.item)}
                                onClick={() => handleOnClick(item.item)}
                                columnExpanded={
                                    expand?.expandedColumns?.[garden[virtualColumn.index].value]
                                        ?.isExpanded ?? false
                                }
                                item={item.item as Record<string, string>}
                                itemKey={itemKey as string}
                                customDescription={
                                    customDescription && customDescription(item.item)
                                }
                            />
                        )}
                    </PackageRoot>
                );
            })}
        </>
    );
};
