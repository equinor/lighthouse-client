import { Fragment, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { useRefresh } from '../../hooks/useRefresh';
import { DataSet, GardenGroups } from '../../Models/data';
import { CustomVirtualView } from '../../Models/gardenOptions';
import { defaultSortFunction } from '../../Utils/utilities';
import { GardenItemContainer } from './GardenItemContainer';
import { HeaderContainer } from './HeaderContainer';
import { useExpand, useVirtualScrolling } from './hooks';
import { Layout } from './Layout';
import { getGardenItems, getRowCount } from './utils';

type VirtualGardenProps<T> = {
    garden: GardenGroups<T>;
    width?: number;
    selectedItem: string | null;
    handleOnItemClick: (item: T) => void;
};

export const VirtualGarden = <T extends unknown>({
    garden,
    width,
    handleOnItemClick,
    selectedItem,
}: VirtualGardenProps<T>): JSX.Element => {
    const parentRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const {
        gardenKey,
        fieldSettings,
        customView,
        itemKey,
        sortData,
        highlightColumn,
        rowHeight,
        customDescription,
        groupByKeys,
        customGroupByKeys,
    } = useParkViewContext<T>();
    const refresh = useRefresh();

    const { isScrolling, scrollOffsetFn } = useVirtualScrolling(parentRef);
    const { widths: contextWidths } = useExpand();

    const columnCount = useMemo(() => garden.length, [garden]);
    const rowCount = useMemo(() => getRowCount(garden), [garden]);

    const sortedColumns = useMemo(
        () =>
            garden.sort((a, b) =>
                (fieldSettings?.[gardenKey]?.getColumnSort ?? defaultSortFunction)(a.value, b.value)
            ),
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
    const headerChild =
        (customView?.customHeaderView as CustomVirtualView<T>['customHeaderView']) ?? undefined;
    const packageChild =
        (customView?.customItemView as CustomVirtualView<T>['customItemView']) ?? undefined;

    const handleExpand = useCallback(
        <T extends unknown>(subGroup: DataSet<T>): void => {
            subGroup.isExpanded = !subGroup.isExpanded;

            refresh();
        },
        [refresh]
    );
    const highlightedColumn = useMemo(
        () =>
            highlightColumn ? highlightColumn(gardenKey.toString(), customGroupByKeys) : undefined,
        [highlightColumn, gardenKey, customGroupByKeys]
    );
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
            containerRef={containerRef}
            isScrolling={isScrolling}
        >
            <HeaderContainer
                columnVirtualizer={columnVirtualizer}
                garden={sortedColumns}
                headerChild={headerChild}
                highlightColumn={highlightedColumn}
                customDescription={customDescription}
                groupByKey={gardenKey.toString()}
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
                            packageChild={packageChild}
                            handleExpand={handleExpand}
                            items={columnItems}
                            itemWidth={width}
                            customSubGroup={
                                customView?.customGroupView as CustomVirtualView<T>['customGroupView']
                            }
                            groupByKeys={[gardenKey, ...groupByKeys]}
                            selectedItem={selectedItem}
                            handleOnClick={handleOnItemClick}
                            parentRef={containerRef}
                        />
                    </Fragment>
                );
            })}
        </Layout>
    );
};
