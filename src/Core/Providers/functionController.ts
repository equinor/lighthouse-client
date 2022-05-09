import { FunctionManifest } from '../Functions/Types/function';
import { functionSore } from './functionStore';

export function getFunctions(): FunctionManifest[] {
    return functionSore;
}

export function addFunction(manifest: FunctionManifest): void {
    if (!functionSore.find((f) => f.functionId === manifest.functionId))
        functionSore.push(manifest);
}
