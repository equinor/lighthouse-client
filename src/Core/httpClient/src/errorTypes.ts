/**
 * ErrorProperties provides a general purpose object
 * for extending the number error properties available
 * @export
 * @interface ErrorProperties
 */
export interface ErrorProperties {
    errors?: string | Record<string, unknown>;
    [key: string]: unknown; //support any properties in exception/error
}

export interface ErrorInitializerFunction<T extends BaseErrorProps, U extends CommonErrorArgs> {
    (ErrorType: { new (args): T }, args: U): BaseErrorProps;
}

export interface BaseErrorArgs {
    message: string;
    exception?: Record<string, unknown>;
}

export interface CommonErrorArgs {
    [key: string]: unknown;
}

export interface BaseErrorProps extends Error {
    hasBeenLogged: boolean;
    getProperties: () => ErrorProperties;
    addProperties: (values: ErrorProperties) => void;
}
