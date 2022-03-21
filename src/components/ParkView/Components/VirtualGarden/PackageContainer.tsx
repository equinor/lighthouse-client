import styled from 'styled-components';
import { useVirtual, VirtualItem } from 'react-virtual/types';
import { Data } from '../../Models/data';
import { MemoExoticComponent, useMemo } from 'react';
import { CustomItemViewProps } from '../../Context/ParkViewContext';
import { CustomItemView } from '../../Models/gardenOptions';
import { FieldSettings } from '../../Models/fieldSettings';
import { defaultSortFunction } from '../../Utils/utilities';
import { Group } from '../Group';
import { useExpand } from './useExpand';
const PackageRoot = styled.div`
    position: absolute;
    will-change: transform;
    top: 0;
    left: 0;
`;
const Groups = styled.div`
    width: 100%;
    box-sizing: border-box;

    > div {
        width: 100%;
        margin: 0px;
    }
`;
type PackageProps<T> = {
    component: MemoExoticComponent<(args: CustomItemView<T>) => JSX.Element>;
};
type VirtualHookReturn = Pick<ReturnType<typeof useVirtual>, 'virtualItems' | 'scrollToIndex'>;
type PackageContainerProps<T> = {
    virtualRow: VirtualItem;
    columnVirtualizer: VirtualHookReturn;
    garden: Data<T>;
    packageProps: PackageProps<T>;
    columnKeys: string[];
    sortData?: (data: T[], ...groupByKeys: (keyof T)[]) => T[];
    gardenKey: keyof T;
    itemKey: keyof T;
    fieldSettings?: FieldSettings<T>;
};
export const PackageContainer = <T extends unknown>(props: PackageContainerProps<T>) => {
    const {
        columnVirtualizer,
        garden,
        virtualRow,
        packageProps,
        columnKeys,
        sortData,
        gardenKey,
        itemKey,
        fieldSettings,
    } = props;
    const { component: Package } = packageProps;
    const expand = useExpand();
    return (
        <>
            {columnVirtualizer.virtualItems.map((virtualColumn) => {
                //TODO
                const group = garden[columnKeys[virtualColumn.index]];

                // const sortedData: T[] = sortData ? sortData(group.items, gardenKey) : group.items;
                const item = group.items[virtualRow.index];

                if (!item) return null;
                return (
                    <PackageRoot
                        key={virtualColumn.index}
                        style={{
                            transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                            width: `${virtualColumn.size}px`,
                            height: `${virtualRow.size}px`,
                        }}
                        // ref={(el) => {
                        //     virtualRow.measureRef(el);
                        //     virtualColumn.measureRef(el);
                        // }}
                    >
                        <Package
                            data={item}
                            columnExpanded={
                                expand?.expandedColumns?.[columnKeys[virtualColumn.index]]
                                    ?.isExpanded ?? false
                            }
                            itemKey={itemKey.toString()}
                            onClick={() => {}}
                        />
                    </PackageRoot>
                );
            })}
        </>
    );
};
