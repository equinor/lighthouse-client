import { TextField as EdsTextField, TextFieldProps } from '@equinor/eds-core-react';
import { Field, useField } from 'formik';

export const TextField = (props: TextFieldProps & { name: string; label: string }): JSX.Element => {
    const [, meta] = useField(props.name);

    const text = meta.error ? meta.error : '';
    const variant = meta.error && meta.touched ? 'error' : undefined;

    return <Field {...props} label={props.label} as={EdsTextField} variant={variant} meta={text} />;
};
