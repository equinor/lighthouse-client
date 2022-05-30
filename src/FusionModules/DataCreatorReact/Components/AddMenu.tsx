import { Menu } from '@equinor/eds-core-react';
import { useDataCreator } from '../Hooks/useCreator';
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
    const { creators } = useDataCreator(factoryId);

    if (!isOpen || creators.length === 0) return null;

    return (
        <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onMouseLeave={handleClose}
            onMouseEnter={onMouseEnter}
        >
            {creators.map((creator) => (
                <AddMenuButton key={creator.widgetId} creator={creator} />
            ))}
        </Menu>
    );
}
