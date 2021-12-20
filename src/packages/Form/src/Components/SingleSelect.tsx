import React, { useEffect, useState } from 'react';

import { SingleSelect as Select } from '@equinor/eds-core-react';
import { Field } from '../Types/field';
import styled from 'styled-components';

interface SingleSelectProps<T> {
    field: Field<T>;
    editMode: boolean;
    selectItems: string[] | (() => Promise<string[]>);
}

export function SingleSelect<T>({
    field,
    editMode,
    selectItems,
}: SingleSelectProps<T>): JSX.Element {
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

    if (typeof field.value === 'string' || typeof field.value === 'undefined') {
        return (
            <SingleSelectContainer>
                <Select
                    disabled={editMode ? !field?.editable : false}
                    items={selectOptions || ['']}
                    label={''}
                    placeholder={`Select ${field.title}`}
                    initialSelectedItem={field?.value}
                    handleSelectedItemChange={(select) => {
                        field.setValue(
                            !select.selectedItem
                                ? (undefined as unknown as T)
                                : (select.selectedItem as unknown as T)
                        );
                    }}
                />
            </SingleSelectContainer>
        );
    }
    return <p style={{ color: 'red' }}>{field} is not of type string or undefined</p>;
}

const SingleSelectContainer = styled.div`
    width: 100%;
`;
