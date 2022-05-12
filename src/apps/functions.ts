import { FunctionManifest } from '@equinor/lighthouse-functions';
import { changeFunction } from './ScopeChangeRequest/ScopeChangeRequestApp';

export const functions: FunctionManifest[] = [changeFunction];

export async function fetchFunction(functionId?: string): Promise<FunctionManifest> {
    return new Promise((resolve, reject) => {
        const currentFunction = functions.find((fn) => fn.functionId === functionId);
        if (currentFunction) {
            resolve(currentFunction);
        }
        reject(new Error(`No function found by id: ${functionId}`));
    });
}

export async function fetchFunctions(type?: string): Promise<FunctionManifest[]> {
    return new Promise((resolve) => {
        if (type) {
            resolve(functions.filter((fn) => fn.type === type));
        }

        resolve(functions);
    });
}
