import { useCallback, useEffect, useMemo, useState } from 'react';

import { useParkViewContext } from '../../Context/ParkViewProvider';
import { SelectedRowCallback, useGardenApi } from '../../hooks/useGardenApi';
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
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const {
        data,
        groupByKeys,
        gardenKey,
        options,
        status,
        fieldSettings,
        customGroupByKeys,
        itemWidth,
        collapseSubGroupsByDefault,
        intercepters,
        onSelect,
    } = useParkViewContext<T>();

    useEffect(() => {
        console.log('Selected item', selectedItem);
    }, [selectedItem]);

    const handleOnItemClick = useCallback(
        (item: T) => {
            console.log('custom onselect triggered');
            setSelectedItem(onSelect(item));
            // setSelectedItem(item);
        },
        [onSelect]
    );

    const [garden, setGarden] = useState<DataSet<T>[]>([]);

    const setSelectedCallback = useCallback(
        (callback: SelectedRowCallback | string) =>
            setSelectedItem(typeof callback === 'function' ? callback(garden) : callback),
        [garden]
    );

    const { createGardenApi } = useGardenApi(selectedItem, setSelectedCallback);

    useEffect(() => {
        setGarden(
            createGarden({
                dataSet: data,
                groupingKeys: groupByKeys,
                isExpanded: !collapseSubGroupsByDefault,
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
    if (widths.length === 0 || amountOfColumns !== widths.length) {
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
                    handleOnItemClick={handleOnItemClick}
                    selectedItem={selectedItem}
                />
            </ExpandProvider>
        </Container>
    );
};
