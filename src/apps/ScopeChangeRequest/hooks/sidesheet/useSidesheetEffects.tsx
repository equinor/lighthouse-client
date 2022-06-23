import { deref, useAtom } from '@dbeining/react-atom';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { MenuItem } from '@equinor/overlay-menu';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect } from 'react';
import { unVoidRequest, voidRequest } from '../../api/ScopeChange/Request';
import { sideSheetEditModeAtom } from '../../Atoms/editModeAtom';
import { scopeChangeMutationKeys } from '../../keys/scopeChangeMutationKeys';
import { useScopeChangeContext } from '../context/useScopeChangeContext';
import { useScopeChangeMutation } from '../React-Query/useScopechangeMutation';

export function useSidesheetEffects(
    actions: SidesheetApi,
    toggleEditMode: () => void,
    requestId: string,
    setRevisionMode: () => void
): void {
    const { canPatch, canVoid, canUnVoid, title, isVoided, id, serialNumber } =
        useScopeChangeContext((s) => ({ ...s.requestAccess, ...s.request }));

    const editMode = useAtom(sideSheetEditModeAtom);

    const { unvoidKey, voidKey } = scopeChangeMutationKeys(requestId);
    const { mutate: voidRequestMutation } = useScopeChangeMutation(requestId, voidKey, voidRequest);
    const { mutate: unVoidRequestMutation } = useScopeChangeMutation(
        requestId,
        unvoidKey,
        unVoidRequest
    );

    const makeMenuItems = () => {
        const menuItems: MenuItem[] = [];

        if (!deref(sideSheetEditModeAtom)) {
            menuItems.push({
                icon: <Icon name="edit" color={tokens.colors.interactive.primary__resting.hex} />,
                label: 'Edit request',
                isDisabled: !canPatch,
                onClick: toggleEditMode,
            });
        }
        if (canPatch) {
            menuItems.push({
                label: 'Create revision',
                icon: <Icon name="copy" />,
                isDisabled: !canPatch,
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
                    onClick: () => voidRequestMutation({ requestId }),
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
    }, [editMode, canVoid, canUnVoid, canPatch]);

    useEffect(() => {
        actions.setTitle(`${serialNumber} ${title}`);
    }, [id]);

    /** Only run once */
    useEffect(() => {
        actions.setWidth(1150);
    }, []);
}
