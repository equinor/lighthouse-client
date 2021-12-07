import { useState, useCallback, useMemo } from 'react';

import { Field, Fields } from '../Types/field';
import { Form } from '../Types/form';
import { Schema } from '../Types/schema';
import { Value } from '../Types/value';

const validateField = <TValue>(field: Field, value: TValue): string | undefined => {
    if (field.isRequired && !value) {
        return `${field.label} is required`;
    }

    return undefined;
};

export const useFormSchema = <T>(schema: Schema<T>, initialState: T): Form<T> => {
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
                label: field.label,
                editable: field.editable,
                order: field.order,
                inputType: field.inputType,
                isValid: field.validationFunction
                    ? field.validationFunction(data[fieldKey])
                    : !errorMessage,

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
            return { ...data } as T;
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
            if (field?.validationFunction) {
                return field.validationFunction(field.value);
            }
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
