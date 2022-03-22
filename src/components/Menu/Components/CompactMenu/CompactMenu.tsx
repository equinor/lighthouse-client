import { Divider } from '@equinor/eds-core-react';
import { useClientContext } from '@equinor/portal-client';
import { useMemo } from 'react';
import Icon from '../../../Icon/Icon';
import { useMenuContext } from '../../Context/MenuContext';
import { groupeByKey } from '../../utils';
import { Favorites } from '../Favourites/Favourites';
import { GroupItem } from '../GroupeItem/GroupeItem';
import { MenuItem } from '../MenuItem/MenuItem';
import { LeftButton, MenuGroupe, MenuWrapper, RightButton, Row } from './CompactMenuStyles';

export const CompactMenu = (): JSX.Element => {
    const {
        // settings: { appsPanelActive },
        registry,
    } = useClientContext();

    const { apps, appGroups } = registry;

    const { setExpandMenuActive, setActiveGroupe, activeGroupe } = useMenuContext();
    // const [searchValue, setSearchValue] = useState('');

    // const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    //     setSearchValue(value);
    // };

    const GroupedMenu = useMemo(() => groupeByKey(apps, 'groupe'), [apps]);

    // const anchorRef = useRef<HTMLHeadingElement[]>([]);

    // const [isOpen, setIsOpen] = useState<string>('');
    // const openPopover = (type: string) => setIsOpen(type);
    // const closePopover = () => setIsOpen('');
    // const handleClose = () => {
    //     closePopover();
    // };

    // const filteredList = filterByValue(GroupedMenu, searchValue, 'title');
    // const isExpanded = searchValue.length > 1 ? true : false;

    return (
        <MenuWrapper>
            <Row>
                <Favorites />
                <MenuGroupe>
                    <Divider />
                </MenuGroupe>
            </Row>
            <Row>
                {activeGroupe === '' ? (
                    <MenuGroupe>
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
                    </MenuGroupe>
                ) : (
                    <>
                        <LeftButton variant="ghost" onClick={() => setActiveGroupe('')}>
                            <Icon name="arrow_back" /> {appGroups[activeGroupe].name}
                        </LeftButton>
                        <MenuGroupe>
                            {GroupedMenu[activeGroupe].map((manifest) => (
                                <MenuItem
                                    key={`acc-${manifest.shortName}`}
                                    appId={activeGroupe}
                                    manifest={manifest}
                                />
                            ))}
                        </MenuGroupe>
                    </>
                )}
            </Row>
            <Row>
                <RightButton variant="ghost" onClick={setExpandMenuActive}>
                    Expanded menu
                    <Icon name="chevron_right" />
                </RightButton>
            </Row>
        </MenuWrapper>
    );
};
