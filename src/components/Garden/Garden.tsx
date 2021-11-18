import React, { useEffect, useMemo, useState } from 'react';

import { FilterSelector } from './Components/FilterSelector';
import { Col, Count, Groupe, Title, Wrapper } from './Styles/gardenStyle';
import { createGarden, Garden } from "./Services/createGarden";
import { Data } from './Models/data';
import { Group } from './Components/Group';
import { Items } from './Components/Items';

interface GardenProps<T> {
    data: T[] | undefined,
    groupeKey: keyof T,
    itemKey: string
}

export function Garden<T>({ data, groupeKey, itemKey }: GardenProps<T>) {
    const [garden, setGarden] = useState<Data<T>>()
    const [rootKey, setRootKey] = useState<string>(groupeKey.toString());
    const [groupKeys, setGroupKeys] = useState<string[]>([]);

    const groupingOptions = useMemo(() => {
        if (data) {
            //exclude rootkey, itemkey and all keys present in groupKeys
            let options: string[] = [];
            Object.keys(data[0]).map(x => {
                if (x !== rootKey && x !== itemKey && !groupKeys.includes(x)) {
                    options.push(x);
                }
            });
            return options;
        }
        return null;

    }, [data, rootKey, groupKeys])

    interface SingleSelectOptions {
        items: string[];
        label: string;
        meta?: string | undefined;
        disabled?: boolean | undefined;
        readOnly?: boolean | undefined;
        initialSelectedItem?: string | undefined;
        selectedOption?: string | undefined;
        handleSelectedItemChange?: () => void;
    }


    useEffect(() => {
        data && setGarden(createGarden(data, rootKey as unknown as keyof T, groupKeys as unknown as (keyof T)[]))
    }, [data, groupeKey, rootKey, groupKeys])

    if (!data || !groupingOptions) {
        return null;
    }

    return (
        <>
            <FilterSelector groupingOptions={groupingOptions} setGroupKeys={setGroupKeys} groupKeys={groupKeys} rootKey={rootKey} setRootKey={setRootKey} />
            <Wrapper>
                {garden && Object.keys(garden).map((key, index) => (
                    <Col key={`col-${index}`}>
                        <Groupe>
                            <Title>
                                {garden[key].value}
                            </Title>
                            <Count>
                                ({garden[key].count})
                            </Count>
                        </Groupe>
                        {
                            //Object.values()
                            //Object.keys(garden[key].subGroups).map((subGroupKey) => <Group group={garden[key].subGroups[subGroupKey]} itemKey={itemKey} />)
                            garden[key].items[0] != null ? <Items data={garden[key].items} itemKey={itemKey} /> : <>{Object.keys(garden[key].subGroups).map((groupKey) => <Group group={garden[key].subGroups[groupKey]} itemKey={itemKey} />)}</>
                        }

                    </Col>))}
            </Wrapper>
        </>
    );
}
