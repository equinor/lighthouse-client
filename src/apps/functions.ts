import { workflowResolverFunction, workflowStepResolverFunction } from '@equinor/Admin';
import { FunctionManifest } from '@equinor/lighthouse-functions';

import { loopResolverFunction } from './Loop/utility/config';
import { mcResolverFunction } from './MechanicalCompletion';
import { punchResolverFunction } from './Punch/utility/config';
import { queryResolverFunction } from './Query/utility/config';
import { releaseResolverFunction } from './ReleaseControl/ReleaseControlApp';
import { releaseCreatorAccessFunction } from './ReleaseControl/workspaceConfig/DataCreator/dataCreatorConfig';
import { changeResolverFunction } from './ScopeChangeRequest/ScopeChangeRequestApp';
import { changeCreatorAccessFunction } from './ScopeChangeRequest/workspaceConfig/dataCreatorConfig';
import { swcrResolverFunction } from './swcr';
import { tagResolverFunction } from './Tags';
import { workOrderResolverFunction } from './WorkOrder/utility/sidesheetConfig';
import { htResolverFunction, rcResolverFunction } from './DisciplineReleaseControl/sidesheet';

export const functions: FunctionManifest[] = [
  changeCreatorAccessFunction,
  releaseCreatorAccessFunction,
  changeResolverFunction,
  htResolverFunction as any,
  rcResolverFunction as any,
  swcrResolverFunction,
  workOrderResolverFunction,
  mcResolverFunction,
  releaseResolverFunction,
  mcResolverFunction,
  tagResolverFunction,
  loopResolverFunction,
  workflowResolverFunction,
  punchResolverFunction,
  queryResolverFunction,
  workflowStepResolverFunction,
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
