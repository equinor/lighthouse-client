import { Fields } from './field';
import { Value } from './value';

export interface Form<T> {
    fields: Fields<T>;
    getData: () => T;
    getChangedData: () => Partial<T>;
    getErrorMessage: <TValue>(field?: Value<TValue>) => string | undefined;
    getSetter: <TValue>(
        field?: Value<TValue>,
        checkBeforeSave?: () => Promise<boolean>
    ) => (value: TValue) => Promise<void>;
    getValue: <TValue>(field: Value<TValue> | undefined, defaultValue: TValue) => TValue;
    isAllValid: () => boolean;
    isAllDirty: (requiredOnly: boolean) => boolean;
    isDirty: () => boolean;
    isValid: <TValue>(field?: Value<TValue>) => boolean;
    reset: (state?: T) => void;
}
