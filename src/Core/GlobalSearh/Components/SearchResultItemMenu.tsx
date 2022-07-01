import { Menu } from '@equinor/eds-core-react';
import { Icon } from '@equinor/lighthouse-components';
import { useState } from 'react';
import { VerticalMenu } from './SearchResultItemStyles';

interface SearchItemResultMenuProps {
    id: string;
    type: string;
    index: number;
    isNavigationOpen: boolean;
    handleNavigationOpen: (val: boolean) => void;
    action: (id: string) => void;
    appAction?: (id: string) => void;
    showMenu: boolean;
    setShowMenu: (val: boolean) => void;
}

export function SearchItemResultMenu({
    type,
    index,
    isNavigationOpen,
    handleNavigationOpen,
    action,
    appAction,
    id,
    showMenu,
    setShowMenu,
}: SearchItemResultMenuProps): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

    const handleCleanup = () => {
        handleNavigationOpen(false);
        setShowMenu(false);
    };

    return (
        <div>
            {type !== 'apps' && showMenu && (
                <>
                    <VerticalMenu
                        ref={setAnchorEl}
                        id={`search-item-menu-${index}`}
                        aria-controls="menu-compact"
                        aria-haspopup="true"
                        aria-expanded={isNavigationOpen}
                        onFocus={() => {
                            setShowMenu(true);
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            isNavigationOpen
                                ? handleNavigationOpen(false)
                                : handleNavigationOpen(true);
                        }}
                    >
                        <Icon name="more_vertical" />
                    </VerticalMenu>

                    <Menu
                        open={isNavigationOpen}
                        id="menu-default"
                        aria-labelledby={`search-item-menu-${index}`}
                        anchorEl={anchorEl}
                    >
                        <Menu.Item
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                action(id);
                                handleCleanup();
                            }}
                        >
                            Open in Sidesheet
                        </Menu.Item>

                        <Menu.Item
                            disabled={!appAction}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                appAction && appAction(id);
                                handleCleanup();
                            }}
                        >
                            App with Sidesheet
                        </Menu.Item>
                    </Menu>
                </>
            )}
        </div>
    );
}
