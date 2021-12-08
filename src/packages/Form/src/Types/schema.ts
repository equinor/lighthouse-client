import { Field } from './field';

export type Schema<T> = {
    [P in keyof T]?: Field;
};
