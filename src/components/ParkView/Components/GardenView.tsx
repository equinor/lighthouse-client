import { createGarden } from '../Services/createGarden';
import { Wrapper, Col, Container } from '../Styles/common';
import { TreeColumn } from './TreeColumn';
import { useParkViewContext } from '../Context/ParkViewProvider';
import { FilterSelector } from './GroupingSelector';
import { GroupHeader } from './GroupHeader';
import { useRefresh } from '../hooks/useRefresh';
import { useMemo } from 'react';
import { defaultSortFunction } from '../Utils/utilities';
import { PostGroupBySorting, PreGroupByFiltering } from '../Models/gardenOptions';

export function GardenView<T>(): JSX.Element | null {
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

    const garden = useMemo(
        () =>
            data &&
            createGarden({
                dataSet: data,
                gardenKey: gardenKey,
                groupingKeys: groupByKeys,
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
            intercepters?.postGroupSorting,
            intercepters?.preGroupFiltering,
        ]
    );

    const Header = customView?.customHeaderView || GroupHeader;

    const handleHeaderClick = (columnKey: string) => {
        refresh();
        garden[columnKey].isExpanded = !garden[columnKey].isExpanded;
    };

    const columnKeys = useMemo(
        () =>
            Object.keys(garden).sort(
                fieldSettings?.[gardenKey]?.getColumnSort || defaultSortFunction
            ),
        [fieldSettings, garden, gardenKey]
    );

    if (!data || !garden) return null;
    return (
        <Container>
            <FilterSelector<T> />
            <Wrapper>
                {garden &&
                    columnKeys.map((key, index) => (
                        <Col key={`col-${index}`}>
                            {/* Will be created with viewerFactory configured with gardenoptions */}
                            {gardenKey && (
                                <div
                                    style={{ width: '100%' }}
                                    onClick={() => handleHeaderClick(key)}
                                >
                                    <Header garden={garden} columnKey={key} />
                                </div>
                            )}

                            <TreeColumn group={garden[key]} fieldSettings={fieldSettings} />
                        </Col>
                    ))}
            </Wrapper>
        </Container>
    );
}
