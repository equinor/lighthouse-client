import { SingleSelect } from '@equinor/eds-core-react';
import { Fragment, useCallback, useMemo } from 'react';
import { SelectOneWrapper, SelectRowWrapper, Separator } from '../Styles/groupingSelector';
import { useParkViewContext } from '../Context/ParkViewProvider';
import { FieldSettings } from '../Models/fieldSettings';

const getFieldSettingsKeyFromLabel = <T extends unknown>(
    label: string,
    fieldSettings: FieldSettings<T, string>
) => Object.keys(fieldSettings).find((k) => fieldSettings[k]?.label === label) || label;

const getFieldSettingsLabelFromKey = <T extends unknown>(
    key: string,
    fieldSettings: FieldSettings<T, string>
) => fieldSettings?.[key]?.label || key;

export function FilterSelector<T>(): JSX.Element | null {
    const { groupByKeys, setGroupKeys, setGardenKey, data, gardenKey, fieldSettings, customViews } =
        useParkViewContext<T>();

    const CustomGroupByView = customViews?.customGroupByView;

    const allOptions = useMemo(
        () =>
            fieldSettings && Object.keys(fieldSettings).length
                ? Object.keys(fieldSettings)
                : Object.keys(data?.[0] || {}),
        [fieldSettings, data]
    );

    const filterGroupKey = useCallback(
        (groupKey: string) =>
            !(groupKey === gardenKey || groupByKeys.includes(groupKey as keyof T)),
        [gardenKey, groupByKeys]
    );

    const groupingOptions = useMemo(
        (): string[] =>
            data.length
                ? allOptions
                      .filter(filterGroupKey)
                      .map((groupKey) => fieldSettings?.[groupKey]?.label || groupKey)
                      .sort()
                : [],

        [data, fieldSettings, filterGroupKey, allOptions]
    );

    const handleExistingSelectionChange = useCallback(
        (newValue: string | null | undefined, index: number) => {
            const newGroupByKeys = [...groupByKeys] as string[];
            newValue == null
                ? newGroupByKeys.splice(index, 1)
                : (newGroupByKeys[index] =
                      getFieldSettingsKeyFromLabel(newValue, fieldSettings) || newValue);

            setGroupKeys(newGroupByKeys);
        },
        [fieldSettings, groupByKeys, setGroupKeys]
    );

    const addItemToGroupKeys = useCallback(
        (newValue: string | null | undefined) =>
            newValue &&
            setGroupKeys([
                ...(groupByKeys as string[]),
                getFieldSettingsKeyFromLabel(newValue, fieldSettings),
            ]),
        [fieldSettings, groupByKeys, setGroupKeys]
    );

    const handleGardenKeyChange = useCallback(
        (newValue: string | null | undefined) => {
            const keyFromLabel = newValue && getFieldSettingsKeyFromLabel(newValue, fieldSettings);
            keyFromLabel && setGardenKey(keyFromLabel);
            setGroupKeys([]);
        },
        [fieldSettings, setGardenKey, setGroupKeys]
    );
    if (!data) return null;

    return (
        <SelectRowWrapper>
            {CustomGroupByView && <CustomGroupByView />}

            <Separator> Group by </Separator>

            <SelectOneWrapper>
                <SingleSelect
                    key={gardenKey.toString()}
                    items={groupingOptions}
                    label={''}
                    selectedOption={getFieldSettingsLabelFromKey(
                        gardenKey.toString(),
                        fieldSettings
                    )}
                    handleSelectedItemChange={(changes) =>
                        handleGardenKeyChange(changes.selectedItem)
                    }
                />
            </SelectOneWrapper>
            <Separator>then</Separator>

            {groupByKeys.sort().map((groupByKey, index) => {
                return (
                    <Fragment key={index}>
                        <SelectOneWrapper>
                            <SingleSelect
                                key={groupByKey.toString()}
                                items={groupingOptions || []}
                                label={''}
                                selectedOption={getFieldSettingsLabelFromKey(
                                    groupByKey.toString(),
                                    fieldSettings
                                )}
                                handleSelectedItemChange={(changes) => {
                                    handleExistingSelectionChange(changes.selectedItem, index);
                                }}
                            />
                        </SelectOneWrapper>
                        <Separator>then</Separator>
                    </Fragment>
                );
            })}
            {groupingOptions && groupingOptions.length > 0 && (
                <SelectOneWrapper>
                    <SingleSelect
                        key={'EmptyGroupBySelector'}
                        items={groupingOptions}
                        label={''}
                        selectedOption=""
                        handleSelectedItemChange={(changes) => {
                            addItemToGroupKeys(changes.selectedItem);
                        }}
                    />
                </SelectOneWrapper>
            )}
        </SelectRowWrapper>
    );
}
