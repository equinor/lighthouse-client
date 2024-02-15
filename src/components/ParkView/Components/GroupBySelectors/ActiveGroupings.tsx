import { SingleSelect } from '@equinor/eds-core-react-old';
import { Fragment, useCallback } from 'react';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { SelectOneWrapper, Separator } from './groupBy.styles';
import { getFieldSettingsKeyFromLabel, getFieldSettingsLabelFromKey } from './utils';

type ActiveGroupingsProps = {
    groupingOptions: string[];
};
export const ActiveGroupings = <T extends Record<PropertyKey, unknown>>({
    groupingOptions,
}: ActiveGroupingsProps): JSX.Element => {
    const { groupByKeys, fieldSettings, setGroupKeys } = useParkViewContext<T>();

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
    return (
        <>
            {groupByKeys.map((groupByKey, index) => {
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

                        {!fieldSettings?.[groupByKey]?.lastStep && <Separator>then</Separator>}
                    </Fragment>
                );
            })}
        </>
    );
};
