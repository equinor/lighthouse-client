import { HeaderContainer } from './HeaderContainer';
import { Layout } from './Layout';
import { useVirtual } from 'react-virtual';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { Fragment, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { PackageContainer } from './PackageContainer';
import { CustomVirtualView } from '../../Models/gardenOptions';
import { defaultSortFunction } from '../../Utils/utilities';
import { useVirtualScrolling } from './useVirtualScrolling';
import { Data } from '../../Models/data';
import { SubGroupView } from './SubGroupView';
import { useExpand } from './useExpand';
type VirtualGardenProps<T> = {
    garden: Data<T>;
};
export const VirtualGarden = <T extends unknown>({ garden }: VirtualGardenProps<T>) => {
    const { gardenKey, fieldSettings, customView, itemKey, sortData } = useParkViewContext<T>();

    const parentRef = useRef<HTMLDivElement | null>(null);
    const { isScrolling, scrollOffsetFn } = useVirtualScrolling(parentRef);
    const { widths: contextWidths, heights: contextHeights } = useExpand();
    /**
     * Row count will not be correct if multiple group by's
     * and there are items inside "subGroups" in garden object
     * Because the subgroup "header" will also be added, so
     * we could check if subgroups exists,
     */
    const rowCount = useMemo(
        () =>
            Math.max(
                ...Object.values(garden).map((c) =>
                    c.subGroupCount > 0 ? Object.keys(c.subGroups).length : c.count
                )
            ),
        [garden]
    );
    const columnCount = Object.keys(garden).length;

    const columnKeys = useMemo(
        () =>
            Object.keys(garden).sort(
                fieldSettings?.[gardenKey]?.getColumnSort || defaultSortFunction
            ),
        [garden, fieldSettings, gardenKey]
    );

    const rowVirtualizer = useVirtual({
        size: rowCount,
        parentRef,
        estimateSize: useCallback((index) => contextHeights[index], [contextHeights]),
        keyExtractor: useCallback((index) => index, [contextHeights]),
        paddingStart: 40,
        overscan: 2,
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

    useLayoutEffect(() => {
        const scrollIndex = columnKeys.findIndex((col) => col === '2022-2');
        scrollIndex !== -1 && columnVirtualizer.scrollToIndex(scrollIndex, { align: 'center' });
    }, [columnKeys, columnVirtualizer.scrollToIndex]);

    const amountOfGroupBy = useMemo(
        () =>
            Object.values(garden)
                .map((c) => c.subGroupCount)
                .reduce((a, b) => a + b, 0),
        [garden]
    );
    return (
        <Layout
            rowTotalSize={rowVirtualizer.totalSize}
            columnTotalSize={columnVirtualizer.totalSize}
            parentRef={parentRef}
            isScrolling={isScrolling}
        >
            <HeaderContainer<T>
                columnVirtualizer={columnVirtualizer}
                garden={garden}
                headerChild={headerChild!}
                columnKeys={columnKeys}
                highlightColumn="2022-2"
            />
            {rowVirtualizer.virtualItems.map((virtualRow) => {
                return (
                    <Fragment key={virtualRow.index}>
                        {amountOfGroupBy === 0 ? (
                            <PackageContainer<T>
                                columnVirtualizer={columnVirtualizer}
                                garden={garden}
                                virtualRow={virtualRow}
                                packageProps={{
                                    component: packageChild!,
                                }}
                                columnKeys={columnKeys}
                                sortData={sortData}
                                gardenKey={gardenKey}
                                itemKey={itemKey}
                            />
                        ) : (
                            <SubGroupView
                                columnVirtualizer={columnVirtualizer}
                                garden={garden}
                                virtualRow={virtualRow}
                                columnKeys={columnKeys}
                                sortData={sortData}
                                gardenKey={gardenKey}
                                itemKey={itemKey}
                                packageChild={packageChild!}
                            />
                        )}
                    </Fragment>
                );
            })}
        </Layout>
    );
};
