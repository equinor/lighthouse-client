import { Button, Icon, Menu } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import { useRef, useState } from 'react';
import { MenuItem } from '../../types/menuItem';
import { MenuText, Wrapper } from './iconMenu.styles';

interface IconMenuProps {
  items: MenuItem[];
  onMenuOpen?: () => void;
  isDisabled?: boolean;
  iconName?: string;
  placement?: 'left' | 'bottom' | 'auto' | 'right' | 'top';
}

export const IconMenu = ({
  items,
  onMenuOpen,
  iconName = 'more_vertical',
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
          name={iconName}
          color={
            items.length === 0
              ? tokens.colors.interactive.disabled__text.hex
              : tokens.colors.interactive.primary__resting.hex
          }
        />
      </Button>

      {showMenu && (
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
                onClick={(e) => x.onClick && x.onClick(e)}
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
