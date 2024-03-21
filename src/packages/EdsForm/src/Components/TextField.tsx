import { TextField as EdsTextField, TextFieldProps } from '@equinor/eds-core-react';
import { useField } from 'formik';
import styled from 'styled-components';

const StyledTextField = styled(EdsTextField)`
  ${({ multiline }) => multiline && ` textarea { resize: vertical !important; } `}
`;

export const TextField = (
  props: TextFieldProps & { readonly name: string; readonly label: string }
): JSX.Element => {
  const [field, meta] = useField(props.name);

  const text = meta.error ? meta.error : '';
  const variant = meta.error && meta.touched ? 'error' : undefined;

  return (
    <StyledTextField {...field} {...props} label={props.label} variant={variant} meta={text} />
  );
};
