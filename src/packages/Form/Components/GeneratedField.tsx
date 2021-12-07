import { Value } from '../Types/value';
import { Field } from './Field';
import { InputType } from '../Types/inputType';
import { Components } from './Form';
import { TextInput } from './InputTypes/TextInput';
import { SingleSelect } from './InputTypes/SingleSelect';
import { MultiSelect } from './InputTypes/MultiSelect';
import { MultiSelectObject } from './InputTypes/MultiSelectObject';
import { MultiSelect as MultiSelectInterface } from '../Types/inputType';
import { MultiSelectObject as MultiSelectObjectInterface } from '../Types/inputType';
import { SingleSelect as SingleSelectInterface } from '../Types/inputType';
import { Custom as CustomInterface } from '../Types/inputType';
import { TextInput as TextInputInterface } from '../Types/inputType';
import { NumberInput as NumberInputInterface } from '../Types/inputType';
import { SearchableDropdown as SearchableDropdownInterface } from '../Types/inputType';
import { TextArea as TextAreaInterface } from '../Types/inputType';
import { TextArea } from './InputTypes/TextArea';
import { NumberInput } from './InputTypes/NumberInput';

interface GeneratedFieldProps {
    inputType: InputType;
    setter: (value: string | number) => Promise<void>;
    field: Value<string | number | string[]>;
    editMode: boolean;
    customComponents?: Components;
}

export const GeneratedField = ({
    inputType,
    setter,
    field,
    editMode,
}: GeneratedFieldProps): JSX.Element => {
    switch (inputType.type) {
        case 'TextInput': {
            const textInputField = field.inputType as TextInputInterface;
            return (
                <Field
                    key={field.label + 'field'}
                    label={field.label || ''}
                    customLabel={{ faded: true }}
                    value={
                        textInputField.CustomInputType ? (
                            <textInputField.CustomInputType />
                        ) : (
                            <TextInput
                                key={field.label + 'input'}
                                setter={setter}
                                field={field as Value<string>}
                                editMode={editMode}
                            />
                        )
                    }
                />
            );
        }

        case 'NumberInput': {
            const numberField = field.inputType as NumberInputInterface;
            return (
                <Field
                    key={field.label + 'field'}
                    label={field.label || ''}
                    customLabel={{ faded: true }}
                    value={
                        numberField.CustomInputType ? (
                            <numberField.CustomInputType />
                        ) : (
                            <NumberInput
                                key={field.label + 'input'}
                                setter={setter}
                                field={field as Value<number>}
                                editMode={false}
                            />
                        )
                    }
                />
            );
        }

        case 'TextArea': {
            const textAreaField = field.inputType as TextAreaInterface;
            return (
                <Field
                    key={field.label + 'field'}
                    label={field.label || ''}
                    customLabel={{ faded: true }}
                    value={
                        textAreaField.CustomInputType ? (
                            <textAreaField.CustomInputType />
                        ) : (
                            <TextArea
                                key={field.label + 'input'}
                                setter={setter}
                                field={field as Value<string>}
                                editMode={editMode}
                            />
                        )
                    }
                />
            );
        }

        case 'MultiSelect': {
            const multiSelectField = field.inputType as MultiSelectInterface;
            const selectOptions = Array.isArray(multiSelectField.selectOptions)
                ? multiSelectField.selectOptions
                : multiSelectField.selectOptions();
            return (
                <Field
                    key={field.label + 'field'}
                    label={field.label || ''}
                    customLabel={{ faded: true }}
                    value={
                        multiSelectField.CustomInputType ? (
                            <multiSelectField.CustomInputType options={selectOptions} />
                        ) : (
                            <MultiSelect
                                key={field.label + 'input'}
                                setter={setter as unknown as (value: string[]) => Promise<void>}
                                field={field as unknown as Value<string[]>}
                                editMode={editMode}
                                selectItems={selectOptions}
                                inputType={multiSelectField}
                            />
                        )
                    }
                />
            );
        }

        case 'MultiSelectObject': {
            const multiSelectField = field.inputType as MultiSelectObjectInterface;
            const selectOptions = Array.isArray(multiSelectField.selectOptions)
                ? multiSelectField.selectOptions
                : multiSelectField.selectOptions();
            return (
                <Field
                    key={field.label + 'field'}
                    label={field.label || ''}
                    customLabel={{ faded: true }}
                    value={
                        multiSelectField.CustomInputType ? (
                            <multiSelectField.CustomInputType options={selectOptions} />
                        ) : (
                            <MultiSelectObject
                                key={field.label + 'input'}
                                setter={setter as unknown as (value: string[]) => Promise<void>}
                                field={field as unknown as Value<string[]>}
                                editMode={editMode}
                                selectItems={selectOptions}
                                inputType={multiSelectField}
                            />
                        )
                    }
                />
            );
        }

        case 'SingleSelect': {
            const singleSelectField = field.inputType as SingleSelectInterface;
            const selectOptions = Array.isArray(singleSelectField.selectOptions)
                ? singleSelectField.selectOptions
                : singleSelectField.selectOptions(field.value as unknown as any[]);
            return (
                <Field
                    key={field.label + 'field'}
                    label={field.label || ''}
                    customLabel={{ faded: true }}
                    value={
                        singleSelectField.CustomInputType ? (
                            <singleSelectField.CustomInputType options={selectOptions} />
                        ) : (
                            <SingleSelect
                                key={field.label + 'input'}
                                setter={setter}
                                field={field as Value<string>}
                                editMode={editMode}
                                selectItems={selectOptions}
                            />
                        )
                    }
                />
            );
        }

        case 'SearchableDropdown': {
            const searchableDropdownField = field.inputType as SearchableDropdownInterface;
            const selectOptions = Array.isArray(searchableDropdownField.selectOptions)
                ? searchableDropdownField.selectOptions
                : searchableDropdownField.selectOptions();
            return (
                <Field
                    key={field.label + 'field'}
                    label={field.label || ''}
                    customLabel={{ faded: true }}
                    value={
                        searchableDropdownField.CustomInputType ? (
                            <searchableDropdownField.CustomInputType options={selectOptions} />
                        ) : (
                            <p>Not implemented</p>
                        )
                    }
                />
            );
        }

        case 'Custom': {
            const customField = field.inputType as CustomInterface;
            return <>{customField.CustomInputType && <customField.CustomInputType />}</>;
        }
    }
};
