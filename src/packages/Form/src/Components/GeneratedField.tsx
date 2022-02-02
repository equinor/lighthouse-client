import { NumberInput } from './NumberInput';
import { SingleSelect } from './SingleSelect';
import { MultiSelect } from './MultiSelect';
import { TextArea } from './TextArea';
import { TextInput } from './TextInput';
import { Behaviour } from './Form';
import { Field } from './Field';
import { Field as FieldType } from '../Types/field';

interface GenerateFieldProps<T> {
    field: FieldType<T>;
    editMode: boolean;
    behaviour?: Behaviour;
}

export function GeneratedField<T>({
    field,
    editMode,
    behaviour,
}: GenerateFieldProps<T>): JSX.Element | null {
    if (!field.inputType) return null;
    const metaTag =
        !behaviour?.hideMetaTags && !field.optional ? { meta: '(Required)' } : undefined;

    if (editMode && behaviour?.hideDisabledFields && !field.editable) {
        return <></>;
    }

    switch (field.inputType.type) {
        case 'TextInput': {
            return (
                <Field
                    label={field.title ?? ''}
                    customLabel={metaTag}
                    value={<TextInput field={field} editMode={editMode} />}
                />
            );
        }

        case 'TextArea': {
            return (
                <Field
                    label={field.title ?? ''}
                    customLabel={metaTag}
                    value={<TextArea field={field} editMode={editMode} />}
                />
            );
        }

        case 'NumberInput': {
            return (
                <Field
                    label={field.title ?? ''}
                    customLabel={metaTag}
                    value={<NumberInput field={field} editMode={editMode} />}
                />
            );
        }

        case 'SingleSelect': {
            return (
                <Field
                    label={field.title ?? ''}
                    customLabel={metaTag}
                    value={
                        <SingleSelect
                            editMode={editMode}
                            field={field}
                            selectItems={field.inputType.selectOptions}
                        />
                    }
                />
            );
        }

        case 'MultiSelect': {
            return (
                <Field
                    label={field.title ?? ''}
                    customLabel={metaTag}
                    value={
                        <MultiSelect
                            editMode={editMode}
                            field={field}
                            selectItems={field.inputType.selectOptions}
                        />
                    }
                />
            );
        }
    }
}
