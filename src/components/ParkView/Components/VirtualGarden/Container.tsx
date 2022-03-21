import { useEffect, useMemo, useReducer, useState } from 'react';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { createGarden } from '../../Services/createGarden';
import { FilterSelector } from '../GroupingSelector';
import { ExpandProvider } from './ExpandProvider';
import { VirtualGarden } from './VirtualGarden';
export const VirtualContainer = <T extends unknown>() => {
    const {
        data,
        groupByKeys,
        gardenKey,
        itemKey,
        options,
        status,
        fieldSettings,
        customView,
        customGroupByKeys,
        sortData,
    } = useParkViewContext<T>();
    const garden = useMemo(
        () =>
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
            gardenKey,
            groupByKeys,
            status,
            options?.groupDescriptionFunc,
            fieldSettings,
            customGroupByKeys,
        ]
    );

    const [dimension, setDimension] = useState<{ heights: number[]; widths: number[] }>({
        heights: [],
        widths: [],
    });
    const amountOfColumns = useMemo(() => Object.keys(garden).length, [garden]);
    const amountOfMaxRows = Math.max(
        ...Object.values(garden).map((c) =>
            c.subGroupCount > 0 ? c.subGroupCount + c.count : c.count
        )
    );
    console.log('amount of max rows', amountOfMaxRows);
    useEffect(() => {
        if (garden) {
            if (amountOfColumns > 0 && amountOfMaxRows > 0) {
                setDimension({
                    heights: new Array(amountOfMaxRows).fill(30),
                    widths: new Array(amountOfColumns).fill(200),
                });
            }
        }
    }, [amountOfColumns, amountOfMaxRows]);

    if (dimension.heights.length === 0 || dimension.widths.length === 0) {
        return <h1>Length 0</h1>;
    }

    return (
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: '100%', gap: '1em' }}>
            <FilterSelector />
            <ExpandProvider initialHeights={dimension.heights} initialWidths={dimension.widths}>
                <VirtualGarden garden={garden} />
            </ExpandProvider>
        </div>
    );
};
