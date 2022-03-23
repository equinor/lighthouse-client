import { useEffect, useMemo, useState } from 'react';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { PostGroupBySorting, PreGroupByFiltering } from '../../Models/gardenOptions';
import { createGarden } from '../../Services/createGarden';
import { FilterSelector } from '../GroupingSelector';
import { ExpandProvider } from './ExpandProvider';
import { VirtualGarden } from './VirtualGarden';
export const VirtualContainer = <T extends unknown>() => {
    const [widths, setWidths] = useState<number[]>([]);

    const {
        data,
        groupByKeys,
        gardenKey,
        options,
        status,
        fieldSettings,
        customGroupByKeys,
        itemWidth,
        intercepters,
    } = useParkViewContext<T>();
    const garden = useMemo(
        () =>
            createGarden({
                dataSet: data,
                groupingKeys: groupByKeys,
                isExpanded: true,
                gardenKey: gardenKey,
                status: status,
                groupDescriptionFunc: options?.groupDescriptionFunc,
                fieldSettings: fieldSettings,
                customGroupByKeys: customGroupByKeys,
                postGroupBySorting: intercepters?.postGroupSorting as PostGroupBySorting<T>,
                preGroupFiltering: intercepters?.preGroupFiltering as PreGroupByFiltering<T>,
            }),
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

    const amountOfColumns = useMemo(() => garden.length, [garden]);

    useEffect(() => {
        if (garden) {
            if (amountOfColumns > 0) {
                setWidths(new Array(amountOfColumns).fill(itemWidth || 300));
            }
        }
    }, [amountOfColumns]);

    //TODO: Handle widths = 0 better
    if (widths.length === 0) {
        return <h1>Length 0</h1>;
    }

    return (
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: '100%', gap: '1em' }}>
            <FilterSelector />
            <ExpandProvider initialWidths={widths}>
                <VirtualGarden garden={garden} />
            </ExpandProvider>
        </div>
    );
};
