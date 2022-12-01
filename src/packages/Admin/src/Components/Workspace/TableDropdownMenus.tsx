import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { MenuItem } from '@equinor/overlay-menu';
import { Workflow, WorkflowStatus, WorkflowStepTemplate } from '@equinor/Workflow';
import { updateContext } from '../../Atoms/updateContext';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { useAdminMutation } from '../../Hooks/useAdminMutation';
import { useAdminMutations } from '../../Hooks/useAdminMutations';
import { adminMutationKeys } from '../../Queries/adminMutationKeys';

export const useMakeStatusMenuItems = (
    status: WorkflowStatus,
    setIsEditing: (setIsEditing: boolean) => void
): MenuItem[] => {
    const menuItems: MenuItem[] = [];

    const app = useAdminContext((s) => s.app);
    const workflowOwner = useAdminContext((s) => s.workflowOwner);

    menuItems.push({
        label: 'Rename',
        onClick: () => {
            updateContext({
                app: app,
                workflowOwner: workflowOwner,
                workflow: {} as Workflow,
                workflowStep: {} as WorkflowStepTemplate,
                status: status,
                isEditingWorkflow: false,
                isEditingStep: false,
                deletingWorkflow: false,
                deletingStep: false,
                deletingStatus: false,
            });
            setIsEditing(true);
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
                workflowStep: {} as WorkflowStepTemplate,
                status: status,
                isEditingWorkflow: false,
                isEditingStep: false,
                deletingWorkflow: false,
                deletingStep: false,
                deletingStatus: true,
            }),
        // isDisabled: !canDelete, //TODO - comment in when permissions are fixed
        icon: <Icon name="delete_forever" color={tokens.colors.interactive.primary__resting.hex} />,
    });
    return menuItems;
};

export const useMakeStepMenuItems = (step: WorkflowStepTemplate): MenuItem[] => {
    const menuItems: MenuItem[] = [];

    const app = useAdminContext((s) => s.app);
    const workflowOwner = useAdminContext((s) => s.workflowOwner);

    const { moveWorkflowStepUpMutation, moveWorkflowStepDownMutation } = useAdminMutations();
    const { postKey } = adminMutationKeys(step?.id);

    const { mutate: moveUpMutation } = useAdminMutation(
        step.id,
        postKey,
        moveWorkflowStepUpMutation
    );
    const { mutate: moveDownMutation } = useAdminMutation(
        step.id,
        postKey,
        moveWorkflowStepDownMutation
    );

    menuItems.push({
        label: 'Move up',
        onClick: () => moveUpMutation({ id: step.id }),
        // isDisabled: !canPost, //TODO - comment in when permissions are fixed
        icon: <Icon name="arrow_up" color={tokens.colors.interactive.primary__resting.hex} />,
    });
    menuItems.push({
        label: 'Move down',
        onClick: () => moveDownMutation({ id: step.id }),
        // isDisabled: !canPost, //TODO - comment in when permissions are fixed
        icon: <Icon name="arrow_down" color={tokens.colors.interactive.primary__resting.hex} />,
    });
    menuItems.push({
        label: 'Rename',
        onClick: () => {
            updateContext({
                app: app,
                workflowOwner: workflowOwner,
                workflow: {} as Workflow,
                workflowStep: step,
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

export const useMakeWorkflowMenuItems = (workflow: Workflow): MenuItem[] => {
    const menuItems: MenuItem[] = [];

    const app = useAdminContext((s) => s.app);
    const workflowOwner = useAdminContext((s) => s.workflowOwner);

    menuItems.push({
        label: 'Rename',
        onClick: () => {
            updateContext({
                app: app,
                workflowOwner: workflowOwner,
                workflow: workflow,
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
        icon: <Icon name="delete_forever" color={tokens.colors.interactive.primary__resting.hex} />,
    });
    return menuItems;
};
