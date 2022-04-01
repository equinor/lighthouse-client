import { useEffect, useMemo, useState } from 'react';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { PostGroupBySorting, PreGroupByFiltering } from '../../Models/gardenOptions';
import { createGarden } from '../../Services/createGarden';
import { FilterSelector } from '../GroupingSelector';
import { ExpandProvider } from './ExpandProvider';
import { Container } from './styles';
import { VirtualGarden } from './VirtualGarden';

export const VirtualContainer = <T extends unknown>(): JSX.Element | null => {
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
        if (garden && amountOfColumns > 0) {
            const width = (itemWidth && itemWidth(garden, gardenKey.toString())) || 300;
            setWidths(new Array(amountOfColumns).fill(width));
        }
    }, [amountOfColumns, itemWidth]);

    //TODO: Handle widths = 0 better
    if (widths.length === 0) {
        return null;
    }

    return (
        <Container>
            <FilterSelector />
            <ExpandProvider initialWidths={widths}>
                <VirtualGarden
                    garden={garden}
                    width={itemWidth && itemWidth(garden, gardenKey.toString())}
                />
            </ExpandProvider>
        </Container>
    );
};
