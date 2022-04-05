import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect, useMemo } from 'react';
import { SidesheetApi } from '../../../../packages/Sidesheet/Components/ResizableSidesheet';
import { MenuItem } from '../../Components/MenuButton';
import { useGetScopeChangeRequest } from '../queries/useGetScopeChangeRequest';

export function useSidesheetEffects(
    actions: SidesheetApi,
    canEdit: boolean,
    toggleEditMode: () => void,
    requestId: string
): void {
    const request = useGetScopeChangeRequest(requestId);

    const menuItems: MenuItem[] = useMemo(
        () => [
            {
                icon: <Icon name="edit" color={tokens.colors.interactive.primary__resting.hex} />,
                label: 'Edit ',
                isDisabled: canEdit,
                onClick: toggleEditMode,
            },
        ],
        [canEdit, toggleEditMode]
    );

    useEffect(() => {
        actions.setTitle(
            <>
                {request?.sequenceNumber}, {request?.title}
            </>
        );
        actions.setMenuItems(menuItems);
    }, [request]);

    /** Only run once */
    useEffect(() => {
        actions.setWidth(1100);
    }, []);
}
