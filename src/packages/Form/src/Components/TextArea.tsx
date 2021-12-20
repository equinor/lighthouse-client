import { TextField } from '@equinor/eds-core-react';
import { Field } from '../Types/field';

interface TextAreaProps<T> {
    field: Field<T>;
    editMode: boolean;
}

export function TextArea<T>({ field, editMode }: TextAreaProps<T>): JSX.Element {
    if (typeof field.value === 'string' || typeof field.value === 'undefined') {
        return (
            <>
                <TextField
                    id={field.toString()}
                    multiline
                    disabled={editMode ? !field?.editable : false}
                    value={field?.value}
                    onChange={(e) => {
                        if (!e.target.value || e.target.value.length < 1) {
                            field.setValue(undefined as unknown as T);
                        } else {
                            field.setValue(e.target.value);
                        }
                    }}
                />
            </>
        );
    }
    return <p style={{ color: 'red' }}>{field} is not of type string or undefined</p>;
}
