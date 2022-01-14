import { SingleSelect } from '@equinor/eds-core-react';
import { useCallback, useMemo } from 'react';
import { SelectRowWrapper, Separator } from '../Styles/groupingSelector';
import { useParkViewContext } from '../Context/ParkViewProvider';
import { FieldSettings } from '../../../apps/swcr/models/FieldSettings';

const getFieldSettingsKeyFromLabel = <T extends unknown>(
    label: string,
    fieldSettings: FieldSettings<T, string>
) => Object.keys(fieldSettings).find((k) => fieldSettings[k]?.label === label) || label;

const getFieldSettingsLabelFromKey = <T extends unknown>(
    key: string,
    fieldSettings: FieldSettings<T, string>
) => fieldSettings[key]?.label || key;

export function FilterSelector<T>(): JSX.Element | null {
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

    const allOptions = useMemo(
        () =>
            Object.keys(fieldSettings).length
                ? Object.keys(fieldSettings)
                : Object.keys(data?.[0] || {}),
        [fieldSettings, data]
    );

    //exclude rootkey, itemkey and all keys present in groupKeys
    const filterGroupKey = useCallback(
        (groupKey: string) =>
            !(
                groupKey === gardenKey ||
                groupKey === itemKey ||
                groupByKeys.includes(groupKey as keyof T) ||
                excludeKeys?.includes(groupKey as keyof T)
            ),
        [excludeKeys, gardenKey, groupByKeys, itemKey]
    );

    const groupingOptions = useMemo(
        (): string[] | null =>
            data.length
                ? allOptions
                      .filter(filterGroupKey)
                      .map((groupKey) => fieldSettings?.[groupKey]?.label || groupKey)
                : null,

        [data, fieldSettings, filterGroupKey, allOptions]
    );

    const handleExistingSelectionChange = (newValue: string | null | undefined, index: number) => {
        const newGroupByKeys = [...groupByKeys] as string[];
        newValue == null
            ? newGroupByKeys.splice(index, 1)
            : (newGroupByKeys[index] =
                  getFieldSettingsKeyFromLabel(newValue, fieldSettings) || newValue);

        setGroupKeys(newGroupByKeys);
    };

    const addItemToGroupKeys = (newValue: string | null | undefined) =>
        newValue &&
        setGroupKeys([
            ...(groupByKeys as string[]),
            getFieldSettingsKeyFromLabel(newValue, fieldSettings),
        ]);

    if (!data) return null;

    return (
        <SelectRowWrapper>
            <Separator> Group by </Separator>
            {gardenKey && (
                <>
                    <SingleSelect
                        items={groupingOptions || []}
                        label={''}
                        selectedOption={getFieldSettingsLabelFromKey(
                            gardenKey.toString(),
                            fieldSettings
                        )}
                        handleSelectedItemChange={(changes) => {
                            const keyFromlabel =
                                changes.selectedItem &&
                                getFieldSettingsKeyFromLabel(changes.selectedItem, fieldSettings);

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
                            selectedOption={getFieldSettingsLabelFromKey(
                                x.toString(),
                                fieldSettings
                            )}
                            handleSelectedItemChange={(changes) => {
                                handleExistingSelectionChange(changes.selectedItem, index);
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
                        selectedOption=""
                        handleSelectedItemChange={(changes) => {
                            addItemToGroupKeys(changes.selectedItem);
                        }}
                    />
                </>
            )}
        </SelectRowWrapper>
    );
}
