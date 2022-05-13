import { Button, Divider } from '@equinor/eds-core-react';
import { useClientContext } from '@equinor/lighthouse-portal-client';
import { useMemo } from 'react';
import { useLocation } from 'react-router';
import Icon from '../../../Icon/Icon';
import { useMenuContext } from '../../Context/MenuContext';
import { groupeByKey } from '../../Utils/utils';
import { Favorites } from '../Favourites/Favourites';
import { GroupItem } from '../GroupeItem/GroupeItem';
import { MenuItem } from '../MenuItem/MenuItem';
import {
    BackButton,
    FavoritesDividerWrapper,
    Heading,
    MenuGroup,
    MenuHeadingWrapper,
    MenuWrapper,
    RightButton,
    Row
} from './CompactMenuStyles';

export const CompactMenu = (): JSX.Element => {
    const { registry } = useClientContext();

    const { apps, appGroups } = registry;
    const location = useLocation();
    const { setExpandMenuActive, setActiveGroupe, activeGroupe } = useMenuContext();

    const GroupedMenu = useMemo(() => groupeByKey(apps, 'groupe'), [apps]);

    return (
        <MenuWrapper>
            <Row>
                <Favorites />
                <FavoritesDividerWrapper>
                    <Divider />
                </FavoritesDividerWrapper>
            </Row>
            <Row>
                {activeGroupe === '' ? (
                    <MenuGroup>
                        {Object.keys(appGroups).map((key) => {
                            return (
                                <GroupItem
                                    key={`item-${key}`}
                                    appGroup={appGroups[key]}
                                    active={location.pathname.includes(`${key}`)}
                                    onClick={() => {
                                        setActiveGroupe(key);
                                    }}
                                />
                            );
                        })}
                    </MenuGroup>
                ) : (
                    <>
                        <MenuHeadingWrapper>
                            <BackButton onClick={() => setActiveGroupe('')}>
                                <Icon name="arrow_back" />
                            </BackButton>
                            <Heading>{appGroups[activeGroupe].name}</Heading>
                        </MenuHeadingWrapper>
                        <MenuGroup>
                            {GroupedMenu[activeGroupe].map((manifest) => (
                                <MenuItem
                                    key={`acc-${manifest.shortName}`}
                                    groupId={activeGroupe}
                                    manifest={manifest}
                                />
                            ))}
                        </MenuGroup>
                    </>
                )}
            </Row>
            <Row>
                <RightButton>
                    <Button variant="ghost" onClick={setExpandMenuActive}>
                        Expanded menu
                        <Icon name="chevron_right" />
                    </Button>
                </RightButton>
            </Row>
        </MenuWrapper>
    );
};
