import React from 'react';
import { Value } from '../../Types/value';
import { SingleSelect as Select } from '@equinor/eds-core-react';

interface SingleSelectProps {
    setter: (value: string) => Promise<void>;
    field: Value<string>;
    editMode: boolean;
    selectItems?: string[];
    CustomComponent?: React.FC<{
        setter: (value: string) => Promise<void>;
        field: Value<string>;
        editMode: boolean;
        selectItems: string[];
    }>;
}

export const SingleSelect = ({
    setter,
    field,
    editMode,
    selectItems,
    CustomComponent,
}: SingleSelectProps): JSX.Element => {
    !selectItems ? (selectItems = ['No options provided']) : selectItems;
    return (
        <>
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
                    initialSelectedItem={field?.value}
                    handleSelectedItemChange={(select) => {
                        if (!select.selectedItem) {
                            setter('');
                        }
                        select.selectedItem && setter(select.selectedItem);
                    }}
                />
            )}
        </>
    );
};
