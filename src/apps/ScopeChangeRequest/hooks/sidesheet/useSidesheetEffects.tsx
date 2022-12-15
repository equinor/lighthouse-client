import { deref, useAtom } from '@dbeining/react-atom';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { MenuItem } from '@equinor/overlay-menu';
import { SidesheetApi } from '@equinor/sidesheet';
import { WorkflowStep } from '@equinor/Workflow';
import { useEffect } from 'react';
import { unVoidRequest } from '../../api/ScopeChange/Request';
import { sideSheetEditModeAtom } from '../../Atoms/editModeAtom';
import { scopeChangeMutationKeys } from '../../keys/scopeChangeMutationKeys';
import { useScopeChangeContext } from '../context/useScopeChangeContext';
import { useScopeChangeMutation } from '../React-Query/useScopechangeMutation';

export function useSidesheetEffects(
    actions: SidesheetApi,
    toggleEditMode: () => void,
    requestId: string,
    setRevisionMode: () => void,
    toggleVoidMode: () => void
): void {
    const { canPatch, canVoid, canUnVoid, title, isVoided, id, serialNumber, workflowSteps } =
        useScopeChangeContext((s) => ({ ...s.requestAccess, ...s.request }));

    const editMode = useAtom(sideSheetEditModeAtom);

    const { unvoidKey } = scopeChangeMutationKeys(requestId);
    const { mutate: unVoidRequestMutation } = useScopeChangeMutation(
        requestId,
        unvoidKey,
        unVoidRequest
    );

    const makeMenuItems = () => {
        const menuItems: MenuItem[] = [];

        if (!deref(sideSheetEditModeAtom)) {
            if (workflowSteps && !isAfterApproval(workflowSteps)) {
                menuItems.push({
                    icon: (
                        <Icon name="edit" color={tokens.colors.interactive.primary__resting.hex} />
                    ),
                    label: 'Edit request',
                    isDisabled: !canPatch,
                    onClick: toggleEditMode,
                });
            }
        }
        if (!isVoided) {
            menuItems.push({
                label: 'Create revision',
                icon: <Icon name="copy" />,
                isDisabled: isVoided,
                onClick: setRevisionMode,
            });
        }
        menuItems.push(
            isVoided
                ? {
                      label: 'Unvoid request',
                      onClick: () => unVoidRequestMutation({ requestId }),
                      isDisabled: !canUnVoid,
                      icon: (
                          <Icon
                              name="restore_from_trash"
                              color={tokens.colors.interactive.primary__resting.hex}
                          />
                      ),
                  }
                : {
                      label: 'Void request',
                      onClick: () => toggleVoidMode(),
                      isDisabled: !canVoid,
                      icon: (
                          <Icon
                              name="delete_to_trash"
                              color={tokens.colors.interactive.danger__resting.hex}
                          />
                      ),
                  }
        );
        return menuItems;
    };

    useEffect(() => {
        actions.setMenuItems(makeMenuItems());
        return () => {
            actions.setMenuItems([]);
        };
    }, [editMode, canVoid, canUnVoid, canPatch, workflowSteps]);

    useEffect(() => {
        actions.setTitle(`${serialNumber} ${title}`);
    }, [id]);

    /** Only run once */
    useEffect(() => {
        actions.setWidth(1150);
    }, []);
}

function isAfterApproval(steps: WorkflowStep[]): boolean {
    return Boolean(steps.find((s) => s.name === 'Approval')?.isCompleted);
}
