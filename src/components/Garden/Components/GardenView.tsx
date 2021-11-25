import React, { useEffect, useState } from 'react';

import { FilterSelector } from './FilterSelector';
import { createGarden } from '../Services/createGarden';
import { Wrapper, Col, Groupe, Title, Count } from '../Styles/common';
import { Data } from '../Models/data';
import { Group } from './Group';
import { Items } from './Items';
import { GardenContext } from '../Context/GardenContext';
import { getExcludeKeys } from '../Utils/excludeKeys';

export function GardenView<T>(): JSX.Element | null {
    const { groupKeys, data, groupeKey, excludeKeys, setExcludeKeys } =
        React.useContext(GardenContext);
    const [garden, setGarden] = useState<Data<T>>();

    if (!excludeKeys && data) {
        setExcludeKeys(getExcludeKeys(data, 60));
    }

    useEffect(() => {
        data &&
            setGarden(
                createGarden(
                    data,
                    groupeKey as unknown as keyof T,
                    groupKeys as unknown as (keyof T)[]
                )
            );
    }, [data, groupeKey, groupKeys]);

    if (!data) {
        return null;
    }

    return (
        <>
            <FilterSelector />
            <Wrapper>
                {garden &&
                    Object.keys(garden).map((key, index) => (
                        <Col key={`col-${index}`}>
                            <Groupe>
                                <Title>{garden[key].value}</Title>
                                <Count>({garden[key].count})</Count>
                            </Groupe>
                            {garden[key].items[0] != null ? (
                                <Items key={key + index} data={garden[key].items} />
                            ) : (
                                <>
                                    {Object.keys(garden[key].subGroups).map((groupKey, index) => (
                                        <Group
                                            key={groupKey + index}
                                            group={garden[key].subGroups[groupKey]}
                                        />
                                    ))}
                                </>
                            )}
                        </Col>
                    ))}
            </Wrapper>
        </>
    );
}
