import { HeaderContainer } from './HeaderContainer';
import { Layout } from './Layout';
import { useVirtual } from 'react-virtual';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { Fragment, useCallback, useMemo, useRef } from 'react';
import { createGarden } from '../../Services/createGarden';
import { PackageContainer } from './PackageContainer';

export const VirtualGarden = <T extends unknown>() => {
    const {
        data,
        groupByKeys,
        gardenKey,
        options,
        status,
        fieldSettings,
        customView,
        customGroupByKeys,
    } = useParkViewContext<T>();

    const garden = useMemo(
        () =>
            data &&
            createGarden(
                data,
                gardenKey,
                groupByKeys,
                status,
                options?.groupDescriptionFunc,
                fieldSettings,
                customGroupByKeys
            ),
        [
            data,
            fieldSettings,
            gardenKey,
            groupByKeys,
            options?.groupDescriptionFunc,
            status,
            customGroupByKeys,
        ]
    );
    const parentRef = useRef<HTMLDivElement | null>(null);
    const rowCount = useMemo(
        () => Math.max(...Object.values(garden).map((c) => c.items.length)),
        [garden]
    );
    const columnCount = Object.keys(garden).length;
    const rowVirtualizer = useVirtual({
        size: rowCount,
        parentRef,
        estimateSize: useCallback(() => 30, []),
        paddingStart: 40,
        overscan: 2,
    });

    const columnVirtualizer = useVirtual({
        horizontal: true,
        size: columnCount,
        parentRef,
        estimateSize: useCallback(() => 200, []),
    });
    const { customHeaderView: headerChild } = customView;
    return (
        <Layout
            rowTotalSize={rowVirtualizer.totalSize}
            columnTotalSize={columnVirtualizer.totalSize}
            parentRef={parentRef}
            isScrolling={false}
        >
            <HeaderContainer
                columnVirtualizer={columnVirtualizer}
                garden={garden}
                headerChild={headerChild!}
                columnKey="test"
            />
            {rowVirtualizer.virtualItems.map((virtualRow) => {
                return (
                    <Fragment key={virtualRow.index}>
                        <PackageContainer<T>
                            columnVirtualizer={columnVirtualizer}
                            garden={garden}
                            virtualRow={virtualRow}
                        />
                    </Fragment>
                );
            })}
        </Layout>
    );
};
