import React from 'react';

import { SingleSelect as Select } from '@equinor/eds-core-react';
import { Field } from '../Types/field';
import styled from 'styled-components';

interface SingleSelectProps<T> {
    field: Field<T>;
    editMode: boolean;
    selectItems: string[];
}

export function SingleSelect<T>({
    field,
    editMode,
    selectItems,
}: SingleSelectProps<T>): JSX.Element {
    if (typeof field.value === 'string' || typeof field.value === 'undefined') {
        return (
            <SingleSelectContainer>
                <Select
                    disabled={editMode ? !field?.editable : false}
                    items={selectItems}
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
    console.warn(field, ' is not of type string or undefined');
    return <></>;
}

const SingleSelectContainer = styled.div`
    width: 100%;
`;
