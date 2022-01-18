import { useEffect, useState } from 'react';

import { createGarden } from '../Services/createGarden';
import { Wrapper, Col } from '../Styles/common';
import { Data } from '../Models/data';
import { TreeColumn } from './TreeColumn';
import { getExcludeKeys } from '../Utils/excludeKeys';
import { useParkViewContext } from '../Context/ParkViewProvider';
import { FilterSelector } from './GroupingSelector';
import { GroupHeader } from './GroupHeader';
import { useRefresh } from '../hooks/useRefresh';

export function GardenView<T>(): JSX.Element | null {
    const refresh = useRefresh();
    const {
        data,
        groupByKeys,
        gardenKey,
        excludeKeys,
        setExcludeKeys,
        options,
        status,
        fieldSettings,
        customView,
    } = useParkViewContext<T>();
    const [garden, setGarden] = useState<Data<T> | null>();

    if (!excludeKeys && data) {
        setExcludeKeys(getExcludeKeys(data, 60));
    }

    useEffect(() => {
        data &&
            setGarden(
                createGarden(
                    data,
                    gardenKey as unknown as keyof T,
                    groupByKeys as unknown as (keyof T)[],
                    status,
                    options?.groupDescriptionFunc,
                    fieldSettings
                )
            );
    }, [data, gardenKey, groupByKeys, status, options?.groupDescriptionFunc, fieldSettings]);

    if (!data || !garden) {
        return null;
    }

    const Header = customView?.customHeaderView || GroupHeader;

    const handleHeaderClick = (columnKey: string) => {
        refresh();
        garden[columnKey].isExpanded = !garden[columnKey].isExpanded;
    };

    const defaultSortFunction = (a: string, b: string) => a.localeCompare(b);
    const columnSortFunction = fieldSettings[gardenKey]?.getSort || defaultSortFunction;
    const columnKeys = Object.keys(garden).sort(columnSortFunction);

    return (
        <>
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

                            <TreeColumn group={garden[key]} />
                        </Col>
                    ))}
            </Wrapper>
        </>
    );
}
