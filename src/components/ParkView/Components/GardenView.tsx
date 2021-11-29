import React, { useEffect, useState } from 'react';

import { createGarden } from '../Services/createGarden';
import { Wrapper, Col, Groupe, Title, Count } from '../Styles/common';
import { Data } from '../Models/data';
import { TreeColumn } from './TreeColumn';
import { getExcludeKeys } from '../Utils/excludeKeys';
import { useParkViewContext } from '../Context/ParkViewProvider';
import { FilterSelector } from './GroupingSelector';

export function GardenView<T>(): JSX.Element | null {
    const { data, groupByKeys, gardenKey, excludeKeys, setExcludeKeys, options, status } =
        useParkViewContext<T>();
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
                    options?.groupDescriptionFunc
                )
            );
    }, [data, gardenKey, groupByKeys, status, options?.groupDescriptionFunc]);

    if (!data || !garden) {
        return null;
    }

    return (
        <>
            <FilterSelector<T> />
            <Wrapper>
                {garden &&
                    Object.keys(garden).map((key, index) => (
                        <Col key={`col-${index}`}>
                            {/* Will be created with viewerFactory configured with gardenoptions */}
                            {gardenKey && (
                                <Groupe>
                                    {garden[key].status?.statusElement}
                                    <Title>{garden[key].value}</Title>
                                    <Count>({garden[key].count})</Count>
                                </Groupe>
                            )}

                            <TreeColumn group={garden[key]} />
                        </Col>
                    ))}
            </Wrapper>
        </>
    );
}
