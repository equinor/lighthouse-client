import { FunctionManifest } from '@equinor/lighthouse-functions';
import {
    htResolverFunction,
    rcResolverFunction
} from './DisciplineReleaseControl/DisciplineReleaseControlWidgets';
import { htCreatorAccessFunction } from './DisciplineReleaseControl/WorkspaceConfig';
import { handoverResolverFunction } from './Handover';
import { mcResolverFunction } from './MechanicalCompletion';
import { releaseResolverFunction } from './ReleaseControl/ReleaseControlApp';
import { changeResolverFunction } from './ScopeChangeRequest/ScopeChangeRequestApp';
import { changeCreatorAccessFunction } from './ScopeChangeRequest/workspaceConfig/dataCreatorConfig';
import { swcrResolverFunction } from './swcr';
import { workOrderResolverFunction } from './WorkOrder';

export const functions: FunctionManifest[] = [
    changeCreatorAccessFunction,
    htCreatorAccessFunction,
    changeResolverFunction,
    htResolverFunction,
    rcResolverFunction,
    swcrResolverFunction,
    handoverResolverFunction,
    workOrderResolverFunction,
    mcResolverFunction,
    releaseResolverFunction,
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
