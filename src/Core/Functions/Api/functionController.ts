import { CustomFunction, FunctionManifest } from '../Types/function';
import { functionSore } from './functionStore';

export function getFunctions(): FunctionManifest[] {
    return functionSore;
}

export function getFunction(functionId: string): CustomFunction {
    const functions = getFunctions();
    const currentFunction = functions.find((f) => f.functionId === functionId);
    if (currentFunction) return currentFunction.function;
    return () => {
        console.warn('Could not find the function you ar looking for');
    };
}

export function addFunction(manifest: FunctionManifest): void {
    if (!functionSore.find((f) => f.functionId === manifest.functionId))
        functionSore.push(manifest);
}
