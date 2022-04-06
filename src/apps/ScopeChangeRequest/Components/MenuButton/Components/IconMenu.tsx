import { Button, Icon, Menu, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { MenuItem } from '../Types/menuItem';

interface IconMenuProps {
    items: MenuItem[];
    onMenuOpen?: () => void;
    isDisabled?: boolean;
    placement?: 'left' | 'bottom' | 'auto' | 'right' | 'top';
}

export const IconMenu = ({
    items,
    onMenuOpen,
    isDisabled,
    placement = 'left',
}: IconMenuProps): JSX.Element => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = () => {
        setShowMenu(false);
    };

    return (
        <Wrapper>
            <Button
                variant="ghost_icon"
                ref={anchorRef}
                id="anchor-complex"
                aria-controls="menu-complex"
                aria-haspopup="true"
                disabled={items.length === 0 || isDisabled}
                aria-expanded={showMenu}
                onClick={() => {
                    setShowMenu(true);
                    onMenuOpen && onMenuOpen();
                }}
            >
                <Icon
                    name="more_vertical"
                    color={
                        items.length === 0
                            ? tokens.colors.interactive.disabled__text.hex
                            : tokens.colors.interactive.primary__resting.hex
                    }
                />
            </Button>

            <Menu
                id="menu-complex"
                aria-labelledby="anchor-complex"
                open={showMenu}
                anchorEl={anchorRef.current}
                onClose={closeMenu}
                placement={placement}
            >
                {items.map((x, i) => {
                    const Icon = () => x.icon ?? null;
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
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    width: auto;
`;

const MenuText = styled(Typography)`
    font-size: 16px;
`;
