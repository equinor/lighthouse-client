import { Column } from '@equinor/Table';
import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';

export const workflowStepsTableColumns: Column<WorkflowStepTemplate>[] = [
    {
        id: 'order',
        Header: 'Order',
        accessor: (item) => item.order,
        width: 75,
    },
    {
        id: 'name',
        Header: 'Name',
        accessor: (item) => item.name,
        width: 250,
    },
    {
        id: 'completedStatusName',
        Header: 'Completed status name',
        accessor: (item) => item.completedStatusName,
        width: 250,
    },
    {
        id: 'rejectedStatusName',
        Header: 'Rejected status name',
        accessor: (item) => item.rejectedStatusName,
        width: 250,
    },
];

export const workflowColumns: Column<Workflow>[] = [
    {
        id: 'workflowTemplate',
        Header: 'Workflow template',
        accessor: (item) => item.name,
        width: 250,
    },
];

export const statusColumns: Column<WorkflowStatus>[] = [
    {
        id: 'name',
        Header: 'Workflow status',
        accessor: (item) => item.name,
        width: 250,
    },
];
