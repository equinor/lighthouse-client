import { useState, useCallback, useMemo } from 'react';

export interface Value<T> {
    value: T;
    isDirty: boolean;
    isValid: boolean;
    isRequired: boolean;
    errorMessage: string | undefined;
}

export interface Field {
    label: string;
    isRequired: boolean;
}

export type Schema<T> = {
    [P in keyof T]?: Field;
};

export type Fields<T> = {
    [P in keyof T]?: Value<T[P]>;
};

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

const validateField = <TValue>(field: Field, value: TValue): string | undefined => {
    if (field.isRequired && !value) {
        return `${field.label} is required`;
    }

    return undefined;
};

export default <T>(schema: Schema<T>, initialState: T): Form<T> => {
    const [data, setData] = useState<T>(initialState);
    const [resetState, setResetState] = useState<T>(initialState);

    const mutateField = useCallback(<TKey extends keyof T>(key: TKey, value: T[TKey]): void => {
        setData((existingData) => ({ ...existingData, [key]: value }));
    }, []);

    const fields = useMemo((): Fields<T> => {
        const newFields: Fields<T> = {};
        for (const fieldKey in schema) {
            if (!schema[fieldKey]) {
                continue;
            }

            const field = schema[fieldKey] as Field;

            if (!field) {
                continue;
            }

            const isDirty = data[fieldKey] !== resetState[fieldKey];
            const errorMessage = isDirty ? validateField(field, data[fieldKey]) : undefined;
            newFields[fieldKey] = {
                errorMessage,
                isDirty,
                isRequired: field.isRequired,
                isValid: !errorMessage,

                get value(): T[Extract<keyof T, string>] {
                    return data[fieldKey];
                },

                set value(newValue) {
                    mutateField(fieldKey, newValue);
                },
            };
        }

        return newFields;
    }, [data, mutateField, resetState, schema]);

    return {
        fields,
        getData: (): T => {
            return { ...data };
        },
        getChangedData: (): Partial<T> => {
            const changedData = {};

            for (const [key, val] of Object.entries(fields)) {
                const v = val as Value<T>;
                if (v.isDirty && v.value !== undefined) changedData[key] = v.value;
            }
            return changedData;
        },
        getErrorMessage: <TValue>(field?: Value<TValue>): string | undefined => {
            if (field) {
                return field.errorMessage;
            }

            return undefined;
        },

        getSetter: <TValue>(field?: Value<TValue>, checkBeforeSave?: () => Promise<boolean>) => {
            if (field) {
                return async (value: TValue) => {
                    if (!checkBeforeSave || (checkBeforeSave && (await checkBeforeSave())))
                        field.value = value;
                };
            }

            return async (value: TValue) => {
                value;
            };
        },
        getValue: <TValue>(field: Value<TValue> | undefined, defaultValue: TValue): TValue => {
            if (field && field.value) {
                return field.value;
            }

            return defaultValue;
        },
        isAllValid: (): boolean => {
            const values = Object.values(fields) as any[];

            if (values.filter((v): boolean => v.isRequired).every((v): boolean => v.isValid)) {
                return true;
            }

            return false;
        },
        isAllDirty: (requiredOnly: boolean): boolean => {
            const values = Object.values(fields) as any[];

            if (
                values
                    .filter((v): boolean => (requiredOnly ? v.isRequired : true))
                    .every((v): boolean => v.isDirty)
            ) {
                return true;
            }

            return false;
        },
        isDirty: (): boolean => {
            const values = Object.values(fields) as any[];
            return values.some((v): boolean => v.isDirty);
        },
        isValid: <TValue>(field?: Value<TValue>): boolean => {
            if (!field) {
                return true;
            }

            return field.isValid;
        },
        reset: (state: T = initialState): void => {
            setResetState(state);
            setData(state);
        },
    };
};
