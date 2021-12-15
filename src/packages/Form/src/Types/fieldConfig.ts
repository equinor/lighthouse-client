import { InputType } from './InputTypes/inputType';

export interface FieldConfig {
    title: string;
    inputType: InputType;
    order?: number;
    optional?: boolean;
    editable?: boolean;
    validationFunction?: (value: any | undefined) => boolean;
}
