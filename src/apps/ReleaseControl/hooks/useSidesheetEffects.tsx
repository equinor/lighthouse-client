import { deref, useAtom } from '@dbeining/react-atom';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect } from 'react';
import { MenuItem, SidesheetApi } from '@equinor/sidesheet';
import { useReleaseControlContext } from './useReleaseControlContext';
import { releaseControlMutationKeys } from '../queries/releaseControlMutationKeys';
import { unVoidReleaseControl, voidReleaseControl } from '../api/releaseControl/Request';
import { sideSheetEditModeAtom } from '../Atoms/editModeAtom';
import { useReleaseControlMutation } from './useReleaseControlMutation';
import { releaseControlQueries } from '../queries/queries';
import { releaseControlContext } from '../Atoms/releaseControlAtom';
import { useReleaseControlMutationWatcher } from './useReleaseControlMutationWatcher';
import { useQuery } from 'react-query';
import { ReleaseControl } from '../types/releaseControl';

export function useSidesheetEffects(
    actions: SidesheetApi,
    toggleEditMode: () => void,
    releaseControl: ReleaseControl
): void {
    const { baseQuery } = releaseControlQueries;
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
        const { updateAtom } = releaseControlContext;
        updateAtom({ releaseControl: releaseControl });
    }, [releaseControl.id]);

    useReleaseControlMutationWatcher(releaseControl.id);

    useQuery({
        ...baseQuery(releaseControl.id),
        initialData: releaseControl,
        onSuccess: (releaseControl) => {
            const { updateAtom } = releaseControlContext;
            updateAtom({ releaseControl });
        },
    });

    useEffect(() => {
        actions.setTitle(`RC${sequenceNumber} ${title}`);
    }, [id]);

    /** Only run once */
    useEffect(() => {
        actions.setWidth(1550);
    }, []);
}
