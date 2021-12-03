import { Value } from './value';
import { InputType } from './inputType';

export interface Field {
    label?: string;
    isRequired: (() => boolean) | boolean;
    editable: (() => boolean) | boolean;
    order: number;
    inputType: InputType;
}

export type Fields<T> = {
    [K in keyof T]?: Value<T[K]>;
};
