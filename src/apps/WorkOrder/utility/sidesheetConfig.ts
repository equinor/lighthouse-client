import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { setupWorkspaceSidesheet } from '@equinor/WorkSpace';
import { WorkorderSideSheet } from '../Garden/components';
import { WorkOrder } from '../Garden/models';

const workorderColumnNames = [
  'ActualFinishDate',
  'ActualStartupDate',
  'CommpkgNumber',
  'CommissioningPackageUrlId',
  'ConstructionComments',
  'Description',
  'Discipline',
  'DisciplineCode',
  'EstimatedHours',
  'ExpendedHours',
  'HoldBy',
  'HoldByDescription',
  'JobStatus',
  'MaterialCOmments',
  'MaterialStatus',
  'MccrStatus',
  'Milestone',
  'MilestoneCode',
  'PlannedFinishDate',
  'PlannedStartupDate',
  'ProjectDescription',
  'ProjectIdentifier',
  'ProjectProgress',
  'RemainingHours',
  'Responsible',
  'ResponsibleCode',
  'W1ActualDate',
  'W2ActualDate',
  'W3ActualDate',
  'W4ActualDate',
  'W5ActualDate',
  'W6ActualDate',
  'W7ActualDate',
  'W8ActualDate',
  'W9ActualDate',
  'W10ActualDate',
  'WorkOrderId',
  'WorkOrderUrlId',
  'WorkOrderNumber',
];
async function sidesheetReponseAsync(workOrderId: string, signal?: AbortSignal): Promise<Response> {
  const { FAM } = httpClient();
  const famExpression = generateExpressions('WorkOrderUrlId', 'Equals', [workOrderId]);
  const famFilter = generateFamRequest(workorderColumnNames, 'Or', famExpression);
  return await FAM.fetchAsync(
    `v1/typed/completion/customapi_workorders/facility/JCA?view-version=v0`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      signal: signal,
      body: JSON.stringify(famFilter),
    }
  );
}
export const creator = setupWorkspaceSidesheet<WorkOrder, 'work-orderDetails'>({
  id: 'work-orderDetails',
  color: '#0364B8',
  component: WorkorderSideSheet,
  props: {
    objectIdentifier: 'workOrderUrlId',
    parentApp: 'work-order',
    function: async (id: string) => {
      const items = await sidesheetReponseAsync(id);
      const itemsJson = await items.json();
      return itemsJson[0];
    },
  },
});

export const workOrderCreatorManifest = creator('SidesheetManifest');
export const workOrderCreatorComponent = creator('SidesheetComponentManifest');
export const workOrderResolverFunction = creator('ResolverFunction');
