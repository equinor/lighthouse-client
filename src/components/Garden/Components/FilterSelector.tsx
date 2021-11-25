import { SingleSelect } from '@equinor/eds-core-react';
import React, { useMemo } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useGardenContext } from '../Context/GardenProvider';

export function FilterSelector<T>(): JSX.Element {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const { groupByKeys, setGroupKeys, setGroupeKey, data, groupeKey, excludeKeys, itemKey } =
        useGardenContext<T>();

    const groupingOptions = useMemo(() => {
        if (data) {
            //exclude rootkey, itemkey and all keys present in groupKeys
            const options: string[] = [];
            Object.keys(data[0]).map((x) => {
                if (
                    x !== groupeKey &&
                    x !== itemKey &&
                    !groupByKeys.includes(x as keyof T) &&
                    !excludeKeys?.includes(x as keyof T)
                ) {
                    options.push(x);
                }
            });
            return options;
        }
        return null;
    }, [data, groupeKey, groupByKeys, itemKey, excludeKeys]);

    const handleSelectedItemsChanged = (newValue: string | null | undefined, index: number) => {
        if (newValue === null) {
            const newKeys: string[] = [];

            for (let i = 0; i < index; i++) {
                newKeys.push(groupByKeys[i] as string);
            }
            setGroupKeys([...newKeys]);
        } else {
            newValue && setGroupKeys([...(groupByKeys as string[]), newValue]);
        }
    };

    return (
        <SelectRowWrapper>
            <Separator> Group by</Separator>
            <SingleSelect
                items={groupingOptions || []}
                label={''}
                initialSelectedItem={groupeKey.toString()}
                handleSelectedItemChange={(changes) => {
                    if (changes.selectedItem === null) {
                        return;
                    }
                    changes.selectedItem && setGroupeKey(changes.selectedItem);
                    setGroupKeys([]);
                }}
            />
            {groupByKeys.map((x, index) => {
                return (
                    <SelectRowWrapper key={x.toString()}>
                        <Separator>then</Separator>
                        <SingleSelect
                            items={groupingOptions || []}
                            label={''}
                            initialSelectedItem={x.toString()}
                            handleSelectedItemChange={(changes) => {
                                handleSelectedItemsChanged(changes.selectedItem, index);
                            }}
                        />
                    </SelectRowWrapper>
                );
            })}
            {groupingOptions && groupingOptions.length > 0 && (
                <>
                    <Separator>then</Separator>
                    <SingleSelect
                        items={groupingOptions}
                        label={''}
                        selectedOption={selectedOption}
                        handleSelectedItemChange={(changes) => {
                            setSelectedOption('');
                            changes.selectedItem &&
                                setGroupKeys([...(groupByKeys as string[]), changes.selectedItem]);
                        }}
                    />
                </>
            )}
        </SelectRowWrapper>
    );
}

const SelectRowWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Separator = styled.p`
    margin-right: 0.5em;
    margin-left: 0.5em;
`;
