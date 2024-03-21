import { MenuWrapper, Row } from '../../../styles/styles';
import { MenuItemType } from '../../types/menuTypes';
import { MenuItem } from './MenuItem';

const menuItems: MenuItemType[] = [
  {
    id: '1',
    name: 'Workflow statuses',
  },
  {
    id: '2',
    name: 'Workflow steps',
  },
  {
    id: '3',
    name: 'Workflows',
  },
];

interface AdminMenuProps {
  activeMenuItem: number;
  handleChange: (index: number) => void;
}

export const AdminMenu = ({ activeMenuItem, handleChange }: AdminMenuProps): JSX.Element => {
  return (
    <MenuWrapper>
      <Row>
        <>
          <h3>Administration menu</h3>
          {menuItems.map((item) => (
            <MenuItem
              key={`${item.id}`}
              id={item.id}
              name={item.name}
              active={activeMenuItem === Number(item.id)}
              handleChange={handleChange}
            />
          ))}
        </>
      </Row>
    </MenuWrapper>
  );
};
