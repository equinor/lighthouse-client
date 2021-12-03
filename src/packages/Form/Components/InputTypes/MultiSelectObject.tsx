import { Value } from '../../Types/value';
import { MultiSelect as Select } from '@equinor/eds-core-react';
import { MultiSelectObject as MultiSelectObjectInterface } from '../../Types/inputType';

interface MultiSelectObjectProps {
    setter: (value: any[]) => Promise<void>;
    field: Value<any[]>;
    editMode: boolean;
    viewKey?: string;
    selectItems?: string[];
    inputType: MultiSelectObjectInterface;
    CustomComponent?: React.FC<{
        setter: (value: any[]) => Promise<void>;
        field: Value<any[]>;
        editMode: boolean;
        selectItems: string[];
    }>;
}

export const MultiSelectObject = ({
    setter,
    field,
    editMode,
    selectItems,
    CustomComponent,
    inputType,
}: MultiSelectObjectProps): JSX.Element => {
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
                    initialSelectedItems={inputType.toStringArrayFunction(field.value)}
                    handleSelectedItemsChange={(select) => {
                        if (!select.selectedItems) {
                            setter([]);
                        } else {
                            const selected = inputType.toObjectArrayFunction(select.selectedItems);
                            setter(selected);
                        }
                    }}
                />
            )}
        </>
    );
};
