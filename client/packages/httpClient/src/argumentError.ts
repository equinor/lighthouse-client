import { BaseError } from './baseError';

export interface ArgumentErrorArgs {
    argumentName: string;
}

export class ArgumentError extends BaseError {
    constructor({ argumentName }: ArgumentErrorArgs) {
        super({ message: argumentName });
    }
}

export default ArgumentError;
