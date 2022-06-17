import { TableOptions } from '@equinor/WorkSpace';
import { WorkflowCompact } from '../../../ScopeChangeRequest/workspaceConfig/sTable/WorkflowCompact';
import { ReleaseControl } from '../../types/releaseControl';

const customCellView = (render: (req: ReleaseControl) => JSX.Element | null) => ({
    Cell: ({ cell }: any) => <>{render(cell.value.content)}</>,
});

export const tableConfig: TableOptions<ReleaseControl> = {
    objectIdentifierKey: 'id',
    enableSelectRows: true,
    hiddenColumns: [
        'id',
        'description',
        'areas',
        'isVoided',
        'hasComments',
        'hasPendingContributions',
        'tags',
        'createdBy',
        'modifiedBy',
    ],
    columnOrder: ['sequenceNumber', 'title', 'workflowSteps'],
    headers: [
        { key: 'sequenceNumber', title: 'Id' },
        { key: 'title', title: 'Title' },
        { key: 'workflowSteps', title: 'Workflow' },
        { key: 'currentWorkflowStep', title: 'Current step' },
        { key: 'workflowStatus', title: 'Status' },
        { key: 'phase', title: 'Phase' },
        { key: 'state', title: 'State' },
        { key: 'plannedDueDate', title: 'Due date' },
        { key: 'createdAtUtc', title: 'Created at' },
        { key: 'modifiedAtUtc', title: 'Last modified' },
    ],
    customCellView: [
        {
            key: 'sequenceNumber',
            type: customCellView((rc) => <>{'RC' + rc.sequenceNumber}</>),
        },
        {
            key: 'plannedDueDate',
            type: customCellView((rc) => (
                <>{rc.plannedDueDate && new Date(rc.plannedDueDate).toLocaleDateString('en-gb')}</>
            )),
        },
        {
            key: 'workflowSteps',
            type: customCellView((rc) => <WorkflowCompact steps={rc.workflowSteps as any[]} />),
        },
        {
            key: 'createdAtUtc',
            type: customCellView((rc) => (
                <>{rc.createdAtUtc && new Date(rc.createdAtUtc).toLocaleDateString('en-gb')}</>
            )),
        },
        {
            key: 'modifiedAtUtc',
            type: customCellView((rc) => (
                <>{rc.modifiedAtUtc && new Date(rc.modifiedAtUtc).toLocaleDateString('en-gb')}</>
            )),
        },
        {
            key: 'currentWorkflowStep',
            type: customCellView((rc) => <>{rc?.currentWorkflowStep?.name}</>),
        },
    ],
};
