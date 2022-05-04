import { createGarden } from '../Services/createGarden';
import { Wrapper, Col, Container } from '../Styles/common';
import { TreeColumn } from './TreeColumn';
import { useParkViewContext } from '../Context/ParkViewProvider';
import { FilterSelector } from './GroupingSelector';
import { GroupHeader } from './GroupHeader';
import { useRefresh } from '../hooks/useRefresh';
import { useEffect, useMemo, useState } from 'react';
import { defaultSortFunction } from '../Utils/utilities';
import { PostGroupBySorting, PreGroupByFiltering } from '../Models/gardenOptions';
import { DataSet } from '../Models/data';
import { useGardenApi } from './VirtualGarden/Container';
import { GardenApi } from '../Models/gardenApi';

interface VirtualContainerProps {
    onGardenReady?: (api: GardenApi) => void;
}

export function GardenView<T>({ onGardenReady }: VirtualContainerProps): JSX.Element | null {
    const refresh = useRefresh();
    const {
        data,
        groupByKeys,
        gardenKey,
        options,
        status,
        fieldSettings,
        customView,
        customGroupByKeys,
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

    const Header = customView?.customHeaderView || GroupHeader;
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
        [garden, fieldSettings, defaultSortFunction]
    );

    const handleHeaderClick = (column: DataSet<T>) => {
        refresh();
        column.isExpanded = !column.isExpanded;
    };

    if (!data || !garden) return null;
    return (
        <Container>
            <FilterSelector<T> />
            <Wrapper>
                {garden &&
                    sortedColumns.map((column, index) => (
                        <Col key={`col-${index}`}>
                            {/* Will be created with viewerFactory configured with gardenoptions */}
                            {gardenKey && (
                                <div
                                    style={{ width: '100%' }}
                                    onClick={() => handleHeaderClick(column)}
                                >
                                    <Header
                                        garden={sortedColumns}
                                        columnIndex={index}
                                        columnIsExpanded={column.isExpanded}
                                    />
                                </div>
                            )}

                            <TreeColumn group={column} fieldSettings={fieldSettings} />
                        </Col>
                    ))}
            </Wrapper>
        </Container>
    );
}
