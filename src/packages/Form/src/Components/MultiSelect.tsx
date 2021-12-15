import { MultiSelect as Select } from '@equinor/eds-core-react';

import { Field } from '../Types/field';
import styled from 'styled-components';

interface MultiSelectProps<T> {
    field: Field<T>;
    editMode: boolean;
    selectItems: string[];
}

export function MultiSelect<T>({ field, editMode, selectItems }: MultiSelectProps<T>): JSX.Element {
    if (typeof field.value === 'object' || typeof field.value === 'undefined') {
        return (
            <MultiSelectContainer>
                <Select
                    disabled={editMode ? !field?.editable : false}
                    items={selectItems}
                    label={''}
                    placeholder={`Select ${field.title}`}
                    initialSelectedItems={field?.value as unknown as string[]}
                    handleSelectedItemsChange={(select) => {
                        field.setValue(
                            !select.selectedItems || select.selectedItems.length < 1
                                ? (undefined as unknown as T)
                                : (select.selectedItems as unknown as T)
                        );
                    }}
                />
            </MultiSelectContainer>
        );
    }
    console.warn(field, ' is not of type string[] or undefined');
    return <></>;
}

const MultiSelectContainer = styled.div`
    width: 100%;
`;
