import { SingleSelect } from '@equinor/eds-core-react';
import React, { useMemo } from 'react';
import { useState } from 'react';
import { SelectRowWrapper, Separator } from '../Styles/groupingSelector';
import { useParkViewContext } from '../Context/ParkViewProvider';

export function FilterSelector<T>(): JSX.Element | null {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const {
        groupByKeys,
        setGroupKeys,
        setGardenKey,
        data,
        gardenKey,
        excludeKeys,
        itemKey,
        fieldSettings,
    } = useParkViewContext<T>();

    /*     const groupingOptions = useMemo(() => {
        if (data.length > 0) {
            //exclude rootkey, itemkey and all keys present in groupKeys
            const options: string[] = [];
            Object.keys(data[0]).map((x) => {
                if (
                    x !== gardenKey &&
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
    }, [data, gardenKey, groupByKeys, itemKey, excludeKeys]);
 */
    const groupingOptions = useMemo(() => {
        if (data.length > 0) {
            //exclude rootkey, itemkey and all keys present in groupKeys
            const options: string[] = [];

            const groupByObject = fieldSettings || data[0];

            Object.keys(groupByObject).map((x) => {
                if (
                    x !== gardenKey &&
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
    }, [data, gardenKey, groupByKeys, itemKey, fieldSettings, excludeKeys]);

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

    if (!data) {
        return null;
    }

    return (
        <>
            <SelectRowWrapper>
                <Separator> Group by </Separator>
                {gardenKey && (
                    <>
                        <SingleSelect
                            items={groupingOptions || []}
                            label={''}
                            initialSelectedItem={gardenKey ? gardenKey.toString() : undefined}
                            handleSelectedItemChange={(changes) => {
                                changes.selectedItem && setGardenKey(changes.selectedItem);
                                setGroupKeys([]);
                            }}
                        />
                        <Separator>then</Separator>
                    </>
                )}

                {groupByKeys.map((x, index) => {
                    return (
                        <SelectRowWrapper key={x.toString()}>
                            <SingleSelect
                                items={groupingOptions || []}
                                label={''}
                                initialSelectedItem={x.toString()}
                                handleSelectedItemChange={(changes) => {
                                    handleSelectedItemsChanged(changes.selectedItem, index);
                                }}
                            />
                            <Separator>then</Separator>
                        </SelectRowWrapper>
                    );
                })}
                {groupingOptions && groupingOptions.length > 0 && (
                    <>
                        <SingleSelect
                            items={groupingOptions}
                            label={''}
                            selectedOption={selectedOption}
                            handleSelectedItemChange={(changes) => {
                                setSelectedOption('');
                                changes.selectedItem &&
                                    setGroupKeys([
                                        ...(groupByKeys as string[]),
                                        changes.selectedItem,
                                    ]);
                            }}
                        />
                    </>
                )}
            </SelectRowWrapper>
        </>
    );
}
