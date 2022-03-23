import React from 'react';
import { Input } from '@equinor/eds-core-react';
import { Field } from '../Types/field';
import styled from 'styled-components';

interface NumberInputProps<T> {
    field: Field<T>;
    editMode: boolean;
}

export function NumberInput<T>({ field, editMode }: NumberInputProps<T>): JSX.Element {
    if (typeof field.value === 'number' || typeof field.value === 'undefined') {
        return (
            <>
                <StyledInput
                    disabled={editMode ? !field?.editable : false}
                    placeholder={field.placeholderText}
                    value={isNaN(field.value as unknown as number) ? undefined : field.value}
                    type="number"
                    step={'none'}
                    onChange={(e) => {
                        if (isNaN(e.target.valueAsNumber)) {
                            field.setValue(undefined as unknown as T);
                        } else {
                            field.setValue(e.target.valueAsNumber as unknown as T);
                        }
                    }}
                />
            </>
        );
    }
    return <p style={{ color: 'red' }}>{field} is not of type number or undefined</p>;
}

const StyledInput = styled(Input)`
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`;
