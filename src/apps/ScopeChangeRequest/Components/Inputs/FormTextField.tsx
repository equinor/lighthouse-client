import { TextField } from '@equinor/eds-core-react';
import { useState } from 'react';
import styled from 'styled-components';

interface FormTextFieldProps {
    initialValue?: string;
    label?: string;
    multiline?: boolean;
    placeholder?: string;
    required?: boolean;
    onChange?: (value: string) => void;
    type?: React.HTMLInputTypeAttribute;
}

/**
 * Had to make this wrapper to be able to give a textfield an initial value that is a ref
 * TLDR; Prevent re-render issues
 */
export const FormTextField = ({
    initialValue,
    label,
    multiline,
    placeholder,
    required,
    onChange,
    type,
}: FormTextFieldProps): JSX.Element => {
    const [text, setText] = useState<string>(initialValue ?? '');

    return (
        <TextField
            id={Math.random().toString()}
            value={text}
            rows={5}
            label={label}
            multiline={multiline}
            placeholder={placeholder}
            type={type}
            onInput={(e) => {
                setText(e.target.value);
                onChange && onChange(e.target.value);
            }}
            meta={required ? '(Required)' : ''}
        />
    );
};
