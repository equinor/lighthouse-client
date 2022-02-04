import { MultiSelect as Select } from '@equinor/eds-core-react';

import { Field } from '../Types/field';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

interface MultiSelectProps<T> {
    field: Field<T>;
    editMode: boolean;
    selectItems: string[] | (() => Promise<string[]>);
}

export function MultiSelect<T>({ field, editMode, selectItems }: MultiSelectProps<T>): JSX.Element {
    const [selectOptions, setSelectItems] = useState<string[]>();

    useEffect(() => {
        const loadSelectItems = async () => {
            if (typeof selectItems === 'function') {
                setSelectItems(await selectItems());
            } else {
                setSelectItems(selectItems);
            }
        };

        loadSelectItems();
    }, [selectItems]);

    if (typeof field.value === 'object' || typeof field.value === 'undefined') {
        return (
            <MultiSelectContainer>
                <Select
                    disabled={editMode ? !field?.editable : false}
                    items={selectOptions || ['']}
                    label={''}
                    placeholder={field.placeholderText}
                    value={field?.value as unknown as string[]}
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
    return <p style={{ color: 'red' }}>{field} is not of type string[] or undefined</p>;
}

const MultiSelectContainer = styled.div`
    width: 100%;
`;
