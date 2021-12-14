export type InputType =
    | TextInput
    | TextArea
    | SingleSelect
    | MultiSelect
    | MultiSelectObject
    | SearchableDropdown
    | NumberInput
    | Custom;

export interface TextInput {
    type: 'TextInput';
    CustomInputType?: React.FC;
}

export interface TextArea {
    type: 'TextArea';
    CustomInputType?: React.FC;
}

export interface SingleSelect {
    type: 'SingleSelect';
    selectOptions: StringSelectOptions;
    CustomInputType?: React.FC<{ selectOptions: StringSelectOptions }>;
}

export interface MultiSelect {
    type: 'MultiSelect';
    selectOptions: StringSelectOptions;
    CustomInputType?: React.FC<{ selectOptions: StringSelectOptions }>;
}

export interface MultiSelectObject {
    type: 'MultiSelectObject';
    selectOptions: ObjectSelectOptions;
    objectIdentifier: string;
    CustomInputType?: React.FC<{ selectOptions: ObjectSelectOptions }>;
}

export interface SearchableDropdown {
    type: 'SearchableDropdown';
    selectOptions: StringSelectOptions;
    CustomInputType?: React.FC<{ selectOptions: StringSelectOptions }>;
}

export interface NumberInput {
    type: 'NumberInput';
    CustomInputType?: React.FC;
}

export interface Custom {
    type: 'Custom';
    CustomInputType?: React.FC;
}

type ObjectSelectOptions = (() => Promise<any[]>) | any[];
type StringSelectOptions = (() => Promise<string[]>) | string[];
