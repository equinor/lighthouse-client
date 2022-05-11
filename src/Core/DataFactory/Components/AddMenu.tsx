import { Menu } from '@equinor/eds-core-react';
import { isAppActive, useRegistry } from '@equinor/lighthouse-portal-client';
import { useFactories } from '../Hooks/useFactories';
import { AddMenuButton } from './AddMenuButton';

interface AddMenuProps {
    isOpen: boolean;
    factoryId?: string[];
    anchorEl?: HTMLElement | null | undefined;
    handleClose?: () => void;
    onMouseEnter?: () => void;
}

export function AddMenu({
    factoryId,
    anchorEl,
    isOpen,
    handleClose,
    onMouseEnter,
}: AddMenuProps): JSX.Element | null {
    const { factories } = useFactories(factoryId);
    const { apps } = useRegistry();

    if (!isOpen) return null;
    const activeApps = apps
        .filter((manifest) => isAppActive(manifest))
        .map(({ shortName }) => shortName);
    return (
        <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onMouseLeave={handleClose}
            onMouseEnter={onMouseEnter}
        >
            {factories
                .filter(({ factoryId }) => activeApps.includes(factoryId))
                .map((factory) => (
                    <AddMenuButton key={factory.factoryId} factory={factory} />
                ))}
        </Menu>
    );
}
