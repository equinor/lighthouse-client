import { deref, useAtom } from '@dbeining/react-atom';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect } from 'react';
import { SidesheetApi } from '@equinor/sidesheet';
import { releaseControlMutationKeys } from '../queries/releaseControlMutationKeys';
import { unVoidReleaseControl, voidReleaseControl } from '../api/releaseControl/Request';
import { sideSheetEditModeAtom } from '../Atoms/editModeAtom';
import { useReleaseControlMutation } from './useReleaseControlMutation';
import { ReleaseControl } from '../types/releaseControl';
import { useReleaseControlContext } from './useReleaseControlContext';
import { MenuItem } from '@equinor/overlay-menu';

export function useSidesheetEffects(
    actions: SidesheetApi,
    toggleEditMode: () => void,
    releaseControl: ReleaseControl
): void {
    const releaseControlId = releaseControl.id;
    const { canPatch, canVoid, canUnVoid, title, isVoided, id, sequenceNumber } =
        useReleaseControlContext((s) => ({ ...s.requestAccess, ...s.releaseControl }));

    const editMode = useAtom(sideSheetEditModeAtom);
    const { unvoidKey, voidKey } = releaseControlMutationKeys(releaseControl.id);
    const { mutate: voidRequestMutation } = useReleaseControlMutation(
        releaseControl.id,
        voidKey,
        voidReleaseControl
    );
    const { mutate: unVoidRequestMutation } = useReleaseControlMutation(
        releaseControl.id,
        unvoidKey,
        unVoidReleaseControl
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
                    onClick: () => unVoidRequestMutation({ releaseControlId }),
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
                    onClick: () => voidRequestMutation({ releaseControlId }),
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
        actions.setTitle(`RC${sequenceNumber} ${title}`);
    }, [id]);

    /** Only run once */
    useEffect(() => {
        actions.setWidth(1550);
    }, []);
}
