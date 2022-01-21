import { BaseErrorArgs, ErrorProperties } from './errorTypes';

/**
 * Base Error class is intended to be used as a base class for every type of Error generated
 * @param message an error message in human readable format
 * @param exception a generated exception provided as a {Record<string, unknown>} type
 * Add custom properties in exception as desired
 * like: .exception = { aCustomProperty: 'test custom property' };
 * access with: .getProperties()['aCustomProperty']
 * @export
 * @class BaseError
 * @extends {Error}
 */
export class BaseError extends Error {
    protected properties: ErrorProperties;
    hasBeenLogged = false;

    constructor({ message, exception }: BaseErrorArgs) {
        super(message);
        /**
         * Object.setPrototypeOf(this, new.target.prototype);: to fix instance of:
         * https://stackoverflow.com/questions/55065742/implementing-instanceof-checks-for-custom-typescript-error-instances
         * https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
         */

        Object.setPrototypeOf(this, new.target.prototype);
        this.properties = exception ? { ...exception } : {};
        this.name = this.constructor.name;
        !message && (this.message = this.name);
    }

    getProperties = (): ErrorProperties => this.properties;

    addProperties = (values: ErrorProperties): void => {
        this.properties = { ...this.properties, ...values };
    };
}
