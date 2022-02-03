import { InputType } from './InputTypes/inputType';

export interface FieldConfig<T> {
    /** Title to be shown above the input field */
    title?: string;
    /** Input type */
    inputType?: InputType;
    /** Order of the input fields, give two the same order if you want them side by side */
    order?: number;
    /** Is field optional, default false */
    optional?: boolean;
    /** Should field be editable when form is in editmode, default true */
    editable?: boolean;
    /** Takes in the value of the field and lets you write your own validation function */
    validationFunction?: (value: T | undefined) => boolean;
    /** Placeholder text */
    placeholderText?: string;
}
