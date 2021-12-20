import { Fields } from './field';

export interface Form<T> {
    fields: Fields<T>;
    data: T;
    isValidForm: () => boolean;
    getChangedData: () => Partial<T> | undefined;
    reset: () => void;
    set: (state: Partial<T>) => void;
}
