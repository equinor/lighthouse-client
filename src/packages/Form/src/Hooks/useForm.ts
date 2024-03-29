import { useState, useCallback, useMemo } from 'react';
import { FieldConfig } from '../Types/fieldConfig';
import { Schema } from '../Types/schema';
import { Form } from '../Types/form';
import { Fields, Field } from '../Types/field';

const validateField = <TValue>(field: FieldConfig<TValue>, value?: TValue): boolean => {
  if (field.optional) {
    return true;
  }
  if (field.validationFunction) {
    return field.validationFunction(value);
  }

  if (!field.optional && !value) {
    return false;
  }

  return true;
};

const buildObject = <T>(schema: Schema<T>, initialState?: Partial<T>): T => {
  let object = {} as T;

  for (const [key] of Object.entries(schema)) {
    object[key] = undefined;
  }
  object = { ...object, ...initialState };

  return object;
};

/**
 * Hook that controls the state of a form
 * @param schema
 * @param initialState
 * @returns
 */
export const useForm = <T>(schema: Schema<T>, initialState?: Partial<T>): Form<T> => {
  const state: T = buildObject(schema, initialState);

  const [data, setData] = useState<T>(state);
  const originalState: T = useMemo(() => state, [state]);

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

      const fieldConfig = schema[fieldKey] as FieldConfig<T[typeof fieldKey]>;

      if (!fieldConfig) {
        continue;
      }

      const isDirty = data[fieldKey] !== originalState[fieldKey];
      const isValid = validateField(fieldConfig, data[fieldKey]);
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
        placeholderText: fieldConfig.placeholderText || '',
      };
    }
    return newFields;
  }, [data, mutateField, originalState, schema]);

  const form: Form<T> = {
    fields,
    data,
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
    set: (state: Partial<T>) => {
      setData({ ...data, ...state });
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
