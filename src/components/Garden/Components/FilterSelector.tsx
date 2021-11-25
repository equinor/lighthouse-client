import { SingleSelect } from '@equinor/eds-core-react';
import React, { useMemo } from 'react';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { GardenContext } from '../Context/GardenContext';

export const FilterSelector: FC = (): JSX.Element => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const { groupKeys, setGroupKeys, setGroupeKey, data, groupeKey, excludeKeys, itemKey } =
        React.useContext(GardenContext);

    const groupingOptions = useMemo(() => {
        if (data) {
            //exclude rootkey, itemkey and all keys present in groupKeys
            const options: string[] = [];
            Object.keys(data[0]).map((x) => {
                if (
                    x !== groupeKey &&
                    x !== itemKey &&
                    !groupKeys.includes(x) &&
                    !excludeKeys?.includes(x)
                ) {
                    options.push(x);
                }
            });
            return options;
        }
        return null;
    }, [data, groupeKey, groupKeys, itemKey, excludeKeys]);

    const handleSelectedItemsChanged = (newValue: string | null | undefined, index: number) => {
        if (newValue === null) {
            const newKeys: string[] = [];

            for (let i = 0; i < index; i++) {
                newKeys.push(groupKeys[i]);
            }
            setGroupKeys([...newKeys]);
        } else {
            newValue && setGroupKeys([...groupKeys, newValue]);
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
            {groupKeys.map((x, index) => {
                return (
                    <>
                        <Separator>then</Separator>
                        <SingleSelect
                            items={groupingOptions || []}
                            label={''}
                            initialSelectedItem={x}
                            handleSelectedItemChange={(changes) => {
                                handleSelectedItemsChanged(changes.selectedItem, index);
                            }}
                        />
                    </>
                );
            })}
            {groupingOptions && groupingOptions.length > 0 && (
                <>
                    <Separator>then </Separator>
                    <SingleSelect
                        items={groupingOptions}
                        label={''}
                        selectedOption={selectedOption}
                        handleSelectedItemChange={(changes) => {
                            changes.selectedItem &&
                                setGroupKeys([...groupKeys, changes.selectedItem]);
                            setSelectedOption('');
                        }}
                    />
                </>
            )}
        </SelectRowWrapper>
    );
};

const SelectRowWrapper = styled.div`
    display: flex;
    align-items: left;
`;

const Separator = styled.p`
    margin-right: 0.5em;
    margin-left: 0.5em;
`;
