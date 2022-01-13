import { SingleSelect } from '@equinor/eds-core-react';
import { useCallback, useMemo } from 'react';
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

    //exclude rootkey, itemkey and all keys present in groupKeys
    const filterGroupKey = useCallback(
        (groupKey: string) =>
            !(
                groupKey === gardenKey &&
                groupKey === itemKey &&
                groupByKeys.includes(groupKey as keyof T) &&
                excludeKeys?.includes(groupKey as keyof T)
            ),
        [excludeKeys, gardenKey, groupByKeys, itemKey]
    );

    const groupingOptions = useMemo((): string[] | null => {
        if (data.length > 0) {
            const fieldKeys = Object.keys(fieldSettings);

            const options: string[] = (fieldKeys.length ? fieldKeys : Object.keys(data[0]))
                .map((groupKey) => fieldSettings?.[groupKey]?.label || groupKey)
                .filter(filterGroupKey);

            return options;
        }
        return null;
    }, [data, fieldSettings, filterGroupKey]);

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

    const getKeyFromLabel = (label: string) =>
        Object.keys(fieldSettings).find((k) => fieldSettings[k]?.label === label) || label;

    const gardenKeyLabel = useMemo(
        () => fieldSettings[gardenKey.toString()]?.label || gardenKey.toString(),
        [gardenKey, fieldSettings]
    );

    if (!data) return null;

    return (
        <>
            <SelectRowWrapper>
                <Separator> Group by </Separator>
                {gardenKey && (
                    <>
                        <SingleSelect
                            items={groupingOptions || []}
                            label={''}
                            initialSelectedItem={gardenKeyLabel}
                            selectedOption={gardenKeyLabel}
                            handleSelectedItemChange={(changes) => {
                                const keyFromlabel =
                                    changes.selectedItem && getKeyFromLabel(changes.selectedItem);

                                keyFromlabel && setGardenKey(keyFromlabel);
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
