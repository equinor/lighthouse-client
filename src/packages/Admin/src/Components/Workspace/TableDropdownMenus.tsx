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

    const { deleteWorkflowStatusMutation } = useAdminMutations();
    const { deleteKey } = adminMutationKeys(status.id);
    const { mutate } = useAdminMutation(status.id, deleteKey, deleteWorkflowStatusMutation);

    menuItems.push({
        label: 'Rename',
        onClick: () => {
            updateContext(app, workflowOwner, undefined, undefined, status, false, false);
            setIsEditing(true);
        },
        // isDisabled: !canPatch, //TODO - comment in when permissions are fixed
        icon: <Icon name="edit" color={tokens.colors.interactive.primary__resting.hex} />,
    });
    menuItems.push({
        label: 'Delete',
        onClick: () => mutate({ id: status.id }),
        // isDisabled: !canDelete, //TODO - comment in when permissions are fixed
        icon: <Icon name="delete_forever" color={tokens.colors.interactive.primary__resting.hex} />,
    });
    return menuItems;
};

export const useMakeStepMenuItems = (step: WorkflowStepTemplate): MenuItem[] => {
    const menuItems: MenuItem[] = [];

    const app = useAdminContext((s) => s.app);
    const workflowOwner = useAdminContext((s) => s.workflowOwner);

    const { deleteWorkflowStepMutation, moveWorkflowStepUpMutation, moveWorkflowStepDownMutation } =
        useAdminMutations();
    const { deleteKey } = adminMutationKeys(step?.id);
    const { postKey } = adminMutationKeys(step?.id);
    const { mutate: deleteMutation } = useAdminMutation(
        step.id,
        deleteKey,
        deleteWorkflowStepMutation
    );
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
            updateContext(app, workflowOwner, undefined, step, undefined, false, true);
        },
        // isDisabled: !canPatch, //TODO - comment in when permissions are fixed
        icon: <Icon name="edit" color={tokens.colors.interactive.primary__resting.hex} />,
    });
    menuItems.push({
        label: 'Delete',
        onClick: () => deleteMutation({ stepId: step.id }),
        // isDisabled: !canDelete, //TODO - comment in when permissions are fixed
        icon: <Icon name="delete_forever" color={tokens.colors.interactive.primary__resting.hex} />,
    });
    return menuItems;
};

export const useMakeWorkflowMenuItems = (workflow: Workflow): MenuItem[] => {
    const menuItems: MenuItem[] = [];

    const app = useAdminContext((s) => s.app);
    const workflowOwner = useAdminContext((s) => s.workflowOwner);

    const { deleteWorkflowMutation } = useAdminMutations();
    const { deleteKey } = adminMutationKeys(workflow?.id);
    const { mutate } = useAdminMutation(workflow.id, deleteKey, deleteWorkflowMutation);

    menuItems.push({
        label: 'Rename',
        onClick: () => {
            updateContext(app, workflowOwner, workflow, undefined, undefined, true, false);
        },
        // isDisabled: !canPatch, //TODO - comment in when permissions are fixed
        icon: <Icon name="edit" color={tokens.colors.interactive.primary__resting.hex} />,
    });
    menuItems.push({
        label: 'Delete',
        onClick: () => mutate({ workflowId: workflow.id }),
        // isDisabled: !canDelete, //TODO - comment in when permissions are fixed
        icon: <Icon name="delete_forever" color={tokens.colors.interactive.primary__resting.hex} />,
    });
    return menuItems;
};
