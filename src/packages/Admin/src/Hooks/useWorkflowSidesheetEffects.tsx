// import { deref, useAtom } from '@dbeining/react-atom';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect } from 'react';
import { SidesheetApi } from '@equinor/sidesheet';
import { MenuItem } from '@equinor/overlay-menu';
import { useAdminContext } from './useAdminContext';

export function useWorkflowSidesheetEffects(actions: SidesheetApi, workflowId: string): void {
    const { canPatch, canVoid, canUnVoid, id, name, isVoided } = useAdminContext((s) => ({
        ...s.requestAccess,
        ...s.workflow,
    }));
    // const { unvoidKey, voidKey } = releaseControlMutationKeys(releaseControlId);
    // const { mutate: voidRequestMutation } = useReleaseControlMutation(
    //     releaseControlId,
    //     voidKey,
    //     voidReleaseControl
    // );
    // const { mutate: unVoidRequestMutation } = useReleaseControlMutation(
    //     releaseControlId,
    //     unvoidKey,
    //     unVoidReleaseControl
    // );

    const makeMenuItems = () => {
        const menuItems: MenuItem[] = [];

        menuItems.push(
            isVoided
                ? {
                      label: 'Unvoid',
                      //   onClick: () => unVoidRequestMutation({ workflowId }),
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
                      //   onClick: () => voidRequestMutation({ workflowId }),
                      isDisabled: !canVoid,
                      icon: (
                          <Icon
                              name="delete_to_trash"
                              color={tokens.colors.interactive.primary__resting.hex}
                          />
                      ),
                  }
        );
        menuItems.push({
            label: 'Delete',
            // onClick: () => deleteMutation({ workflowId }),
            isDisabled: !canVoid,
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
    }, [canVoid, canUnVoid, canPatch, isVoided]);

    useEffect(() => {
        actions.setTitle(`${name}`);
    }, [id, name]);

    /** Only run once */
    useEffect(() => {
        actions.setWidth(1550);
    }, []);
}
