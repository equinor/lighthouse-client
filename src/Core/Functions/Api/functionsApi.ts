import { CustomFunction, FunctionManifest } from '../Types/function';
import { addFunction, getFunction, getFunctions } from './functionController';

interface FunctionsAPI {
    getFunction(functionId: string): CustomFunction;
    getFunctions(): FunctionManifest[];
    addFunction(manifest: FunctionManifest): void;
}

export const Functions: FunctionsAPI = {
    getFunction,
    getFunctions,
    addFunction,
};
