import { MultiSelect as Select } from '@equinor/eds-core-react';

import { Value } from '../../Types/value';
import { MultiSelectObject as MultiSelectObjectInterface } from '../../Types/inputType';
import { useMemo, useState } from 'react';

interface MultiSelectObjectProps {
    setter: (value: any[]) => Promise<void>;
    field: Value<any[]>;
    editMode: boolean;
    selectItems: any[];
    inputType: MultiSelectObjectInterface;
    CustomComponent?: React.FC<{
        setter: (value: any[]) => Promise<void>;
        field: Value<any[]>;
        editMode: boolean;
        selectItems: any[];
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
    const [selectedOptions, setSelectedOptions] = useState<string[] | undefined>();

    const selectOptions: string[] = useMemo(() => {
        return selectItems.map((x) => x[inputType.objectIdentifier].toString());
    }, [inputType.objectIdentifier, selectItems]);

    const findObjectsByIds = (ids: string[]): any[] => {
        const tempArray: any[] = [];

        selectItems.forEach((x) => {
            ids.forEach((y) => {
                if (x.id.toString() === y) {
                    tempArray.push(x);
                }
            });
        });

        return tempArray;
    };

    return (
        <>
            {CustomComponent ? (
                <CustomComponent
                    setter={setter}
                    field={field}
                    editMode={editMode}
                    selectItems={selectOptions}
                />
            ) : (
                <Select
                    style={{ marginBottom: '0.2em' }}
                    disabled={editMode ? !field?.editable : false}
                    items={selectOptions}
                    label={''}
                    initialSelectedItems={selectedOptions}
                    placeholder={`Select ${field.label}`}
                    handleSelectedItemsChange={(select) => {
                        if (!select.selectedItems) {
                            setSelectedOptions(undefined);
                            setter([]);
                        } else {
                            setSelectedOptions(select.selectedItems);
                            const objects = findObjectsByIds(select.selectedItems);
                            setter(objects);
                        }
                    }}
                />
            )}
        </>
    );
};
