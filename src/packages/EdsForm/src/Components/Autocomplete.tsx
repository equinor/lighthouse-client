import {
    Autocomplete as EdsAutocomplete,
    AutocompleteProps,
    AutocompleteChanges,
} from '@equinor/eds-core-react';
import { useField } from 'formik';

export const Autocomplete = <T,>(
    props: AutocompleteProps<T> & { readonly name: string; readonly label: string }
): JSX.Element => {
    const [field, meta, helpers] = useField(props.name);

    const text = meta.error ? meta.error : '';
    const variant = meta.error && meta.touched ? 'error' : undefined;

    const onOptionsChange = (changes: AutocompleteChanges<T>) => {
        if (props.multiple) helpers.setValue(changes.selectedItems);
        else helpers.setValue(changes.selectedItems[0] ?? '');
    };

    return (
        <EdsAutocomplete
            {...field}
            {...props}
            meta={text}
            variant={variant}
            onOptionsChange={onOptionsChange}
        />
    );
};
