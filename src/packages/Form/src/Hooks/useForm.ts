import { useState, useCallback, useMemo } from 'react';
import { FieldConfig } from '../Types/fieldConfig';
import { Schema } from '../Types/schema';
import { Form } from '../Types/form';
import { Fields, Field } from '../Types/field';

const validateField = <TValue>(field: FieldConfig, value?: TValue): boolean => {
    if (field.validationFunction) {
        return field.validationFunction(value);
    }

    if (!field.optional && !value) {
        return false;
    }

    return true;
};

interface LooseObject {
    [key: string]: any;
}

const buildObject = <T>(schema: Schema<T>, initialState?: Partial<T>): T => {
    let object: LooseObject = {} as T;

    for (const [key] of Object.entries(schema)) {
        object[key] = undefined;
    }
    object = { ...object, ...initialState };

    return object as T;
};

export const useForm = <T>(schema: Schema<T>, initialState?: Partial<T>): Form<T> => {
    const state: T = buildObject(schema, initialState);

    const [data, setData] = useState<T>(state);
    const originalState: T = state;

    const mutateField = useCallback(<TKey extends keyof T>(key: TKey, value: T[TKey]): void => {
        setData((existingData) => ({ ...existingData, [key]: value }));
    }, []);

    const fields = useMemo((): Fields<T> => {
        const newFields: Fields<T> = {};
        let generatedOrder = 0;
        for (const fieldKey in schema) {
            generatedOrder++;
            if (!schema[fieldKey]) {
                continue;
            }

            const fieldConfig = schema[fieldKey] as FieldConfig;

            if (!fieldConfig) {
                continue;
            }

            const isDirty = data[fieldKey] !== originalState[fieldKey];
            const isValid = data[fieldKey] ? validateField(fieldConfig, data[fieldKey]) : undefined;
            newFields[fieldKey] = {
                title: fieldConfig.title,
                optional: fieldConfig.optional ?? false,
                editable: fieldConfig.editable ?? true,
                order: fieldConfig.order ?? generatedOrder,
                inputType: fieldConfig.inputType,
                isDirty: isDirty,
                setValue: (value) => mutateField(fieldKey, value),
                value: data[fieldKey],
                isValid: isValid ?? false,
            };
        }
        return newFields;
    }, [data, mutateField, schema]);

    const form: Form<T> = {
        fields,
        data: data,
        isValidForm: (): boolean => {
            const values = Object.values(fields) as Field<T>[];
            if (values.every((v): boolean => v.isValid)) {
                return true;
            }

            return false;
        },
        getChangedData: () => getChangedData(fields, originalState),
        reset: () => {
            setData(originalState);
        },
    };
    return form;
};

export const getChangedData = <T>(
    fields: Fields<T>,
    originalState: Partial<T>
): Partial<T> | undefined => {
    const changedData: Partial<T> = {};

    for (const [key, val] of Object.entries(fields)) {
        const field = val as Field<T>;
        if (field.value !== originalState[key]) {
            changedData[key] = field.value;
        }
    }
    return Object.keys(changedData).length > 0 ? changedData : undefined;
};

export function isAllValid<T>(fields: Fields<T>): boolean {
    const values = Object.values(fields) as any[];
    if (values.filter((v): boolean => v.isRequired).every((v): boolean => v.isValid)) {
        return true;
    }
    return false;
}
