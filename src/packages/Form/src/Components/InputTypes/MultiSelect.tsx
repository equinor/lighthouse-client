import { Value } from '../../Types/value';
import { MultiSelect as Select } from '@equinor/eds-core-react';
import { MultiSelect as MultiSelectInterface } from '../../Types/inputType';
import { useEffect, useState } from 'react';

interface MultiSelectProps {
    setter: (value: string[]) => Promise<void>;
    field: Value<string[]>;
    editMode: boolean;
    selectItems: (() => Promise<string[]>) | string[];
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
    }, [selectItems]);

    return (
        <>
            {/* Global multiSelect custom component */}
            {CustomComponent ? (
                <CustomComponent
                    setter={setter}
                    field={field}
                    editMode={editMode}
                    selectItems={items}
                />
            ) : (
                <Select
                    style={{ marginBottom: '0.2em' }}
                    disabled={editMode ? !field?.editable : false}
                    items={items}
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
