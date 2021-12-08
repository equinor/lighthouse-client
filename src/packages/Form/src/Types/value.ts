import { Field } from './field';

export interface Value<T> extends Field {
    value: T;
    isDirty: boolean;
    isValid: boolean;
    errorMessage: string | undefined;
}
