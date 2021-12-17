import { FieldConfig } from './fieldConfig';

export type Schema<T> = {
    [P in keyof T]?: FieldConfig<T[P]>;
};
