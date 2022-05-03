import { deref, useAtom } from '@dbeining/react-atom';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect } from 'react';
import { SidesheetApi } from '../../../../packages/Sidesheet/Components/ResizableSidesheet';
import { unVoidRequest, voidRequest } from '../../api/ScopeChange/Request';
import { sideSheetEditModeAtom } from '../../Atoms/editModeAtom';
import { MenuItem } from '../../Components/MenuButton';
import { scopeChangeMutationKeys } from '../../keys/scopeChangeMutationKeys';
import { useScopeChangeContext } from '../context/useScopeChangeContext';
import { useScopeChangeMutation } from '../React-Query/useScopechangeMutation';

export function useSidesheetEffects(
    actions: SidesheetApi,
    toggleEditMode: () => void,
    requestId: string
): void {
    const { canPatch, canVoid, canUnVoid, title, isVoided, id, sequenceNumber } =
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
                label: 'Edit',
                isDisabled: !canPatch,
                onClick: toggleEditMode,
            });
        }

        menuItems.push(
            isVoided
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
                }
        );
        return menuItems;
    };

    useEffect(() => {
        actions.setMenuItems(makeMenuItems());
    }, [editMode, canVoid, canUnVoid, canPatch]);

    useEffect(() => {
        actions.setTitle(
            <>
                {sequenceNumber}, {title}
            </>
        );
    }, [id]);

    /** Only run once */
    useEffect(() => {
        actions.setWidth(1150);
    }, []);
}
