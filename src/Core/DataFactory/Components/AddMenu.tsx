import { Menu } from '@equinor/eds-core-react';
import React from 'react';
import { useFactories } from '../Hooks/useFactories';
import { AddMenuButton } from './AddMenuButton';

interface AddMenuProps {
    isOpen: boolean;
    factoryId?: string[];
    anchorEl?: HTMLElement | null | undefined;
    scope?: Record<string, unknown>;
    handleClose?: () => void;
    onMouseEnter?: () => void;
}

export function AddMenu({
    factoryId,
    anchorEl,
    isOpen,
    scope,
    handleClose,
    onMouseEnter,
}: AddMenuProps): JSX.Element | null {
    const { factories } = useFactories(factoryId);
    if (!isOpen) return null;
    return (
        <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onMouseLeave={handleClose}
            onMouseEnter={onMouseEnter}
        >
            {factories.map((factory) => (
                <AddMenuButton key={factory.factoryId} factory={factory} scope={scope} />
            ))}
        </Menu>
    );
}
