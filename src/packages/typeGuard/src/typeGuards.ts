export class TypeguardError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'An error occurred (Unexpected type)';
    }
}

export const isOfType = <T>(
    varToBeChecked: unknown,
    propertyToCheckFor: keyof T
): varToBeChecked is T => {
    return (varToBeChecked as T)[propertyToCheckFor] !== undefined;
};

export const isArrayOfType = <T>(
    dataToBeChecked: unknown,
    propertyToCheckFor: keyof T
): dataToBeChecked is T[] => {
    return (
        Array.isArray(dataToBeChecked) &&
        dataToBeChecked.every((item) => isOfType<T>(item, propertyToCheckFor))
    );
};

export const isOfTypeObject = <T>(
    varToBeChecked: unknown,
    propertiesToCheckFor: Array<keyof T>
): varToBeChecked is T => {
    return propertiesToCheckFor.every((propertyToCheckFor: keyof T) =>
        isOfType(varToBeChecked, propertyToCheckFor)
    );
};
