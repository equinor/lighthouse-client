import React, { useEffect, useState } from 'react';
import { Value } from '../../Types/value';
import { SingleSelect as Select } from '@equinor/eds-core-react';

interface SingleSelectProps {
    setter: (value: string) => Promise<void>;
    field: Value<string>;
    editMode: boolean;
    selectItems: (() => Promise<string[]>) | string[];
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
    const [items, setItems] = useState<string[]>([]);

    useEffect(() => {
        const asyncSelectItems = async (): Promise<string[]> => {
            if (typeof selectItems === 'function') {
                const items = await selectItems();
                setItems(items);
            }
            return [];
        };

        if (typeof selectItems === 'function') {
            asyncSelectItems();
        } else {
            setItems(selectItems);
        }
    }, []);

    return (
        <div style={{ width: '100%' }}>
            {CustomComponent ? (
                <CustomComponent
                    setter={setter}
                    field={field}
                    editMode={editMode}
                    selectItems={items}
                />
            ) : (
                <Select
                    style={{ marginBottom: '0.2em', width: '100%' }}
                    disabled={editMode ? !field?.editable : false}
                    items={items}
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
        </div>
    );
};
