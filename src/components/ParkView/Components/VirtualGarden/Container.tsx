import { useEffect, useMemo, useState } from 'react';

import { useParkViewContext } from '../../Context/ParkViewProvider';
import { useGardenApi } from '../../hooks/useGardenApi';
import { DataSet } from '../../Models/data';
import { GardenApi } from '../../Models/gardenApi';
import { PostGroupBySorting, PreGroupByFiltering } from '../../Models/gardenOptions';
import { createGarden } from '../../Services/createGarden';
import { FilterSelector } from '../GroupingSelector';
import { ExpandProvider } from './ExpandProvider';
import { Container } from './styles';
import { VirtualGarden } from './VirtualGarden';

interface VirtualContainerProps {
    onGardenReady?: (api: GardenApi) => void;
}

export const VirtualContainer = <T extends unknown>({
    onGardenReady,
}: VirtualContainerProps): JSX.Element | null => {
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

    const [garden, setGarden] = useState<DataSet<T>[]>([]);

    const { createGardenApi } = useGardenApi();

    useEffect(() => {
        setGarden(
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
            })
        );

        onGardenReady && onGardenReady(createGardenApi());
    }, [
        /** Should maybe be empty */
        data,
        gardenKey,
        groupByKeys,
        status,
        options?.groupDescriptionFunc,
        fieldSettings,
        customGroupByKeys,
    ]);

    const amountOfColumns = useMemo(() => garden.length, [garden]);

    useEffect(() => {
        if (garden && amountOfColumns > 0) {
            const width =
                (itemWidth && itemWidth(garden, gardenKey.toString(), customGroupByKeys)) || 300;
            setWidths(new Array(amountOfColumns).fill(width));
        }
    }, [amountOfColumns, gardenKey, itemWidth]);

    //TODO: Handle widths = 0 better
    if (widths.length === 0) {
        return null;
    }

    if (widths.length !== amountOfColumns) {
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
