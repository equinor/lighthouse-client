import { Value } from '../../Types/value';
import { MultiSelect as Select } from '@equinor/eds-core-react';
import { MultiSelect as MultiSelectInterface } from '../../Types/inputType';

interface MultiSelectProps {
    setter: (value: string[]) => Promise<void>;
    field: Value<string[]>;
    editMode: boolean;
    selectItems: string[];
    inputType: MultiSelectInterface;
    CustomComponent?: React.FC<{
        setter: (value: string[]) => Promise<void>;
        field: Value<string[]>;
        editMode: boolean;
        selectItems: string[];
    }>;
}

export const MultiSelect = ({
    setter,
    field,
    editMode,
    selectItems,
    CustomComponent,
}: MultiSelectProps): JSX.Element => {
    !selectItems ? (selectItems = ['No options provided']) : selectItems;

    return (
        <>
            {/* Global multiSelect custom component */}
            {CustomComponent ? (
                <CustomComponent
                    setter={setter}
                    field={field}
                    editMode={editMode}
                    selectItems={selectItems}
                />
            ) : (
                <Select
                    style={{ marginBottom: '0.2em' }}
                    disabled={editMode ? !field?.editable : false}
                    items={selectItems}
                    label={''}
                    placeholder={`Select ${field.label}`}
                    initialSelectedItems={field.value}
                    handleSelectedItemsChange={(select) => {
                        if (!select.selectedItems) {
                            setter([]);
                        }
                        select.selectedItems && setter(select.selectedItems);
                    }}
                />
            )}
        </>
    );
};
