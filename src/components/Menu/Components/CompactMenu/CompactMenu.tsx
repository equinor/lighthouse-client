import { Button, Divider } from '@equinor/eds-core-react';
import { useClientContext } from '@equinor/portal-client';
import { useMemo } from 'react';
import Icon from '../../../Icon/Icon';
import { useMenuContext } from '../../Context/MenuContext';
import { groupeByKey } from '../../Utils/utils';
import { Favorites } from '../Favourites/Favourites';
import { GroupItem } from '../GroupeItem/GroupeItem';
import { MenuItem } from '../MenuItem/MenuItem';
import {
    BackButtonWrapper,
    IconWrapper,
    MenuGroup,
    MenuGroupHeading,
    MenuWrapper,
    RightButton,
    Row
} from './CompactMenuStyles';

export const CompactMenu = (): JSX.Element => {
    const { registry } = useClientContext();

    const { apps, appGroups } = registry;

    const { setExpandMenuActive, setActiveGroupe, activeGroupe } = useMenuContext();

    const GroupedMenu = useMemo(() => groupeByKey(apps, 'groupe'), [apps]);

    return (
        <MenuWrapper>
            <Row>
                <Favorites />
                <MenuGroup>
                    <Divider />
                </MenuGroup>
            </Row>
            <Row>
                {activeGroupe === '' ? (
                    <MenuGroup>
                        {Object.keys(appGroups).map((key) => {
                            return (
                                <GroupItem
                                    key={`item-${key}`}
                                    appGroup={appGroups[key]}
                                    onClick={() => {
                                        setActiveGroupe(key);
                                    }}
                                />
                            );
                        })}
                    </MenuGroup>
                ) : (
                    <>
                        <BackButtonWrapper>
                            <IconWrapper onClick={() => setActiveGroupe('')}>
                                <Icon name="arrow_back" />
                            </IconWrapper>
                            <MenuGroupHeading>{appGroups[activeGroupe].name}</MenuGroupHeading>
                        </BackButtonWrapper>
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
