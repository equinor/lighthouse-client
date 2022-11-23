import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect } from 'react';
import { SidesheetApi } from '@equinor/sidesheet';
import { MenuItem } from '@equinor/overlay-menu';
import { useAdminContext } from './useAdminContext';
import { useAdminMutations } from './useAdminMutations';
import { adminMutationKeys } from '../Queries/adminMutationKeys';
import { useAdminMutation } from './useAdminMutation';
import { updateContext } from '../Atoms/updateContext';

export function useWorkflowStepSidesheetEffects(actions: SidesheetApi, stepId: string): void {
    const { canDelete, id, name } = useAdminContext((s) => ({
        ...s.requestAccess,
        ...s.workflowStep,
    }));

    const { deleteWorkflowStepMutation } = useAdminMutations();
    const { deleteKey } = adminMutationKeys(stepId);
    const { mutate } = useAdminMutation(stepId, deleteKey, deleteWorkflowStepMutation);

    const makeMenuItems = () => {
        const menuItems: MenuItem[] = [];
        menuItems.push({
            label: 'Rename',
            onClick: () => {
                updateContext(undefined, undefined, undefined, undefined, undefined, true, false);
            },
            // isDisabled: !canPatch, //TODO - comment in when permissions are fixed
            icon: <Icon name="edit" color={tokens.colors.interactive.primary__resting.hex} />,
        });
        menuItems.push({
            label: 'Delete',
            onClick: () => mutate({ stepId: stepId }),
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
