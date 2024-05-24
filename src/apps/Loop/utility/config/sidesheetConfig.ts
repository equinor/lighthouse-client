import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { IdResolverFunc, setupWorkspaceSidesheet } from '@equinor/WorkSpace';

import { LoopSidesheet } from '../../components';
import { Loop } from '../../types';
import { customLoopMccrColumns } from '../api';

const idResolverFunction = async (id: string): Promise<Loop> => {
  const { FAM } = httpClient();
  const expressions = generateExpressions('checklistUrlId', 'Equals', [id]);
  const requestArgs = generateFamRequest(customLoopMccrColumns, 'Or', expressions);
  const res = await FAM.fetchAsync(
    'v1/typed/Completion/Custom_LoopMCCRv1/facility/JCA?view-version=v1',
    {
      body: JSON.stringify(requestArgs),
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    }
  );

  if (!res.ok) {
    throw 'Not found';
  }
  const loops = await res.json();
  if (Array.isArray(loops) && loops.length === 1) {
    return loops[0];
  } else {
    throw 'Invalid response';
  }
};
const idResolver: IdResolverFunc<Loop> = idResolverFunction;
export const sidesheetConfig = setupWorkspaceSidesheet<Loop, 'loop'>({
  id: 'loop',
  color: '#7B3A96',
  component: LoopSidesheet,
  props: {
    objectIdentifier: 'checklistUrlId',
    parentApp: 'loop',
    function: idResolver,
  },
});

export const loopSidesheetWidgetManifest = sidesheetConfig('SidesheetManifest');
export const loopSidesheetWidgetComponent = sidesheetConfig('SidesheetComponentManifest');
export const loopResolverFunction = sidesheetConfig('ResolverFunction');
