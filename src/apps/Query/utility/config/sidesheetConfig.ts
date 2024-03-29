import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { IdResolverFunc, setupWorkspaceSidesheet } from '@equinor/WorkSpace';
import { QuerySideSheet } from '../../components';
import { Query } from '../../types';
const customQueryColumns = [
  'QueryId',
  'QueryUrlId',
  'Facility',
  'Project',
  'QueryType',
  'QueryNo',
  'Title',
  'CostImpact',
  'ConsequenceIfNotImplemented',
  'ProposedSolution',
  'EngineeringReply',
  'Milestone',
  'ScheduleImpact',
  'PossibleWarrantyClaim',
  'RequiredReplyDate',
  'Discipline',
  'DisciplineDescription',
  'CreatedDate',
  'UpdatedDate',
  'FAMUpsertedTime',
  'NextToSign',
  'ClosedDate',
  'IsOpen',
  'QueryStatus',
  'DaysToClose',
  'SignatureProgress',
  'Steps',
  'StepsSigned',
  'IsOverdue',
  'Description',
];
const idResolverFunction = async (id: string): Promise<Query> => {
  const { FAM } = httpClient();
  const expressions = generateExpressions('queryUrlId', 'Equals', [id]);
  const requestArgs = generateFamRequest(customQueryColumns, 'Or', expressions);
  const res = await FAM.fetchAsync(
    'v1/typed/completion/custom_query/facility/JCA?view-version=v0',
    {
      body: JSON.stringify(requestArgs),
      method: 'POST',
      headers: { 'content-type': 'application/json' },
    }
  );

  if (!res.ok) {
    throw 'Not found';
  }

  const queries = await res.json();
  if (Array.isArray(queries) && queries.length === 1) {
    return queries[0];
  } else {
    throw 'Invalid response';
  }
};
const idResolver: IdResolverFunc<Query> = idResolverFunction;

export const sidesheetConfig = setupWorkspaceSidesheet<Query, 'queryDetails'>({
  id: 'queryDetails',
  component: QuerySideSheet,
  color: '#0084C4',
  props: {
    objectIdentifier: 'queryUrlId',
    parentApp: 'query',
    function: idResolver,
  },
});

export const querySidesheetWidgetManifest = sidesheetConfig('SidesheetManifest');
export const querySidesheetWidgetComponent = sidesheetConfig('SidesheetComponentManifest');
export const queryResolverFunction = sidesheetConfig('ResolverFunction');
