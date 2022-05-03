import { Button, Icon, Menu, Typography } from '@equinor/eds-core-react';
import { MenuItem } from '@equinor/overlay-menu';
import { useRef, useState } from 'react';
import styled from 'styled-components';

interface MenuButtonProps {
    items: MenuItem[];
    buttonText: string;
    onMenuOpen?: () => void;
    isDisabled?: boolean;
}

export const MenuButton = ({
    items,
    buttonText,
    onMenuOpen,
    isDisabled,
}: MenuButtonProps): JSX.Element => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = () => {
        setShowMenu(false);
    };

    return (
        <Wrapper>
            <Button
                ref={anchorRef}
                id="anchor-complex"
                aria-controls="menu-complex"
                aria-haspopup="true"
                aria-expanded={showMenu}
                disabled={isDisabled}
                onClick={() => {
                    setShowMenu(true);
                    onMenuOpen && onMenuOpen();
                }}
            >
                {buttonText} <Icon name="chevron_down" />
            </Button>

            {showMenu && (
                <Menu
                    id="menu-complex"
                    aria-labelledby="anchor-complex"
                    open={showMenu}
                    anchorEl={(() => anchorRef.current)()}
                    onClose={closeMenu}
                    placement="bottom"
                >
                    {items.map((x, i) => {
                        const Icon = () => x.icon ?? <span></span>;
                        return (
                            <Menu.Item
                                disabled={x.isDisabled}
                                onClick={() => x.onClick && x.onClick()}
                                key={x.label + i}
                            >
                                <Icon />
                                <MenuText>{x.label}</MenuText>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const MenuText = styled(Typography)`
    font-size: 16px;
`;
