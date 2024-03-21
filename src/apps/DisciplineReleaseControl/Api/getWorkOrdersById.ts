import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { httpClient } from '@equinor/lighthouse-portal-client';
import { WorkOrder } from '../Types/workOrder';
const workOrderColumns = [
  'SourceIdentity',
  'Facility',
  'Project',
  'WorkOrderNo',
  'WorkOrderUrlId',
  'Title',
  'Description',
  'PlannedStartupDate',
  'ActualStartupDate',
  'PlannedCompletionDate',
  'CommissioningPackageNo',
  'Milestone',
  'Category',
  'HoldBy',
  'TypeOfWork',
  'OnshoreOffshore',
  'ProjectProgress',
  'JobStatus',
  'MaterialStatus',
  'EstimatedManHours',
  'ExpendedManHours',
  'RemainingManHours',
  'SubMilestone',
  'IsVoided',
  'Responsible',
  'Location',
  'Discipline',
  'CreatedDate',
  'UpdatedDate',
];
export async function getWorkOrdersById(id: string): Promise<WorkOrder[]> {
  if (!id || id === '') return [];
  const { FAM } = httpClient();
  const expressions = generateExpressions('PipingRevisionMechanicalCompletionPackageNo', 'Equals', [
    id,
  ]);
  const requestArgs = generateFamRequest(workOrderColumns, 'Or', expressions);
  const res = await FAM.fetch(
    `v1/typed/completion/customapi_pipetestworkorders/facility/JCA?view-version=v0`,
    {
      method: 'POST',
      headers: { ['content-type']: 'application/json' },
      body: JSON.stringify(requestArgs),
    }
  );

  const workOrders: WorkOrder[] = await res.json();

  if (!Array.isArray(workOrders)) {
    throw 'Invalid response';
  }

  workOrders.sort((a, b) => Number(a.workOrderNo) - Number(b.workOrderNo));

  return workOrders;
}
