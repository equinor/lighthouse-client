import { SingleSelect } from '@equinor/eds-core-react';
import { useCallback } from 'react';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { SelectOneWrapper } from './groupBy.styles';
import { getFieldSettingsKeyFromLabel, hasNextGroupByOptions } from './utils';

type NextGroupByProps = {
    groupingOptions: string[];
};
export const NextGroupBy = <T extends Record<PropertyKey, unknown>>({
    groupingOptions,
}: NextGroupByProps): JSX.Element => {
    const { groupByKeys, fieldSettings, setGroupKeys } = useParkViewContext<T>();
    const addItemToGroupKeys = useCallback(
        (newValue: string | null | undefined) =>
            newValue &&
            setGroupKeys([
                ...(groupByKeys as string[]),
                getFieldSettingsKeyFromLabel(newValue, fieldSettings),
            ]),
        [fieldSettings, groupByKeys, setGroupKeys]
    );

    return (
        <>
            {hasNextGroupByOptions({ fieldSettings, groupByKeys, groupingOptions }) && (
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
        </>
    );
};
