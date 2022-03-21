import { useVirtual, VirtualItem } from 'react-virtual';
import styled from 'styled-components';
import { Data } from '../../Models/data';
import { FieldSettings } from '../../Models/fieldSettings';
import { CustomItemView } from '../../Models/gardenOptions';
import { GroupByView } from './GroupByView';
import { ItemMeasurer } from './ItemMeasurer';
import { useExpand } from './useExpand';
const PackageRoot = styled.div`
    position: absolute;
    will-change: transform;
    top: 0;
    left: 0;
`;
type VirtualHookReturn = Pick<ReturnType<typeof useVirtual>, 'virtualItems' | 'scrollToIndex'>;
type PackageContainerProps<T> = {
    virtualRow: VirtualItem;
    columnVirtualizer: VirtualHookReturn;
    garden: Data<T>;
    columnKeys: string[];
    sortData?: (data: T[], ...groupByKeys: (keyof T)[]) => T[];
    gardenKey: keyof T;
    itemKey: keyof T;
    fieldSettings?: FieldSettings<T>;
    packageChild: React.MemoExoticComponent<(args: CustomItemView<T>) => JSX.Element>;
};
export const SubGroupView = <T extends unknown>(props: PackageContainerProps<T>) => {
    const {
        columnVirtualizer,
        virtualRow,
        columnKeys,
        garden,
        packageChild,
        itemKey,
        fieldSettings,
    } = props;
    const expand = useExpand();
    return (
        <>
            {columnVirtualizer.virtualItems.map((virtualColumn) => {
                const currentColumnKey = columnKeys[virtualColumn.index];
                const subGroupKeysForCurrentColumn = Object.keys(
                    garden[currentColumnKey].subGroups
                );

                if (!subGroupKeysForCurrentColumn) return null;
                const subGroupsForCurrentColumn = Object.values(garden[currentColumnKey].subGroups);
                const currentSubGroup = subGroupsForCurrentColumn[virtualRow.index];
                if (!subGroupsForCurrentColumn || !currentSubGroup) return null;
                const translateY = expand.expandedRows?.[
                    `${currentSubGroup.value}_${currentColumnKey}`
                ]?.isExpanded
                    ? virtualRow.start
                    : virtualRow.start;
                return (
                    <PackageRoot
                        key={virtualColumn.index}
                        style={{
                            transform: `translateX(${virtualColumn.start}px) translateY(${
                                virtualRow.index === 0 ? virtualRow.start : translateY
                            }px)`,
                            width: `${virtualColumn.size}px`,
                            maxHeight: `${virtualRow.size}px`,
                        }}
                        // ref={(el) => {
                        //     virtualColumn.measureRef(el);
                        //     virtualRow.measureRef(el);
                        // }}
                    >
                        <GroupByView
                            group={currentSubGroup}
                            packageChild={packageChild}
                            itemKey={itemKey}
                            fieldSettings={fieldSettings}
                            currentColumnKey={currentColumnKey}
                            virtualRowIndex={virtualRow.index}
                        />
                    </PackageRoot>
                );
            })}
        </>
    );
};
