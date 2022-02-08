import { Fields } from './field';

export interface Form<T> {
    /**
     * The fields in the form
     */
    fields: Fields<T>;
    /**
     * The current state of the data
     */
    data: T;
    /**
     * Boolean to be used for checking if the form is valid,
     * I.E use it to disable the submit button if form is not valid
     * @returns boolean
     */
    isValidForm: () => boolean;
    /**
     * Returns a partial object containing the data that was changed
     */
    getChangedData: () => Partial<T> | undefined;
    /**
     * Resets the state to whatever the state was at time of invocation
     */
    reset: () => void;
    /**
     * Function for setting the whole state of the form,
     * Should not be used for manipulating a single field
     * @param state
     */
    set: (state: Partial<T>) => void;
}
