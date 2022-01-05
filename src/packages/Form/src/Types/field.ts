import { InputType } from './InputTypes/inputType';

export type Setter<Type> = (value: Type) => void;

export type Fields<T> = {
    [K in keyof T]?: Field<T[K]>;
};

export interface Field<Type> {
    value: Type;
    isDirty: boolean;
    isValid: boolean;
    title: string;
    optional: boolean;
    editable: boolean;
    order: number;
    inputType: InputType;
    setValue: Setter<Type>;
}
