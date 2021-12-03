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
    selectOptions: ((field: any[]) => string[]) | string[];
    CustomInputType?: React.FC<{ options: string[] }>;
}

export interface MultiSelect {
    type: 'MultiSelect';
    selectOptions: (() => string[]) | string[];
    CustomInputType?: React.FC<{ options: string[] }>;
}

export interface MultiSelectObject {
    type: 'MultiSelectObject';
    selectOptions: (() => string[]) | string[];
    toStringArrayFunction: (field: any[]) => string[];
    toObjectArrayFunction: (values: string[]) => any[];
    CustomInputType?: React.FC<{ options: string[] }>;
}

export interface SearchableDropdown {
    type: 'SearchableDropdown';
    selectOptions: (() => string[]) | string[];
    CustomInputType?: React.FC<{ options: string[] }>;
}

export interface NumberInput {
    type: 'NumberInput';
    CustomInputType?: React.FC;
}

export interface Custom {
    type: 'Custom';
    CustomInputType?: React.FC;
}
