import { HeaderContainer } from './HeaderContainer';
import { Layout } from './Layout';
import { useVirtual } from 'react-virtual';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { Fragment, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { CustomVirtualView } from '../../Models/gardenOptions';
import { defaultSortFunction } from '../../Utils/utilities';
import { useVirtualScrolling } from './useVirtualScrolling';
import { GardenGroups, DataSet } from '../../Models/data';
import { GardenItemContainer } from './GardenItemContainer';
import { useExpand } from './useExpand';
import { getRowCount } from './utils/getRowCount';
import { useRefresh } from '../../hooks/useRefresh';
import { getGardenItems } from './utils/getGardenItems';

type VirtualGardenProps<T> = {
    garden: GardenGroups<T>;
};

export const VirtualGarden = <T extends unknown>({
    garden,
}: VirtualGardenProps<T>): JSX.Element => {
    const parentRef = useRef<HTMLDivElement | null>(null);

    const { gardenKey, fieldSettings, customView, itemKey, sortData, highlightColumn, rowHeight } =
        useParkViewContext<T>();
    const { isScrolling, scrollOffsetFn } = useVirtualScrolling(parentRef);
    const { widths: contextWidths } = useExpand();
    const refresh = useRefresh();

    const columnCount = useMemo(() => garden.length, [garden]);
    const rowCount = useMemo(() => getRowCount(garden), [garden]);

    const sortedColumns = useMemo(
        () =>
            garden.sort((a, b) => {
                const columnSort = fieldSettings?.[gardenKey]?.getColumnSort;
                if (columnSort) {
                    return columnSort(a.value, b.value);
                } else {
                    return defaultSortFunction(a.value, b.value);
                }
            }),
        [garden, fieldSettings, gardenKey]
    );

    const rowVirtualizer = useVirtual({
        size: rowCount,
        parentRef,
        estimateSize: useCallback(() => rowHeight || 40, [rowHeight]),
        paddingStart: 40,
        // overscan: 2,
    });
    const columnVirtualizer = useVirtual({
        horizontal: true,
        size: columnCount,
        parentRef,
        estimateSize: useCallback(
            (index) => contextWidths[index],

            [contextWidths]
        ),
        keyExtractor: useCallback((index) => index, [contextWidths]),
        scrollOffsetFn,
        useObserver: useCallback(() => ({ height: 0, width: window.innerWidth }), []),
        overscan: 3,
    });

    const { customHeaderView: headerChild, customItemView: packageChild } =
        customView as CustomVirtualView<T>;

    const handleExpand = useCallback(
        <T extends unknown>(subGroup: DataSet<T>): void => {
            subGroup.isExpanded = !subGroup.isExpanded;

            refresh();
        },
        [refresh]
    );
    const highlightedColumn = highlightColumn ? highlightColumn(gardenKey.toString()) : undefined;

    useLayoutEffect(() => {
        if (highlightedColumn) {
            const scrollIndex = sortedColumns.findIndex(
                (column) => column.value === highlightedColumn
            );
            scrollIndex !== -1 && columnVirtualizer.scrollToIndex(scrollIndex, { align: 'center' });
        }
    }, [sortedColumns, columnVirtualizer.scrollToIndex, highlightedColumn]);

    return (
        <Layout
            rowTotalSize={rowVirtualizer.totalSize}
            columnTotalSize={columnVirtualizer.totalSize}
            parentRef={parentRef}
            isScrolling={isScrolling}
        >
            <HeaderContainer<T>
                columnVirtualizer={columnVirtualizer}
                garden={sortedColumns}
                headerChild={headerChild!}
                highlightColumn={highlightedColumn}
            />
            {columnVirtualizer.virtualItems.map((virtualColumn) => {
                const currentColumn = sortedColumns[virtualColumn.index];
                const columnItems = getGardenItems<T>(currentColumn, true);

                return (
                    <Fragment key={virtualColumn.index}>
                        <GardenItemContainer
                            rowVirtualizer={rowVirtualizer}
                            garden={sortedColumns}
                            virtualColumn={virtualColumn}
                            sortData={sortData}
                            itemKey={itemKey}
                            packageChild={packageChild!}
                            handleExpand={handleExpand}
                            items={columnItems}
                        />
                    </Fragment>
                );
            })}
        </Layout>
    );
};
