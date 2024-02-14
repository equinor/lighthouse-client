import { Icon } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import { useEffect } from 'react';
import { SidesheetApi } from '@equinor/sidesheet';
import { MenuItem } from '@equinor/overlay-menu';
import { useAdminContext } from './useAdminContext';
import { updateContext } from '../Atoms/updateContext';
import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';

export function useWorkflowSidesheetEffects(actions: SidesheetApi, workflow: Workflow): void {
    const { canDelete, id, name } = useAdminContext((s) => ({
        ...s.requestAccess,
        ...s.workflow,
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
                    isEditingWorkflow: true,
                    isEditingStep: false,
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
                    workflow: workflow,
                    workflowStep: {} as WorkflowStepTemplate,
                    status: {} as WorkflowStatus,
                    isEditingWorkflow: false,
                    isEditingStep: false,
                    deletingWorkflow: true,
                    deletingStep: false,
                    deletingStatus: false,
                }),
            // isDisabled: !canDelete, //TODO - comment in when permissions are fixed
            icon: (
                <Icon
                    name="delete_forever"
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            ),
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
