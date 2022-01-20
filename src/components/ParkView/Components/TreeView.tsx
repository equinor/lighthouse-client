import React, { useEffect, useState } from 'react';

import { createTree } from '../Services/createTree';
import { Wrapper, Col } from '../Styles/common';
import { Data } from '../Models/data';
import { TreeColumn } from './TreeColumn';
import { useParkViewContext } from '../Context/ParkViewProvider';
import { FilterSelector } from './GroupingSelector';

export function TreeView<T>(): JSX.Element | null {
    const { groupByKeys, options, status, data } = useParkViewContext<T>();
    const [tree, setTree] = useState<Data<T> | null>(null);

    useEffect(() => {
        data &&
            setTree(
                createTree(
                    data,
                    groupByKeys as unknown as (keyof T)[],
                    status,
                    options?.groupDescriptionFunc
                )
            );
    }, [data, options?.groupDescriptionFunc, groupByKeys, status]);

    return (
        <>
            <FilterSelector<T> />
            <Wrapper>
                {tree && (
                    <Col>
                        <TreeColumn group={tree[0]} />
                    </Col>
                )}
            </Wrapper>
        </>
    );
}
