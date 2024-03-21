import { Icon } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import { useEffect } from 'react';
import { SidesheetApi } from '@equinor/sidesheet';
import { MenuItem } from '@equinor/overlay-menu';
import { useAdminContext } from './useAdminContext';

import { updateContext } from '../Atoms/updateContext';
import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';

export function useWorkflowStepSidesheetEffects(
  actions: SidesheetApi,
  step: WorkflowStepTemplate
): void {
  const { canDelete, id, name } = useAdminContext((s) => ({
    ...s.requestAccess,
    ...s.workflowStep,
  }));

  const makeMenuItems = () => {
    const menuItems: MenuItem[] = [];
    menuItems.push({
      label: 'Rename',
      onClick: () => {
        updateContext({
          app: '',
          workflowOwner: '',
          workflow: {} as Workflow,
          workflowStep: {} as WorkflowStepTemplate,
          status: {} as WorkflowStatus,
          isEditingWorkflow: false,
          isEditingStep: true,
          deletingWorkflow: false,
          deletingStep: false,
          deletingStatus: false,
        });
      },
      // isDisabled: !canPatch, //TODO - comment in when permissions are fixed
      icon: <Icon name="edit" color={tokens.colors.interactive.primary__resting.hex} />,
    });
    menuItems.push({
      label: 'Delete',
      onClick: () =>
        updateContext({
          app: '',
          workflowOwner: '',
          workflow: {} as Workflow,
          workflowStep: step,
          status: {} as WorkflowStatus,
          isEditingWorkflow: false,
          isEditingStep: false,
          deletingWorkflow: false,
          deletingStep: true,
          deletingStatus: false,
        }),
      // isDisabled: !canDelete, //TODO - comment in when permissions are fixed
      icon: <Icon name="delete_forever" color={tokens.colors.interactive.primary__resting.hex} />,
    });
    return menuItems;
  };

  useEffect(() => {
    actions.setMenuItems(makeMenuItems());
  }, [canDelete]);

  useEffect(() => {
    actions.setTitle(`${name}`);
  }, [id, name]);

  /** Only run once */
  useEffect(() => {
    actions.setWidth(1550);
  }, []);
}
