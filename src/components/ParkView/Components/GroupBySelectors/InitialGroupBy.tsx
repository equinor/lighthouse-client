import { SingleSelect } from '@equinor/eds-core-react-old';
import { useCallback } from 'react';
import { useParkViewContext } from '../../Context/ParkViewProvider';
import { SelectOneWrapper } from './groupBy.styles';
import { getFieldSettingsKeyFromLabel, getFieldSettingsLabelFromKey } from './utils';
type InitialGroupByProps = {
    groupingOptions: string[];
};
export const InitialGroupBy = <T extends Record<PropertyKey, unknown>>({
    groupingOptions,
}: InitialGroupByProps): JSX.Element => {
    const { gardenKey, fieldSettings, setGroupKeys, setGardenKey } = useParkViewContext<T>();
    const handleGardenKeyChange = useCallback(
        (newValue: string | null | undefined) => {
            const keyFromLabel = newValue && getFieldSettingsKeyFromLabel(newValue, fieldSettings);
            keyFromLabel && setGardenKey(keyFromLabel);
            setGroupKeys([]);
        },
        [fieldSettings, setGardenKey, setGroupKeys]
    );
    return (
        <SelectOneWrapper>
            <SingleSelect
                key={gardenKey.toString()}
                items={groupingOptions}
                label={''}
                selectedOption={getFieldSettingsLabelFromKey(gardenKey.toString(), fieldSettings)}
                handleSelectedItemChange={(changes) => handleGardenKeyChange(changes.selectedItem)}
            />
        </SelectOneWrapper>
    );
};
