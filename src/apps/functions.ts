import { FunctionManifest } from '@equinor/lighthouse-functions';
import {
    htResolverFunction,
    rcResolverFunction
} from './DisciplineReleaseControl/DisciplineReleaseControlWidgets';
import { htCreatorAccessFunction } from './DisciplineReleaseControl/WorkspaceConfig';
import { changeFunction } from './ScopeChangeRequest/ScopeChangeRequestApp';
import { changeCreatorAccessFunction } from './ScopeChangeRequest/workspaceConfig/dataCreatorConfig';

export const functions: FunctionManifest[] = [
    changeFunction,
    htResolverFunction,
    rcResolverFunction,
    changeCreatorAccessFunction,
    htCreatorAccessFunction,
];

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
