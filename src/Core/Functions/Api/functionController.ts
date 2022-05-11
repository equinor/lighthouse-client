import { fetchFunction } from '../../../apps/functions';
import { CustomFunction, FunctionManifest } from '../Types/function';
import { functionSore } from './functionStore';

export function getFunctions(): FunctionManifest[] {
    return functionSore;
}

export async function getFunction(functionId: string): Promise<CustomFunction> {
    const functions = getFunctions();
    const currentFunction = functions.find((f) => f.functionId === functionId);
    if (currentFunction) return currentFunction.function;

    try {
        const functionManifest = await fetchFunction(functionId);
        if (functionManifest) addFunction(functionManifest);
        return functionManifest.function;
    } catch {
        return () => {
            console.warn('Could not find the function you ar looking for');
        };
    }
}

export function addFunction(manifest: FunctionManifest): void {
    if (!functionSore.find((f) => f.functionId === manifest.functionId))
        functionSore.push(manifest);
}
