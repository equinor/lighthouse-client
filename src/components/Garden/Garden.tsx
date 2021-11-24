import React, { useEffect, useMemo, useState } from 'react';

import { FilterSelector } from './Components/FilterSelector';
import { Col, Count, Groupe, Title, Wrapper } from './Styles/gardenStyle';
import { createGarden, Garden } from './Services/createGarden';
import { Data, DataSet } from './Models/data';
import { Group } from './Components/Group';
import { Items } from './Components/Items';

interface GardenProps<T> {
    data: T[] | undefined;
    groupeKey: keyof T;
    groupByKeys: (keyof T)[] | undefined;
    itemKey: string;
    customItemView?: React.FC<{ data: T; itemKey: string; onClick: () => void }>;
    statusFunc?: (data: T) => string;
    customGroupView?: React.FC<{ data: DataSet<T>; onClick: () => void }>;
}

export function Garden<T>({
    data,
    groupeKey,
    groupByKeys,
    itemKey,
    customItemView,
    statusFunc,
    customGroupView,
}: GardenProps<T>): JSX.Element | null {
    const [garden, setGarden] = useState<Data<T>>();
    const [rootKey, setRootKey] = useState<string>(groupeKey.toString());
    if (!groupByKeys) {
        groupByKeys = [];
    }
    const [groupKeys, setGroupKeys] = useState<string[]>(groupByKeys.flatMap((x) => x.toString()));
    const groupingOptions = useMemo(() => {
        if (data) {
            //exclude rootkey, itemkey and all keys present in groupKeys
            const options: string[] = [];
            Object.keys(data[0]).map((x) => {
                if (x !== rootKey && x !== itemKey && !groupKeys.includes(x)) {
                    options.push(x);
                }
            });
            return options;
        }
        return null;
    }, [data, rootKey, groupKeys, itemKey]);

    useEffect(() => {
        data &&
            setGarden(
                createGarden(
                    data,
                    rootKey as unknown as keyof T,
                    groupKeys as unknown as (keyof T)[]
                )
            );
    }, [data, groupeKey, rootKey, groupKeys]);

    if (!data || !groupingOptions) {
        return null;
    }

    return (
        <>
            <FilterSelector
                groupingOptions={groupingOptions}
                setGroupKeys={setGroupKeys}
                groupKeys={groupKeys}
                rootKey={rootKey}
                setRootKey={setRootKey}
            />
            <Wrapper>
                {garden &&
                    Object.keys(garden).map((key, index) => (
                        <Col key={`col-${index}`}>
                            <Groupe>
                                <Title>{garden[key].value}</Title>
                                <Count>({garden[key].count})</Count>
                            </Groupe>
                            {garden[key].items[0] != null ? (
                                <Items
                                    key={key + index}
                                    customItemView={customItemView}
                                    statusFunc={statusFunc}
                                    data={garden[key].items}
                                    itemKey={itemKey}
                                />
                            ) : (
                                <>
                                    {Object.keys(garden[key].subGroups).map((groupKey, index) => (
                                        <Group
                                            key={groupKey + index}
                                            statusFunc={statusFunc}
                                            customGroupView={customGroupView}
                                            customItemView={customItemView}
                                            group={garden[key].subGroups[groupKey]}
                                            itemKey={itemKey}
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
