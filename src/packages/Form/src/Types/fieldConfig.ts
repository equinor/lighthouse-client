import { InputType } from './InputTypes/inputType';

export interface FieldConfig<T> {
    title: string;
    inputType: InputType;
    order?: number;
    optional?: boolean;
    editable?: boolean;
    validationFunction?: (value: T | undefined) => boolean;
}
