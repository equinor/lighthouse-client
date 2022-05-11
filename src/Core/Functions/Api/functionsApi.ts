import { CustomFunction, FunctionManifest } from '../Types/function';
import { addFunction, getFunction, getFunctions } from './functionController';

interface FunctionsAPI {
    getFunction(functionId: string): Promise<CustomFunction>;
    getFunctions(): FunctionManifest[];
    addFunction(manifest: FunctionManifest): void;
}

export const functions: FunctionsAPI = {
    getFunction,
    getFunctions,
    addFunction,
};
