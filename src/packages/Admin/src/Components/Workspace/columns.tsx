import { CellProps, Column } from '@equinor/Table';
import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';
import { IconMenu } from '@equinor/overlay-menu';
import {
  useMakeStatusMenuItems,
  useMakeStepMenuItems,
  useMakeWorkflowMenuItems,
} from './TableDropdownMenus';

export const stepColumns = (): Column<WorkflowStepTemplate>[] => {
  return [
    {
      id: 'menu',
      Header: '',
      accessor: (item) => item,
      Cell: (cellProps: CellProps<WorkflowStepTemplate, WorkflowStepTemplate>): JSX.Element => {
        return <IconMenu items={useMakeStepMenuItems(cellProps.value)} />;
      },
      width: 50,
    },
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
      width: 600,
    },
    {
      id: 'completedStatusName',
      Header: 'Completed status name',
      accessor: (item) => item.completedStatusName,
      width: 400,
    },
    // {
    //     id: 'rejectedStatusName',
    //     Header: 'Rejected status name',
    //     accessor: (item) => item.rejectedStatusName,
    //     width: 250,
    // },
  ];
};

export const workflowColumns = (): Column<Workflow>[] => {
  return [
    {
      id: 'menu',
      Header: '',
      accessor: (item) => item,
      Cell: (cellProps: CellProps<Workflow, Workflow>): JSX.Element => {
        return <IconMenu items={useMakeWorkflowMenuItems(cellProps.value)} />;
      },
      width: 50,
    },
    {
      id: 'workflowTemplate',
      Header: 'Workflow',
      accessor: (item) => item.name,
      width: 600,
    },
  ];
};

export const statusColumns = (
  setIsEditing: (setIsEditing: boolean) => void
): Column<WorkflowStatus>[] => {
  return [
    {
      id: 'menu',
      Header: '',
      accessor: (item) => item,
      Cell: (cellProps: CellProps<WorkflowStatus, WorkflowStatus>): JSX.Element => {
        return <IconMenu items={useMakeStatusMenuItems(cellProps.value, setIsEditing)} />;
      },
      width: 50,
    },
    {
      id: 'name',
      Header: 'Workflow status',
      accessor: (item) => item.name,
      width: 600,
    },
  ];
};
