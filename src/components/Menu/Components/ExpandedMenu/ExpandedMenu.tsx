import { Button, Icon, Search } from '@equinor/eds-core-react-old';
import { useClientContext } from '@equinor/lighthouse-portal-client';
import { useMemo, useState } from 'react';
import { useMenuContext } from '../../Context/MenuContext';
import { filterByValue, groupeByKey } from '../../Utils/utils';
import { MenuItem } from '../MenuItem/MenuItem';
import { AppGroup } from '../Sheard/Styles';
import {
  FullscreenMenuGroupHeaderText,
  FullscreenMenuWrapper,
  HeaderLink,
  MenuColumn,
  MenuRow,
  MenuScrim,
} from './ExpandedMenuStyles';
import { apps } from '../../../../apps/apps';

export const ExpandedMenu = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const { registry } = useClientContext();

  const { toggleMenu, setCompactMenuActive } = useMenuContext();

  const { appGroups } = registry;
  const GroupedMenu = useMemo(() => groupeByKey(apps, 'groupe'), [apps]);

  const filteredList = filterByValue(GroupedMenu, searchValue, 'title');

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const appColumn = (columnId: number) =>
    Object.keys(filteredList).map((key) => {
      if (key === 'Top' || appGroups[key].columnId !== columnId) {
        return null;
      }
      return (
        <AppGroup key={key}>
          <HeaderLink to={`${key}`} onClick={() => toggleMenu()}>
            <FullscreenMenuGroupHeaderText>{appGroups[key].name}</FullscreenMenuGroupHeaderText>
          </HeaderLink>

          {filteredList[key].map((item) => {
            return (
              <MenuItem
                key={`acc-${item.shortName}`}
                groupId={key}
                manifest={item}
                onClick={() => toggleMenu()}
              />
            );
          })}
        </AppGroup>
      );
    });

  return (
    <MenuScrim onClick={() => toggleMenu()}>
      <FullscreenMenuWrapper>
        <MenuRow>
          <Search
            aria-label="sitewide"
            id="search-normal"
            placeholder="Search"
            onChange={handleOnChange}
          />
        </MenuRow>
        <MenuRow>
          <MenuColumn>{appColumn(1)}</MenuColumn>
          <MenuColumn>{appColumn(2)}</MenuColumn>
          <MenuColumn>{appColumn(3)}</MenuColumn>
          <MenuColumn>{appColumn(4)}</MenuColumn>
        </MenuRow>
        <MenuRow>
          <Button variant="ghost" onClick={setCompactMenuActive}>
            <Icon name="chevron_left" /> Compact menu
          </Button>
        </MenuRow>
      </FullscreenMenuWrapper>
    </MenuScrim>
  );
};
