import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect } from 'react';
import { SidesheetApi } from '../../../../packages/Sidesheet/Components/ResizableSidesheet';
import { unVoidRequest, voidRequest } from '../../api/ScopeChange/Request';
import { MenuItem } from '../../Components/MenuButton';
import { scopeChangeMutationKeys } from '../../keys/scopeChangeMutationKeys';
import { useGetScopeChangeRequest } from '../queries/useGetScopeChangeRequest';
import { useScopeChangeAccess } from '../queries/useScopeChangeAccess';
import { useScopeChangeMutation } from '../React-Query/useScopechangeMutation';

export function useSidesheetEffects(
    actions: SidesheetApi,
    toggleEditMode: () => void,
    requestId: string
): void {
    const request = useGetScopeChangeRequest(requestId);
    const { canPatch, canVoid, canUnVoid } = useScopeChangeAccess(requestId);

    const { unvoidKey, voidKey } = scopeChangeMutationKeys(requestId);
    const { mutate: voidRequestMutation } = useScopeChangeMutation(requestId, voidKey, voidRequest);
    const { mutate: unVoidRequestMutation } = useScopeChangeMutation(
        requestId,
        unvoidKey,
        unVoidRequest
    );

    const voidItem: MenuItem = request?.isVoided
        ? {
            label: 'Unvoid',
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
            label: 'Void',
            onClick: () => voidRequestMutation({ requestId }),
            isDisabled: !canVoid,
            icon: (
                <Icon
                    name="delete_to_trash"
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            ),
        };

    const menuItems: MenuItem[] = [
        {
            icon: <Icon name="edit" color={tokens.colors.interactive.primary__resting.hex} />,
            label: 'Edit',
            isDisabled: !canPatch,
            onClick: toggleEditMode,
        },
        voidItem,
    ];

    useEffect(() => {
        actions.setMenuItems(menuItems);
    }, [canPatch, canVoid, canUnVoid]);

    useEffect(() => {
        actions.setTitle(
            <>
                {request?.sequenceNumber}, {request?.title}
            </>
        );
    }, [request]);

    /** Only run once */
    useEffect(() => {
        actions.setWidth(1150);
    }, []);
}
