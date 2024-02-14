import { TextField } from '@equinor/eds-core-react-old';
import { Field } from '../Types/field';

interface TextInputProps<T> {
    field: Field<T>;
    editMode: boolean;
}

export function TextInput<T>({ field, editMode }: TextInputProps<T>): JSX.Element {
    if (typeof field.value === 'string' || typeof field.value === 'undefined') {
        return (
            <>
                <TextField
                    id={field.toString()}
                    disabled={editMode ? !field?.editable : false}
                    value={field?.value}
                    placeholder={field.placeholderText}
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
