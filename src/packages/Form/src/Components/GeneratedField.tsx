import { Value } from '../Types/value';
import { Field } from './Field';
import { InputType } from '../Types/inputType';
import { Components } from './Form';
import {
    SingleSelect,
    MultiSelect,
    MultiSelectObject,
    NumberInput,
    TextArea,
    TextInput,
} from './InputTypes';
import {
    SearchableDropdown as SearchableDropdownInterface,
    MultiSelect as MultiSelectInterface,
    NumberInput as NumberInputInterface,
    TextInput as TextInputInterface,
    Custom as CustomInterface,
    SingleSelect as SingleSelectInterface,
    MultiSelectObject as MultiSelectObjectInterface,
} from '../Types/inputType';
import { TextArea as TextAreaInterface } from '../Types/inputType';

interface GeneratedFieldProps {
    setter: (value: string | number) => Promise<void>;
    inputType: InputType;
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
            return (
                <Field
                    key={field.label + 'field'}
                    label={field.label || ''}
                    customLabel={{ faded: true }}
                    value={
                        multiSelectField.CustomInputType ? (
                            <multiSelectField.CustomInputType
                                selectOptions={inputType.selectOptions}
                            />
                        ) : (
                            <MultiSelect
                                key={field.label + 'input'}
                                setter={setter as unknown as (value: string[]) => Promise<void>}
                                field={field as unknown as Value<string[]>}
                                editMode={editMode}
                                selectItems={inputType.selectOptions}
                                inputType={multiSelectField}
                            />
                        )
                    }
                />
            );
        }

        case 'MultiSelectObject': {
            const multiSelectField = field.inputType as MultiSelectObjectInterface;
            return (
                <Field
                    key={field.label + 'field'}
                    label={field.label || ''}
                    customLabel={{ faded: true }}
                    value={
                        multiSelectField.CustomInputType ? (
                            <multiSelectField.CustomInputType
                                selectOptions={inputType.selectOptions}
                            />
                        ) : (
                            <MultiSelectObject
                                key={field.label + 'input'}
                                setter={setter as unknown as (value: string[]) => Promise<void>}
                                field={field as unknown as Value<string[]>}
                                editMode={editMode}
                                inputType={multiSelectField}
                            />
                        )
                    }
                />
            );
        }

        case 'SingleSelect': {
            const singleSelectField = field.inputType as SingleSelectInterface;
            return (
                <Field
                    key={field.label + 'field'}
                    label={field.label || ''}
                    customLabel={{ faded: true }}
                    value={
                        singleSelectField.CustomInputType ? (
                            <singleSelectField.CustomInputType
                                selectOptions={inputType.selectOptions}
                            />
                        ) : (
                            <SingleSelect
                                key={field.label + 'input'}
                                setter={setter}
                                field={field as Value<string>}
                                editMode={editMode}
                                selectItems={inputType.selectOptions}
                            />
                        )
                    }
                />
            );
        }

        case 'SearchableDropdown': {
            const searchableDropdownField = field.inputType as SearchableDropdownInterface;
            return (
                <Field
                    key={field.label + 'field'}
                    label={field.label || ''}
                    customLabel={{ faded: true }}
                    value={
                        searchableDropdownField.CustomInputType ? (
                            <searchableDropdownField.CustomInputType
                                selectOptions={inputType.selectOptions}
                            />
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
